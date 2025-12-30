import { CameraView } from 'expo-camera';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';

export default function Camera() {
	const cameraRef = useRef<CameraView>(null);

	return (
		<ThemedView style={styles.container}>
			<CameraView ref={cameraRef} style={styles.camera} />
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 999,
		backgroundColor: 'black',
	},
	camera: {
		flex: 1,
	},
});
