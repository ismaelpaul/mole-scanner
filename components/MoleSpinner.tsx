import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface Props {
	progress: SharedValue<number>;
	isReady: SharedValue<boolean>;
}

export const MoleSpinner = ({ progress, isReady }: Props) => {
	const animatedStyle = useAnimatedStyle(() => {
		const mainColor = isReady.value ? '#00FF00' : 'white';

		return {
			transform: [{ rotate: `${progress.value * 90}deg` }],
			opacity: 0.4 + progress.value * 0.6,

			borderTopColor: mainColor,

			// if progress > 0.4 show color, else transparent
			borderRightColor: progress.value > 0.4 ? mainColor : 'transparent',

			// if progress > 0.7 show color, else transparent
			borderBottomColor: progress.value > 0.7 ? mainColor : 'transparent',

			borderLeftColor: 'transparent',
		};
	});

	return (
		<View style={styles.overlayCircle}>
			{/* Static Background Ring */}
			<View style={styles.staticRing} />

			{/* Animated Spinner */}
			<View style={[styles.spinner, animatedStyle]} />
		</View>
	);
};

const styles = StyleSheet.create({
	overlayCircle: {
		position: 'absolute',
		top: '40%',
		left: '50%',
		width: 140,
		height: 140,
		marginLeft: -70,
		marginTop: -70,
		zIndex: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	staticRing: {
		...StyleSheet.absoluteFillObject,
		borderRadius: 70,
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.2)',
	},
	spinner: {
		...StyleSheet.absoluteFillObject,
		borderRadius: 70,
		borderWidth: 6,
		borderColor: 'transparent',
	},
});
