import React, { useRef, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { ThemedText } from './ThemedText';

export default function ScanCamera() {
	const device = useCameraDevice('back');
	const camera = useRef<Camera>(null);
	const [isCapturing, setIsCapturing] = useState(false);

	const takePhoto = async () => {
		if (!camera.current) return;

		try {
			setIsCapturing(true);
			const photo = await camera.current.takePhoto({
				flash: 'auto',
				enableShutterSound: true,
			});

			console.log('Photo captured:', photo.path);

			uploadPhoto(photo.path);

			Alert.alert('Success', 'Photo captured! Path: ' + photo.path);
		} catch (e) {
			Alert.alert('Error', 'Failed to take photo');
			console.error(e);
		} finally {
			setIsCapturing(false);
		}
	};

	const uploadPhoto = async (filePath: string) => {
		const formData = new FormData();
		formData.append('file', {
			uri: 'file://' + filePath,
			type: 'image/jpeg',
			name: 'mole_scan.jpg',
		} as any);

		try {
			const response = await fetch('SERVER_URL/upload', {
				method: 'POST',
				body: formData,
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			const result = await response.json();
			console.log('Upload success:', result);
		} catch (error) {
			console.error('Upload failed:', error);
		}
	};

	if (!device)
		return (
			<View style={styles.container}>
				<ThemedText>Loading Camera...</ThemedText>
			</View>
		);

	return (
		<View style={{ flex: 1, backgroundColor: 'black' }}>
			<Camera
				ref={camera}
				style={StyleSheet.absoluteFill}
				device={device}
				isActive={true}
				photo={true}
			/>

			<View style={styles.overlayCircle} />

			<View style={styles.bottomBar}>
				<TouchableOpacity
					style={styles.captureButton}
					onPress={takePhoto}
					disabled={isCapturing}
				>
					{isCapturing ? (
						<ActivityIndicator color="black" />
					) : (
						<View style={styles.captureInternal} />
					)}
				</TouchableOpacity>
				<ThemedText style={styles.hintText}>
					Center the mole inside the circle
				</ThemedText>
			</View>
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
	overlayCircle: {
		position: 'absolute',
		top: '40%',
		left: '50%',
		width: 220,
		height: 220,
		marginLeft: -110,
		marginTop: -110,
		borderRadius: 110,
		borderWidth: 2,
		borderColor: 'white',
		borderStyle: 'dashed',
	},
	bottomBar: {
		position: 'absolute',
		bottom: 50,
		width: '100%',
		alignItems: 'center',
	},
	captureButton: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
	captureInternal: {
		width: 66,
		height: 66,
		borderRadius: 33,
		borderWidth: 4,
		borderColor: 'black',
	},
	hintText: { color: 'white', fontSize: 14, opacity: 0.8 },
});
