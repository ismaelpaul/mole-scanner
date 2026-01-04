import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

interface IconButtonProps {
	name: Parameters<typeof IconSymbol>[0]['name'];
	containerStyle?: StyleProp<ViewStyle>;
	onPress?: () => void;
	width?: number;
	height?: number;
}

export default function IconButton({
	onPress,
	name,
	containerStyle,
	width,
	height,
}: IconButtonProps) {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.5}
			style={[
				{
					backgroundColor: '#eed5d550',
					opacity: 0.5,
					padding: 5,
					borderRadius: 50,
					width: 30,
					height: 30,
					alignItems: 'center',
					justifyContent: 'center',
				},
				containerStyle,
			]}
		>
			<IconSymbol
				name={name}
				size={25}
				style={width && height ? { width, height } : {}}
				color="white"
			/>
		</TouchableOpacity>
	);
}
