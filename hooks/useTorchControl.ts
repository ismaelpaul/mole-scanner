import { useEffect, useState } from 'react';
import { SCANNER_CONFIG } from '@/constants/ScannerConstants';

/**
 * useTorchControl Hook
 * Manages torch (flashlight) state based on camera focus and readiness.
 * Automatically enables torch with a delay when camera is focused and ready,
 * and disables it when unfocused.
 *
 * @param isFocused - Whether the camera screen is currently focused
 * @param isCameraReady - Whether the camera has been initialized
 * @param delayMs - Optional delay in milliseconds before enabling torch
 * @returns Boolean indicating whether torch should be enabled
 */
export function useTorchControl(
	isFocused: boolean,
	isCameraReady: boolean,
	delayMs: number = SCANNER_CONFIG.TORCH_DELAY_MS,
): boolean {
	const [torchEnabled, setTorchEnabled] = useState(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (isFocused && isCameraReady) {
			timeout = setTimeout(() => setTorchEnabled(true), delayMs);
		} else {
			setTorchEnabled(false);
		}

		return () => clearTimeout(timeout);
	}, [isFocused, isCameraReady, delayMs]);

	return torchEnabled;
}
