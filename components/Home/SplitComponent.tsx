import { Text, View } from '@/components/Themed';
import { RoutineContext } from '@/contexts/RoutineContext';
import { SplitContext } from '@/contexts/SplitContext';
import { ActiveRoutine } from '@/utils/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface SplitComponentProps {
    curDay: { day: number; routine: string };
    setDay: (dayObj: { day: number; routine: string }) => void;
    close: () => void;
    onStart: (routine: ActiveRoutine) => void;
}

export default function SplitComponent({ curDay, setDay, close, onStart }: SplitComponentProps) {
    const { routines } = useContext(RoutineContext);
    const { activeSplit, splits } = useContext(SplitContext);

    const router = useRouter();

    // Ensure activeSplit exists before accessing its properties
    const uniqueDays = activeSplit?.routines
        ? [...new Set(
            activeSplit.routines
                .filter(routine => routine.routine !== "Rest")
                .map(routine => routine.routine)
        )]
        : []; // Fallback to an empty array if activeSplit or routines are undefined

    const handleStartWorkout = (title: string) => {
        const routine = routines?.find(r => r.title === title);
        if (routine) {
            onStart(routine);
            close();
        } else {
            console.error("Routine not found:", title);
        }
    };

    if (!activeSplit || splits.length === 0) {
        return (
            <View style={styles.container}>
                {/* Header Row */}
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Create a Split</Text>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => router.push('/(tabs)/(index)/splits')}
                    >
                        <MaterialCommunityIcons name="pencil" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Single Untitled Pill */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.daysScrollContainer}
                >
                    <TouchableOpacity
                        style={[styles.dayPill, styles.activeDayPill]}
                        // Set as active by default
                        onPress={() => setDay({ day: 1, routine: "Untitled" })}
                    >
                        <Text style={[styles.dayText, styles.activeDayText]}>
                            Untitled
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Start Button */}
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => handleStartWorkout("Untitled")}
                >
                    <Text style={styles.startButtonText}>Start Untitled Workout</Text>
                    <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
                </TouchableOpacity>
            </View>
        );
    }

    const onEditSplit = () => {
        router.push('/(tabs)/(index)/splits');
    }  

    return (
        <View style={styles.container}>
            {/* Header Row */}
            <View style={styles.headerRow}>
                <Text style={styles.headerText}>SPLIT: {activeSplit.name}</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={onEditSplit}
                >
                    <MaterialCommunityIcons name="pencil" size={20} color="#666" />
                </TouchableOpacity>
            </View>

            {/* Horizontal Scrollable Days */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.daysScrollContainer}
            >
                {activeSplit.routines.map((routine) => (
                    <TouchableOpacity
                        key={`${routine.routine}-${routine.day}`}
                        style={[
                            styles.dayPill,
                            routine.day === curDay.day && routine.routine === curDay.routine && styles.activeDayPill,
                            routine.routine === "Rest" && styles.restDayPill,
                            routine.day === curDay.day && routine.routine === curDay.routine && routine.routine === "Rest" && styles.activeRestDayPill
                        ]}
                        onPress={() => setDay({ day: routine.day, routine: routine.routine })}
                    >
                        <Text
                            style={[
                                styles.dayText,
                                routine.day === curDay.day && routine.routine === curDay.routine && styles.activeDayText,
                                routine.routine === "Rest" && styles.restDayText
                            ]}
                        >
                            {routine.routine === "Rest" ? "Rest" : `${routine.routine}`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Only show start button for workout days */}
            {curDay.routine !== "Rest" && (
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => handleStartWorkout(curDay.routine)}
                >
                    <Text style={styles.startButtonText}>Start {curDay.routine} Workout</Text>
                    <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginHorizontal: 16,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
    },
    editButton: {
        padding: 4,
    },
    daysScrollContainer: {
        paddingBottom: 12,
        marginLeft: 8,
    },
    dayPill: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
    },
    activeDayPill: {
        backgroundColor: '#ff8787',
    },
    restDayPill: {
        backgroundColor: 'rgba(240, 240, 240, 0.6)',
    },
    activeRestDayPill: {
        backgroundColor: 'rgba(255, 135, 135, 0.6)',
    },
    dayText: {
        fontSize: 14,
        color: '#555',
    },
    activeDayText: {
        color: 'white',
        fontWeight: '600',
    },
    restDayText: {
        color: 'rgba(85, 85, 85, 0.6)',
    },
    startButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff8787',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginTop: 8,
        marginHorizontal: 16,
    },
    startButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
        marginRight: 8,
    },
});