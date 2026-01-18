import { SCANNER_CONFIG } from '@/constants/ScannerConstants';
import * as ImageManipulator from 'expo-image-manipulator';
import type { Camera } from 'react-native-vision-camera';

export interface CropParams {
	frameDimensions: { width: number; height: number };
	circleSize?: number;
	verticalPosition?: number; // 0-1 (e.g., 0.4 for 40%)
	scaleFactor?: number;
	outputSize?: number;
}

/**
 * Captures a photo from the camera and crops it to a circular region
 * centered at the specified vertical position.
 *
 * This function handles:
 * 1. Taking the photo with the camera
 * 2. Rotating the photo to match screen orientation
 * 3. Calculating scale factors based on frame dimensions
 * 4. Cropping to a circular region at the specified position
 * 5. Upscaling to the final output size
 *
 * @param camera - The camera reference to take the photo from
 * @param params - Crop parameters including frame dimensions and optional overrides
 * @returns Promise resolving to the URI of the processed image
 */
export async function captureAndCropMoleImage(
	camera: Camera,
	params: CropParams,
): Promise<string> {
	const {
		frameDimensions,
		circleSize = SCANNER_CONFIG.CIRCLE_SIZE,
		verticalPosition = SCANNER_CONFIG.VERTICAL_POSITION,
		scaleFactor = SCANNER_CONFIG.CROP.SCALE_FACTOR,
		outputSize = SCANNER_CONFIG.CROP.OUTPUT_SIZE,
	} = params;

	// TAKE PHOTO
	const photo = await camera.takePhoto({ flash: 'off' });

	//  DETERMINE ROTATION AND MIRRORING
	let rotation = 0;
	const orientation = photo.orientation;

	if (orientation === 'landscape-left') rotation = -90;
	if (orientation === 'landscape-right') rotation = 90;
	if (orientation === 'portrait-upside-down') rotation = 180;

	// Build the transformations array
	const actions: ImageManipulator.Action[] = [];

	if (rotation !== 0) {
		actions.push({ rotate: rotation });
	}

	// FIX IMAGE ORIENTATION (Bake in rotation and flips)
	const fixedImageOrientation = await ImageManipulator.manipulateAsync(
		`file://${photo.path}`,
		actions,
		{ format: ImageManipulator.SaveFormat.JPEG },
	);

	const pW = fixedImageOrientation.width;
	const pH = fixedImageOrientation.height;

	// CALCULATE SCALE
	const scaleX = pW / frameDimensions.width;
	const scaleY = pH / frameDimensions.height;
	const cropSize = Math.floor(circleSize * scaleX * scaleFactor);

	// MAP THE CENTER
	const originX = Math.floor((pW - cropSize) / 2);
	const originY = Math.floor(
		frameDimensions.height * verticalPosition * scaleY - cropSize / 2,
	);

	// CROP & UPSCALING
	const result = await ImageManipulator.manipulateAsync(
		fixedImageOrientation.uri,
		[
			{
				crop: {
					originX: Math.max(0, Math.min(originX, pW - cropSize)),
					originY: Math.max(0, Math.min(originY, pH - cropSize)),
					width: cropSize,
					height: cropSize,
				},
			},
			{ resize: { width: outputSize, height: outputSize } },
		],
		{
			compress: SCANNER_CONFIG.CROP.JPEG_QUALITY,
			format: ImageManipulator.SaveFormat.JPEG,
		},
	);

	return result.uri;
}
