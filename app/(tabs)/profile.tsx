import IconButton from '@/components/IconButton';
import MenuRow from '@/components/MenuRow';
import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';

export default function ProfileScreen() {
	return (
		<ThemedView style={styles.container}>
			{/* Top Navigation Row */}

			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* --- Profile Header --- */}
				<ThemedView style={styles.profileSection}>
					<ThemedView style={styles.avatarContainer}>
						<Image
							source={{ uri: 'https://via.placeholder.com/120' }}
							style={styles.avatar}
						/>
						<IconButton
							name="pencil"
							containerStyle={styles.editIcon}
							width={16}
							height={16}
						/>
					</ThemedView>

					<ThemedText type="title" style={styles.userName}>
						Ismael Paul
					</ThemedText>
					<ThemedText style={styles.userEmail}>ismael@example.com</ThemedText>
				</ThemedView>

				{/* --- Account Section --- */}
				<ThemedText color="secondary" style={styles.sectionLabel}>
					ACCOUNT
				</ThemedText>
				<ThemedCard style={styles.card}>
					<MenuRow
						icon="person.fill"
						title="Personal Details"
						subtitle="Age, Gender"
					/>
					<ThemedView style={styles.divider} />
					<MenuRow
						icon="face.smiling.fill"
						title="Skin Profile"
						subtitle="Fitzpatrick Type II"
					/>
					<ThemedView style={styles.divider} />
				</ThemedCard>

				{/* --- Preferences Section --- */}
				<ThemedText style={styles.sectionLabel}>PREFERENCES</ThemedText>
				<ThemedCard style={styles.card}>
					<MenuRow icon="bell.fill" title="Daily Scan Reminder" isToggle />
				</ThemedCard>
			</ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	navBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 50,
		paddingBottom: 10,
	},
	headerTitle: {
		fontSize: 18,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingBottom: 40,
	},
	profileSection: {
		alignItems: 'center',
		marginVertical: 20,
	},
	avatarContainer: {
		position: 'relative',
		marginBottom: 15,
	},
	avatar: {
		width: 110,
		height: 110,
		borderRadius: 55,
	},
	editIcon: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		backgroundColor: '#00C4B4',
		opacity: 1,
	},
	userName: {
		fontSize: 26,
	},
	userEmail: {
		opacity: 0.6,
		fontSize: 14,
		marginTop: 4,
	},
	proBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 196, 180, 0.1)',
		paddingHorizontal: 12,
		paddingVertical: 5,
		borderRadius: 20,
		marginTop: 12,
	},
	proText: {
		color: '#00C4B4',
		fontSize: 12,
		fontWeight: '700',
		marginLeft: 6,
	},
	sectionLabel: {
		fontSize: 12,
		fontWeight: '700',
		opacity: 0.4,
		marginTop: 25,
		marginBottom: 10,
		marginLeft: 4,
	},
	card: {
		padding: 0,
		overflow: 'hidden',
	},

	divider: {
		height: 1,
		backgroundColor: 'rgba(255,255,255,0.05)',
		marginHorizontal: 16,
	},
});
