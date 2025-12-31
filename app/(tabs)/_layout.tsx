import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const insets = useSafeAreaInsets();

	const theme = colorScheme === 'light' ? Colors.light : Colors.dark;

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: theme.tabIconSelected,
				tabBarInactiveTintColor: theme.tabIconDefault,
				tabBarStyle: {
					backgroundColor: theme.background,
					height: 60 + insets.bottom,
					paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
				},
			}}
		>
			<Tabs.Screen
				name="history"
				options={{
					title: 'History',
					tabBarIcon: ({ color }) => (
						<IconSymbol name="clock.fill" size={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="scan"
				options={{
					title: 'Scan',
					tabBarIcon: ({ color }) => (
						<IconSymbol name="qrcode.viewfinder" size={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => (
						<IconSymbol name="person.fill" size={28} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
