import { ThemedText } from '@/components/ThemedText';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
	return (
		<ScrollView>
			<ThemedText type="title">Welcome to the Onboarding Screen!</ThemedText>
		</ScrollView>
	);
}
