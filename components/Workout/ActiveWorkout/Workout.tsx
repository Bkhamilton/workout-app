import { Text, View } from '@/components/Themed';
import { ActiveRoutine } from '@/utils/types';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import WorkoutInfo from './WorkoutInfo';

interface WorkoutProps {
    open: () => void;
    routine: ActiveRoutine;
    onUpdateSet: (exerciseId: number, setId: number, field: 'weight' | 'reps', value: string) => void;
    onAddSet: (exerciseId: number) => void;
    onDeleteSet: (exerciseId: number, setId: number) => void;
    onToggleComplete: (exerciseId: number, setId: number) => void;
    completedSets: number[];
    onReplaceExercise?: (exerciseId: number) => void; // Add this prop
    onRemoveExercise?: (exerciseId: number) => void; // Add this prop
}

export default function Workout({ 
    open, 
    routine, 
    onUpdateSet, 
    onAddSet, 
    onDeleteSet,
    onToggleComplete,
    completedSets,
    onReplaceExercise,
    onRemoveExercise
}: WorkoutProps) {

    const handleDeleteSet = (exerciseId: number, setId: number) => {
        onDeleteSet(exerciseId, setId);
    }

    return (
        <View style={styles.container}>
            {routine.exercises.map((exercise, index) => (
                <WorkoutInfo
                    key={index}
                    exercise={exercise}
                    onUpdateSet={(setId, field, value) => onUpdateSet(exercise.id, setId, field, value)}
                    onAddSet={() => onAddSet(exercise.id)}
                    onDeleteSet={(exerciseId, setId) => handleDeleteSet(exerciseId, setId)}
                    onToggleComplete={onToggleComplete}
                    completedSets={completedSets}
                    onReplaceExercise={onReplaceExercise}
                    onRemoveExercise={onRemoveExercise}
                />
            ))}
            {
                routine.exercises.length === 0 && (
                    <Text style={{ textAlign: 'center', color: '#888', paddingVertical: 20 }}>
                        No exercises added yet. Tap the button below to add your first exercise.
                    </Text>
                )
            }
            <TouchableOpacity onPress={open} style={styles.addExerciseButton}>
                <Text style={styles.addExerciseButtonText}>+ Add Exercise</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    addExerciseButton: {
        padding: 12,
        backgroundColor: '#ff8787',
        borderRadius: 8,
        alignItems: 'center',
    },
    addExerciseButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    completeButton: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    completeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});