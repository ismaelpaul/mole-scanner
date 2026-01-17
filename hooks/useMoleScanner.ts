import { SCANNER_CONFIG } from '@/constants/ScannerConstants';
import { detectMoleInFrame } from '@/utils/MoleDetectionAlgorithm';
import React, { useEffect, useRef, useState } from 'react';
import { useFrameProcessor } from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';

/**
 * Configuration options for the mole scanner
 */
export interface MoleScannerConfig {
	stabilityRequired?: number;
	hapticTriggerFrame?: number;
	readyThresholdHigh?: number;
	readyThresholdLow?: number;
	onHapticFeedback?: () => void;
}

/**
 * Status information about the current scan
 */
export interface MoleScannerStatus {
	ready: boolean;
	score: number;
	captureProgress: number; // 0-1
}

/**
 * Custom hook for mole scanning frame processing
 * Handles real-time mole detection, stability tracking, and haptic feedback
 *
 * @param config - Optional configuration overrides
 * @returns Frame processor, frame dimensions, and current status
 */
export function useMoleScanner(config?: MoleScannerConfig) {
	// Merge config with defaults
	const stabilityRequired =
		config?.stabilityRequired ?? SCANNER_CONFIG.STABILITY_REQUIRED_FRAMES;
	const hapticTriggerFrame =
		config?.hapticTriggerFrame ?? SCANNER_CONFIG.HAPTIC_TRIGGER_FRAME;
	const readyThresholdHigh =
		config?.readyThresholdHigh ?? SCANNER_CONFIG.THRESHOLDS.READY_HIGH;
	const readyThresholdLow =
		config?.readyThresholdLow ?? SCANNER_CONFIG.THRESHOLDS.READY_LOW;
	const onHapticFeedback = config?.onHapticFeedback;

	// State management
	const [status, setStatus] = useState<MoleScannerStatus>({
		ready: false,
		score: 0,
		captureProgress: 0,
	});

	const [frameDimensions, setFrameDimensions] = useState<{
		width: number;
		height: number;
	} | null>(null);

	// Refs for worklet thread safety
	const stabilityFrames = useRef(0);
	const frameDimensionsCaptured = useRef(false);
	const isReadyRef = useRef(false);

	// Keep isReadyRef in sync with status.ready
	useEffect(() => {
		isReadyRef.current = status.ready;
	}, [status.ready]);

	/**
	 * Worklet bridge to update UI state from the frame processor thread
	 * Manages stability tracking, haptic feedback, and progress calculation
	 */
	const updateUI = React.useMemo(
		() =>
			Worklets.createRunOnJS((isReady: boolean, scoreValue: number) => {
				if (isReady && scoreValue > 0) {
					// Increment stability counter
					stabilityFrames.current = Math.min(
						stabilityFrames.current + 1,
						stabilityRequired,
					);

					// Trigger haptic feedback when first achieving ready status
					if (
						!status.ready &&
						stabilityFrames.current === hapticTriggerFrame &&
						onHapticFeedback
					) {
						onHapticFeedback();
					}

					// Calculate progress (0 to 1)
					const progress = stabilityFrames.current / stabilityRequired;

					// Update status
					setStatus({
						ready: stabilityFrames.current >= hapticTriggerFrame,
						score: scoreValue,
						captureProgress: progress,
					});

					// Update ref for worklet access
					isReadyRef.current = stabilityFrames.current >= hapticTriggerFrame;
				} else {
					// Reset stability tracking
					stabilityFrames.current = 0;

					setStatus({
						ready: false,
						score: scoreValue,
						captureProgress: 0,
					});

					isReadyRef.current = false;
				}
			}),
		[onHapticFeedback, stabilityRequired, hapticTriggerFrame, status.ready],
	);

	/**
	 * Worklet bridge to capture frame dimensions on first frame
	 */
	const captureFrameDimensions = Worklets.createRunOnJS(
		(width: number, height: number) => {
			setFrameDimensions({ width, height });
		},
	);

	/**
	 * Frame processor that analyzes each camera frame for mole detection
	 * Runs on a separate worklet thread for performance
	 */
	const frameProcessor = useFrameProcessor((frame) => {
		'worklet';

		// Capture dimensions once on first frame
		if (!frameDimensionsCaptured.current) {
			captureFrameDimensions(frame.width, frame.height);
			frameDimensionsCaptured.current = true;
			return; // Skip processing on first frame
		}

		// Get frame buffer
		const buffer = frame.toArrayBuffer();
		if (!buffer) {
			updateUI(false, 0);
			return;
		}

		// Analyze frame for mole detection
		const data = new Uint8Array(buffer);
		const result = detectMoleInFrame(data, SCANNER_CONFIG);

		// Apply hysteresis threshold logic
		// Once locked (isReady), use lower threshold to prevent flickering
		const isReady = isReadyRef.current
			? result.finalScore > readyThresholdLow
			: result.finalScore > readyThresholdHigh;

		// Bridge to main thread for UI updates
		updateUI(isReady, result.finalScore);
	}, []);

	return {
		frameProcessor,
		frameDimensions,
		status,
	};
}
