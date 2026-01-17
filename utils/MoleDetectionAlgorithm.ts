'use strict';

import { SCANNER_CONFIG } from '@/constants/ScannerConstants';

/**
 * Result of mole detection analysis
 */
export interface MoleDetectionResult {
	finalScore: number;
	isContrastValid: boolean;
	avgCenter: number;
	avgEdge: number;
}

/**
 * Analyzes a frame buffer to detect the presence of a mole
 * Uses contrast and brightness validation to determine if a dark spot (mole) is in the center
 *
 * @param data - Uint8Array frame buffer data
 * @param config - Scanner configuration constants
 * @returns Detection result with score and validation details
 */
export function detectMoleInFrame(
	data: Uint8Array,
	config: typeof SCANNER_CONFIG,
): MoleDetectionResult {
	'worklet';

	const mid = Math.floor(data.length / 2);

	let diffSum = 0;
	let centerBrightness = 0;
	let edgeBrightness = 0;
	let count = 0;

	// Sample pixels in a range around the center of the frame
	for (
		let i = -config.SAMPLING.RANGE;
		i < config.SAMPLING.RANGE;
		i += config.SAMPLING.STEP
	) {
		const idx = mid + i;
		if (idx > 0 && idx + config.SAMPLING.PIXEL_STRIDE < data.length) {
			// Calculate contrast between adjacent pixels
			diffSum += Math.abs(data[idx] - data[idx + config.SAMPLING.PIXEL_STRIDE]);

			// Track brightness in center vs edge regions
			if (
				i > -config.SAMPLING.CENTER_RANGE &&
				i < config.SAMPLING.CENTER_RANGE
			) {
				centerBrightness += data[idx];
			} else {
				edgeBrightness += data[idx];
			}
			count++;
		}
	}

	// No valid samples
	if (count === 0) {
		return {
			finalScore: 0,
			isContrastValid: false,
			avgCenter: 0,
			avgEdge: 0,
		};
	}

	// Calculate average contrast score
	const score = Math.floor(
		(diffSum / count) * config.SAMPLING.CONTRAST_MULTIPLIER,
	);

	// Calculate average brightness in center and edge regions
	const avgCenter =
		centerBrightness / config.SAMPLING.CENTER_SAMPLE_COUNT;
	const avgEdge = edgeBrightness / config.SAMPLING.EDGE_SAMPLE_COUNT;

	// Mole Validation: Center must be darker than edges
	const isContrastValid =
		avgCenter < avgEdge * config.THRESHOLDS.CONTRAST_RATIO;

	// Return zero score if contrast validation fails
	const finalScore = isContrastValid ? score : 0;

	return {
		finalScore,
		isContrastValid,
		avgCenter,
		avgEdge,
	};
}
