import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/icon-symbol';

interface MenuRowProps {
	icon: Parameters<typeof IconSymbol>[0]['name'];
	title: string;
	subtitle?: string;
	isToggle?: boolean;
}

export default function MenuRow({
	icon,
	title,
	subtitle,
	isToggle,
}: MenuRowProps) {
	return (
		<TouchableOpacity style={styles.row}>
			<ThemedView
				style={styles.rowIconLabel}
				lightColor="transparent"
				darkColor="transparent"
			>
				<IconSymbol name={icon} size={20} color="#00C4B4" />
				<ThemedView
					style={styles.rowTextGap}
					lightColor="transparent"
					darkColor="transparent"
				>
					<ThemedText type="defaultSemiBold">{title}</ThemedText>
					{subtitle && (
						<ThemedText
							type="default"
							color="secondary"
							style={styles.subtitle}
						>
							{subtitle}
						</ThemedText>
					)}
				</ThemedView>
			</ThemedView>
			<Ionicons name="chevron-forward" size={18} color="#666" />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 16,
	},
	rowIconLabel: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	rowTextGap: {
		marginLeft: 15,
	},
	subtitle: {
		fontSize: 12,
		opacity: 0.5,
	},
});
