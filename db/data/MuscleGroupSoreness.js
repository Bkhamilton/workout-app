// app/db/data/MuscleSoreness.js
export const getMuscleGroupSoreness = async (db, userId) => {
    try {
        return await db.getAllAsync(
            'SELECT muscle_group, muscle_group_id, soreness_score FROM MuscleGroupSoreness WHERE user_id = ?',
            [userId]
        );
    } catch (error) {
        console.error('Error fetching muscle group soreness:', error);
        throw error;
    }
};

export const updateMuscleSoreness = async (db, userId) => {
    try {
        // Calculate current soreness
        const currentSoreness = await db.getAllAsync(`
            SELECT muscle_group_id, soreness_score 
            FROM MuscleGroupSoreness
            WHERE user_id = ?
        `, [userId]);
        
        // Update max soreness levels
        for (const { muscle_group_id, soreness_score } of currentSoreness) {
            // Get current max_soreness
            const row = await db.getFirstAsync(
                `SELECT max_soreness FROM UserMuscleMaxSoreness WHERE user_id = ? AND muscle_group_id = ?`,
                [userId, muscle_group_id]
            );
            const currentMax = row?.max_soreness ?? 0;
            if (soreness_score > currentMax) {
                await db.runAsync(
                    `INSERT OR REPLACE INTO UserMuscleMaxSoreness (user_id, muscle_group_id, max_soreness) VALUES (?, ?, ?)`,
                    [userId, muscle_group_id, soreness_score]
                );
            }
        }
        
        // Store soreness history
        for (const { muscle_group_id, soreness_score } of currentSoreness) {
            await db.runAsync(`
                INSERT INTO MuscleSorenessHistory (
                    user_id, muscle_group_id, soreness_score
                ) VALUES (?, ?, ?)
            `, [userId, muscle_group_id, soreness_score]);
        }
        
        return true;
    } catch (error) {
        console.error('Error updating muscle soreness:', error);
        return false;
    }
};