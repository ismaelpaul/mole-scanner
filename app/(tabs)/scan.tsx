import Camera from '@/components/Camera';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCameraPermissions } from 'expo-camera';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export default function ScanScreen() {
	const [cameraPermission, requestCameraPermission] = useCameraPermissions();

	useEffect(() => {
		async function requestPermissions() {
			const cameraStatus = await requestCameraPermission();

			if (!cameraStatus?.granted) {
				Alert.alert(
					'Permission required',
					'Camera access is needed to take photos.'
				);
				return false;
			}
		}
		requestPermissions();
	}, []);

	return (
		<ThemedView style={{ flex: 1 }}>
			{cameraPermission?.granted ? (
				<Camera />
			) : (
				<ThemedText>Please allow camera access to use this feature.</ThemedText>
			)}
		</ThemedView>
	);
}
