import { Colors } from '@/constants/theme';
import {
	StyleProp,
	StyleSheet,
	useColorScheme,
	View,
	ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenProps {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}

export function Screen({ children, style }: ScreenProps) {
	const insets = useSafeAreaInsets();
	const colorScheme = useColorScheme();
	const theme = colorScheme === 'light' ? Colors.light : Colors.dark;

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: theme.background,
					paddingTop: insets.top,
				},
				style,
			]}
		>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
