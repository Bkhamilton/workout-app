import ExerciseOptionsModal from '@/components/modals/Workout/ExerciseOptionsModal';
import { ClearView, Text, View } from '@/components/Themed';
import { ActiveExercise } from '@/constants/types';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import SetCard from './SetCard';

interface WorkoutInfoProps {
    exercise: ActiveExercise;
    exerciseIndex: number;
    onUpdateSet: (setId: number, field: 'weight' | 'reps', value: string) => void;
    onAddSet: () => void;
    onToggleComplete?: (setId: number) => void;
    onDeleteSet: (setId: number) => void;
    completedSets?: number[];
    onReplaceExercise?: () => void;
    onRemoveExercise?: () => void;
}

export default function WorkoutInfo({ 
    exercise, 
    exerciseIndex,
    onUpdateSet, 
    onAddSet,
    onToggleComplete,
    onDeleteSet,
    completedSets,
    onReplaceExercise,
    onRemoveExercise
}: WorkoutInfoProps) {
    const [editingSet, setEditingSet] = useState<number | null>(null);
    const [optionsModalVisible, setOptionsModalVisible] = useState(false); // Add this state

    const cardBackground = useThemeColor({}, 'grayBackground');
    const cardBorder = useThemeColor({}, 'grayBorder');

    const handleOptionSelect = (option: 'replace' | 'remove') => {
        setOptionsModalVisible(false);
        if (option === 'replace' && onReplaceExercise) {
            onReplaceExercise();
        } else if (option === 'remove' && onRemoveExercise) {
            onRemoveExercise();
        }
    };

    return (
        <View style={[styles.exerciseContainer, { backgroundColor: cardBackground, borderColor: cardBorder }]}>
            <ExerciseOptionsModal
                visible={optionsModalVisible}
                onClose={() => setOptionsModalVisible(false)}
                onSelectOption={handleOptionSelect}
            />
            {/* Exercise Title and Options Button */}
            <ClearView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <TouchableOpacity 
                    onPress={() => setOptionsModalVisible(true)}
                    style={{ marginBottom: 12, }}
                >
                    <SimpleLineIcons name="options" size={20} color="#ff8787" />
                </TouchableOpacity>
            </ClearView>
            
            {/* Header Row */}
            <View style={styles.headerRow}>
                <Text style={styles.headerText}>Set</Text>
                <Text style={styles.headerText}>Weight</Text>
                <Text style={styles.headerText}>Reps</Text>
                <View style={{ width: 80 }}></View>
            </View>
            
            {/* Sets List */}
            {exercise.sets.map((set, index) => (
                <SetCard 
                    key={index} 
                    set={set}
                    index={index} 
                    onUpdateSet={onUpdateSet} 
                    editingSet={editingSet} 
                    setEditingSet={setEditingSet}
                    onToggleComplete={onToggleComplete ? (setId) => onToggleComplete(setId) : undefined}
                    onDeleteSet={(setId) => onDeleteSet(setId)}
                    isCompleted={completedSets ? completedSets.includes(set.id) : false}
                />
            ))}
            
            {/* Add Set Button */}
            <TouchableOpacity 
                onPress={onAddSet}
                style={styles.addSetButton}
            >
                <Text style={styles.addSetButtonText}>+ Add Set</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    exerciseContainer: {
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
    },
    exerciseTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 8,
        paddingHorizontal: 0,
    },
    headerText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        flex: 1,
        textAlign: 'center',
    },
    addSetButton: {
        marginTop: 10,
        paddingVertical: 8,
        backgroundColor: '#ff8787',
        borderRadius: 5,
        alignItems: 'center',
    },
    addSetButtonText: {
        color: 'white',
        fontWeight: '600',
    },
});