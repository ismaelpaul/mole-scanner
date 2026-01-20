/**
 * Body regions and locations for mole tracking
 * Organized hierarchically for easy navigation and mapping
 */

import type { BodyRegionRef, BodyRegion } from '@/types/mole';

/**
 * All available body locations organized by category
 * Total: ~25 regions covering the full body
 */
export const BODY_REGIONS: BodyRegion[] = [
	{
		category: 'Head & Neck',
		locations: [
			{ regionId: 'face', displayName: 'Face' },
			{ regionId: 'scalp', displayName: 'Scalp' },
			{ regionId: 'neck', displayName: 'Neck' },
		],
	},
	{
		category: 'Torso',
		locations: [
			{ regionId: 'chest', displayName: 'Chest' },
			{ regionId: 'abdomen', displayName: 'Abdomen' },
			{ regionId: 'upper_back', displayName: 'Upper Back' },
			{ regionId: 'lower_back', displayName: 'Lower Back' },
		],
	},
	{
		category: 'Arms',
		locations: [
			{ regionId: 'left_shoulder', displayName: 'Left Shoulder' },
			{ regionId: 'left_upper_arm', displayName: 'Left Upper Arm' },
			{ regionId: 'left_forearm', displayName: 'Left Forearm' },
			{ regionId: 'left_hand', displayName: 'Left Hand' },
			{ regionId: 'right_shoulder', displayName: 'Right Shoulder' },
			{ regionId: 'right_upper_arm', displayName: 'Right Upper Arm' },
			{ regionId: 'right_forearm', displayName: 'Right Forearm' },
			{ regionId: 'right_hand', displayName: 'Right Hand' },
		],
	},
	{
		category: 'Legs',
		locations: [
			{ regionId: 'left_thigh', displayName: 'Left Thigh' },
			{ regionId: 'left_knee', displayName: 'Left Knee' },
			{ regionId: 'left_lower_leg', displayName: 'Left Lower Leg' },
			{ regionId: 'left_foot', displayName: 'Left Foot' },
			{ regionId: 'right_thigh', displayName: 'Right Thigh' },
			{ regionId: 'right_knee', displayName: 'Right Knee' },
			{ regionId: 'right_lower_leg', displayName: 'Right Lower Leg' },
			{ regionId: 'right_foot', displayName: 'Right Foot' },
		],
	},
];

/**
 * Flat list of all body region references for quick lookup
 */
export const ALL_BODY_LOCATIONS: BodyRegionRef[] = BODY_REGIONS.flatMap(
	(region) => region.locations
);

/**
 * Get a body region reference by its regionId
 */
export const getBodyLocationById = (
	regionId: string
): BodyRegionRef | undefined => {
	return ALL_BODY_LOCATIONS.find((loc) => loc.regionId === regionId);
};

/**
 * Get the category for a given regionId
 */
export const getCategoryForRegion = (regionId: string): string | undefined => {
	const region = BODY_REGIONS.find((r) =>
		r.locations.some((loc) => loc.regionId === regionId)
	);
	return region?.category;
};

/**
 * Note: Pinpoint positions are now stored dynamically with each mole.
 * Users can place pinpoints anywhere on the body map by tapping.
 * The BODY_REGIONS above are kept for reference/categorization only.
 */
