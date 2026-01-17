import { useIsFocused } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import BottomCameraTools from './BottomCameraTools';
import { ScannerOverlay } from './ScannerOverlay';
import { ThemedText } from './ThemedText';
import { useTorchControl } from '@/hooks/useTorchControl';
import { useMoleScanner } from '@/hooks/useMoleScanner';
import { captureAndCropMoleImage } from '@/utils/ImageProcessorUtils';

export default function ScanCamera() {
	const device = useCameraDevice('back');
	const camera = useRef<Camera>(null);
	const isFocused = useIsFocused();

	const router = useRouter();

	const [isCapturing, setIsCapturing] = useState(false);
	const [isCameraReady, setIsCameraReady] = useState(false);

	const torchEnabled = useTorchControl(isFocused, isCameraReady);

	const onInitialized = useCallback(() => setIsCameraReady(true), []);

	// Use the mole scanner hook for frame processing
	const { frameProcessor, frameDimensions, status } = useMoleScanner({
		onHapticFeedback: () => {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		},
	});

	const takePhoto = async () => {
		if (!camera.current || isCapturing || !frameDimensions) return;

		try {
			setIsCapturing(true);

			const uri = await captureAndCropMoleImage(camera.current, {
				frameDimensions,
			});

			router.push({
				pathname: '/ReviewPhoto',
				params: { uri },
			});
		} catch (e) {
			console.error('Capture and Crop Failed:', e);
		} finally {
			setIsCapturing(false);
		}
	};

	if (!device)
		return (
			<View style={styles.container}>
				<ThemedText>Loading...</ThemedText>
			</View>
		);

	return (
		<View style={{ flex: 1, backgroundColor: 'black' }}>
			<Camera
				ref={camera}
				style={StyleSheet.absoluteFill}
				device={device}
				isActive={isFocused}
				photo={true}
				onInitialized={onInitialized}
				torch={torchEnabled ? 'on' : 'off'}
				frameProcessor={frameProcessor}
			/>

			<ScannerOverlay
				isReady={status.ready}
				captureProgress={status.captureProgress}
			/>

			<BottomCameraTools
				isReady={status.ready}
				isCapturing={isCapturing}
				score={status.score}
				onCapture={takePhoto}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	},
});
