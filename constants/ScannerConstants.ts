/**
 * Scanner Configuration Constants
 * Centralizes all magic numbers and thresholds used in the mole scanning logic
 */

export const SCANNER_CONFIG = {
	// UI Layout
	CIRCLE_SIZE: 140,
	CIRCLE_RADIUS: 70, // CIRCLE_SIZE / 2
	VERTICAL_POSITION: 0.4, // 40% from top
	VERTICAL_POSITION_PERCENT: '40%', // For style positioning

	// Stability Tracking
	STABILITY_REQUIRED_FRAMES: 15, // Frames needed for full spinner
	HAPTIC_TRIGGER_FRAME: 5, // Frame count to trigger haptic feedback

	// Camera Settings
	FRAME_PROCESSOR_FPS: 10,
	TORCH_DELAY_MS: 200,

	// Frame Processing - Pixel Sampling
	SAMPLING: {
		RANGE: 600, // Sample from -600 to +600 pixels
		STEP: 12, // Sample every 12 pixels
		CENTER_RANGE: 100, // Center brightness calculated from -100 to +100
		CENTER_SAMPLE_COUNT: 200 / 12, // Approximate samples in center
		EDGE_SAMPLE_COUNT: 1000 / 12, // Approximate samples in edge
		PIXEL_STRIDE: 4, // Bytes per pixel for contrast calculation
		CONTRAST_MULTIPLIER: 10, // Score multiplier for contrast
	},

	// Mole Detection Thresholds
	THRESHOLDS: {
		READY_HIGH: 45, // Initial threshold (stricter)
		READY_LOW: 35, // Hysteresis threshold (more lenient once locked)
		CONTRAST_RATIO: 0.8, // Center must be < edge * 0.8 to be valid
	},

	// Image Cropping
	CROP: {
		SCALE_FACTOR: 1.1, // Slight enlargement of crop region
		OUTPUT_SIZE: 800, // Final image dimensions (800x800)
		JPEG_QUALITY: 0.95, // Compression quality
	},
} as const;
