import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { ScrollView } from 'react-native';

export default function ProfileScreen() {
	return (
		<Screen>
			<ScrollView contentContainerStyle={{ padding: 20 }}>
				<ThemedText type="title">Welcome to the Profile Screen!</ThemedText>
			</ScrollView>
		</Screen>
	);
}
