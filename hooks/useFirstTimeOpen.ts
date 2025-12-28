import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export function useFirstTimeOpen() {
	const [isFirstTime, setIsFirstTime] = React.useState<boolean>(false);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		async function checkFirstTimeOpen() {
			try {
				const hasOpened = await AsyncStorage.getItem('hasOpened');

				if (hasOpened === null) {
					setIsFirstTime(true);
					await AsyncStorage.setItem('hasOpened', 'true');
				} else {
					setIsFirstTime(false);
				}
			} catch (error) {
				console.error('Error checking first time open:', error);
			} finally {
				setIsLoading(false);
			}
		}

		checkFirstTimeOpen();
	}, []);

	return { isFirstTime, isLoading };
}
