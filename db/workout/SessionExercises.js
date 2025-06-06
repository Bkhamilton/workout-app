export const getSessionExercises = async (db) => {
    try {
        const query = `
            SELECT 
                se.*, 
                ws.start_time AS sessionStartTime, 
                ws.end_time AS sessionEndTime, 
                e.name AS exerciseName
            FROM 
                SessionExercises se
            LEFT JOIN 
                WorkoutSessions ws 
            ON 
                se.session_id = ws.id
            LEFT JOIN 
                Exercises e 
            ON 
                se.exercise_id = e.id
            `;
        const allRows = await db.getAllAsync(query);
        return allRows;
    } catch (error) {
        console.error('Error getting session exercises:', error);
        throw error;
    }
};

export const insertSessionExercise = async (db, sessionExercise) => {
    try {
        const result = await db.runAsync(
            `INSERT INTO SessionExercises (session_id, exercise_id) 
             VALUES (?, ?)`,
            [sessionExercise.sessionId, sessionExercise.exerciseId]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Error inserting session exercise:', error);
        throw error;
    }
};

export const updateSessionExercise = async (db, sessionExercise) => {
    try {
        await db.runAsync(
            `UPDATE SessionExercises 
             SET session_id = ?, exercise_id = ? 
             WHERE id = ?`,
            [sessionExercise.sessionId, sessionExercise.exerciseId, sessionExercise.id]
        );
        console.log('Session exercise updated');
    } catch (error) {
        console.error('Error updating session exercise:', error);
        throw error;
    }
};

export const deleteSessionExercise = async (db, sessionExerciseId) => {
    try {
        await db.runAsync('DELETE FROM SessionExercises WHERE id = ?', [sessionExerciseId]);
    } catch (error) {
        console.error('Error deleting session exercise:', error);
        throw error;
    }
};
