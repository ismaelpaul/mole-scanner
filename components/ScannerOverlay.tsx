import { StyleSheet, View } from 'react-native';
import { SCANNER_CONFIG } from '@/constants/ScannerConstants';

interface ScannerOverlayProps {
	isReady: boolean;
	captureProgress: number; // 0-1
	circleSize?: number;
	verticalPosition?: string; // e.g., '40%'
}

/**
 * ScannerOverlay Component
 * Displays the circular targeting overlay with animated spinner border
 * that fills up as the mole detection becomes more stable.
 */
export function ScannerOverlay({
	isReady,
	captureProgress,
	circleSize = SCANNER_CONFIG.CIRCLE_SIZE,
	verticalPosition = SCANNER_CONFIG.VERTICAL_POSITION_PERCENT,
}: ScannerOverlayProps) {
	const radius = circleSize / 2;

	return (
		<View
			pointerEvents="none"
			style={[
				styles.overlayCircle,
				{
					// @ts-ignore - top can be string percentage
					top: verticalPosition,
					width: circleSize,
					height: circleSize,
					marginLeft: -radius,
					marginTop: -radius,
					borderRadius: radius,
					borderColor: 'rgba(255, 255, 255, 0.2)', // Static faded background
					borderWidth: 2,
				},
			]}
		>
			{/* Rotating/Growing Spinner Border */}
			<View
				style={{
					...StyleSheet.absoluteFillObject,
					borderRadius: radius,
					borderWidth: isReady ? 6 : 2,
					borderColor: 'transparent',
					borderTopColor: isReady ? '#00FF00' : 'white',
					borderRightColor:
						captureProgress > 0.4
							? isReady
								? '#00FF00'
								: 'white'
							: 'transparent',
					borderBottomColor:
						captureProgress > 0.7
							? isReady
								? '#00FF00'
								: 'white'
							: 'transparent',
					borderLeftColor:
						captureProgress > 0.9
							? isReady
								? '#00FF00'
								: 'white'
							: 'transparent',
					opacity: 0.4 + captureProgress * 0.6,
					// transform: [{ rotate: `${captureProgress * 90}deg` }],
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	overlayCircle: {
		position: 'absolute',
		left: '50%',
		zIndex: 999,
	},
});
