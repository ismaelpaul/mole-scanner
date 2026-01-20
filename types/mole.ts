/**
 * Type definitions for mole tracking and storage
 */

/**
 * Body region reference (for categorization/selection)
 */
export interface BodyRegionRef {
	regionId: string; // e.g., "left_upper_arm"
	displayName: string; // e.g., "Left Upper Arm"
}

/**
 * Body location on the human body with position
 * Used for mole records and body map visualization
 */
export interface BodyLocation {
	regionId: string; // e.g., "left_upper_arm" or UUID for custom locations
	displayName: string; // e.g., "Left Upper Arm"
	view: 'front' | 'back'; // Which side of the body
	x: number; // Normalized x position (0-1)
	y: number; // Normalized y position (0-1)
}

/**
 * A single image capture of a mole
 * Each image has its own notes and timestamp for longitudinal comparison
 */
export interface MoleImage {
	uri: string; // File URI to the image
	capturedAt: Date; // When the photo was taken
	width: number; // Image width (800px from scanner)
	height: number; // Image height (800px from scanner)
	notes: string; // Optional notes for this specific photo
}

/**
 * A mole record representing a single mole on the body
 * Multiple photos can be associated with the same mole over time
 */
export interface MoleRecord {
	id: string; // UUID - unique identifier
	location: BodyLocation; // Where on the body this mole is located
	images: MoleImage[]; // Array of photos taken over time
	createdAt: Date; // When the first photo was captured
	updatedAt: Date; // When the last photo was added
}

/**
 * Body region category for organizing locations
 */
export interface BodyRegion {
	category: string; // e.g., "Arms", "Legs", "Torso"
	locations: BodyRegionRef[]; // Location references within this category
}
