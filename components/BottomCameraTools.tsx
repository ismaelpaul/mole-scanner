import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

interface BottomCameraToolsProps {
	isReady: boolean;
	isCapturing: boolean;
	score: number;
	onCapture: () => void;
	showScore?: boolean; // Debug mode flag
}

/**
 * BottomCameraTools Component
 * Displays the capture button, status text, and optional debug score
 * at the bottom of the camera screen.
 */
export default function BottomCameraTools({
	isReady,
	isCapturing,
	score,
	onCapture,
	showScore = true,
}: BottomCameraToolsProps) {
	return (
		<View style={styles.bottomBar}>
			<TouchableOpacity
				style={[styles.captureButton, { opacity: isReady ? 1 : 0.4 }]}
				onPress={onCapture}
				disabled={isCapturing}
			>
				{isCapturing ? (
					<ActivityIndicator color="black" />
				) : (
					<View style={styles.captureInternal} />
				)}
			</TouchableOpacity>

			<ThemedText
				style={[
					styles.hintText,
					{ color: isReady ? '#00FF00' : 'white' },
				]}
			>
				{isReady ? 'STABLE - CAPTURE' : 'ALIGN MOLE'}
			</ThemedText>

			{showScore && (
				<View style={styles.scoreBadge}>
					<ThemedText style={{ color: 'white' }}>
						Score: {score}
					</ThemedText>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
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
	hintText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	scoreBadge: {
		marginTop: 10,
		padding: 5,
		backgroundColor: 'rgba(0,0,0,0.6)',
		borderRadius: 5,
	},
});
