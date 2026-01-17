import { useFirstTimeOpen } from '@/hooks/useFirstTimeOpen';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

export default function Index() {
	const { isFirstTime, isLoading } = useFirstTimeOpen();

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator />
			</View>
		);
	}

	if (isFirstTime) {
		return <Redirect href="/onboarding" />;
	}

	return <Redirect href="/(tabs)/history" />;
}
