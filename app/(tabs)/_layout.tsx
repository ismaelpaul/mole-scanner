import { IconSymbol } from '@/components/ui/icon-symbol';
import { Tabs } from 'expo-router';

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
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
