import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, View } from 'react-native';

export function ThemedCard({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: object;
}) {
	const backgroundColor = useThemeColor({}, 'cardBackground');

	return (
		<View style={[styles.card, style, { backgroundColor }]}>{children}</View>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 16,
		borderRadius: 5,
	},
});
