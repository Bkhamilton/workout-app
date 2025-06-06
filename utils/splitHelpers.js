import { getSplitRoutines } from '@/db/user/SplitRoutines';
import { getSplits } from '@/db/user/Splits';

export const getSplitData = async (db, userId) => {
    // Fetch all routines for the user
    const splits = await getSplits(db, userId);
    if (!splits) {
        return null; // Return null if no routines are found
    }

    // Fill the routine data with exercises
    const filledSplits = await fillSplitData(db, splits);
    return filledSplits; // Return the filled routines
}

export const fillSplitData = async (db, splits) => {
    const splitWithRoutines = [];

    for (const split of splits) {
        // Fetch details for the current exercise
        const routines = await getSplitRoutines(db, split.id);

        splitWithRoutines.push({
            ...split, // Spread the existing split fields
            routines: routines,  // Add the routines field
        });
    }

    return splitWithRoutines; // Return the updated exercises array
}