export const getSessionExercises = async (db) => {
    try {
        const query = `
            SELECT 
                se.*, 
                ws.start_time AS sessionStartTime, 
                ws.end_time AS sessionEndTime, 
                e.title AS exerciseName
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

export const getRecentSorenessExercises = async (db, userId, muscleGroupId) => {
    const query = `
        SELECT DISTINCT e.id, e.title
        FROM WorkoutSessions ws
        JOIN SessionExercises se ON ws.id = se.session_id
        JOIN Exercises e ON se.exercise_id = e.id
        JOIN ExerciseMuscles em ON em.exercise_id = e.id
        JOIN Muscles m ON em.muscle_id = m.id
        JOIN MuscleGroups mg ON m.muscle_group_id = mg.id
        WHERE ws.user_id = ?
          AND mg.id = ?
          AND ws.start_time >= date('now', '-14 days')
        ORDER BY ws.start_time DESC
    `;
    const rows = await db.getAllAsync(query, [userId, muscleGroupId]);
    if (!rows || rows.length === 0) {
        return [];
    }
    return rows;
};

export const getSessionExercisesBySessionId = async (db, sessionId) => {
    try {
        const query = `
            SELECT 
                se.*, 
                e.title AS title,
                eq.name as equipment,
                mg.name as muscleGroup
            FROM 
                SessionExercises se
            LEFT JOIN 
                Exercises e 
            ON 
                se.exercise_id = e.id
            LEFT JOIN
                Equipment eq
            ON
                e.equipment_id = eq.id
            LEFT JOIN
                MuscleGroups mg
            ON
                e.muscle_group_id = mg.id
            WHERE 
                se.session_id = ?
            ORDER BY 
                se.id ASC
        `;
        const allRows = await db.getAllAsync(query, [sessionId]);
        return allRows;
    } catch (error) {
        console.error('Error getting session exercises by session ID:', error);
        throw error;
    }
}

export const getSessionExerciseId = async (db, sessionId, exerciseId) => {
    try {
        const query = `
            SELECT 
                se.id
            FROM 
                SessionExercises se
            WHERE 
                se.session_id = ? AND
                se.exercise_id = ?
        `;
        const row = await db.getFirstAsync(query, [sessionId, exerciseId]);
        return row ? row.id : null;
    } catch (error) {
        console.error('Error getting session exercise ID:', error);
        throw error;
    }
};

export const getCurrentMax = async (db, exerciseId) => {
    try {
        const query = `
            SELECT 
                MAX(ss.weight) AS currentMax
            FROM 
                SessionExercises se
            JOIN 
                Exercises e ON se.exercise_id = e.id
            JOIN 
                SessionSets ss ON se.id = ss.session_exercise_id
            WHERE 
                e.id = ?
        `;
        const row = await db.getFirstAsync(query, [exerciseId]);
        return row ? row.currentMax : null;
    } catch (error) {
        console.error('Error getting current max:', error);
        throw error;
    }
}

export const getTopExercise = async (db, userId) => {
    try {
        const query = `
            SELECT 
                e.id, 
                e.title, 
                COUNT(se.id) AS sessionCount
            FROM 
                SessionExercises se
            JOIN 
                Exercises e ON se.exercise_id = e.id
            JOIN 
                WorkoutSessions ws ON se.session_id = ws.id
            WHERE 
                ws.user_id = ?
            GROUP BY 
                e.id
            ORDER BY 
                sessionCount DESC
            LIMIT 1
        `;
        const row = await db.getFirstAsync(query, [userId]);
        return row;
    } catch (error) {
        console.error('Error getting top exercise:', error);
        throw error;
    }
}

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

export const clearSessionExercises = async (db, sessionId) => {
    try {
        await db.runAsync('DELETE FROM SessionExercises WHERE session_id = ?', [sessionId]);
    } catch (error) {
        console.error('Error clearing session exercises:', error);
        throw error;
    }
};
