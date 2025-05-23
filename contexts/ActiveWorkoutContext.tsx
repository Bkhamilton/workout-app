// app/contexts/BetContext/BetContext.tsx
import { ActiveRoutine, Exercise } from '@/utils/types';
import React, { createContext, ReactNode, useState } from 'react';

interface ActiveWorkoutContextValue {
    // Define the properties and methods you want to expose in the context
    // For example:
    routine: ActiveRoutine;
    setRoutine: React.Dispatch<React.SetStateAction<ActiveRoutine>>;
    updateRoutine: (routine: ActiveRoutine) => void;
    addToRoutine: (exercise: Exercise) => void;
    isActiveWorkout: boolean;
    setIsActiveWorkout: React.Dispatch<React.SetStateAction<boolean>>;
    startTime: number | null;
    startWorkout: () => void;
    // activeWorkout: Workout | null;
    // setActiveWorkout: (workout: Workout) => void;
    // addExerciseToWorkout: (exercise: Exercise) => void;
    // removeExerciseFromWorkout: (exerciseId: number) => void;
}

export const ActiveWorkoutContext = createContext<ActiveWorkoutContextValue>({
    routine: {
        id: 0,
        title: 'Empty Workout',
        exercises: [
            {
                id: 0,
                title: 'Empty Exercise',
                equipment: 'None',
                muscleGroupId: 0,
                muscleGroup: 'None',
                sets: [
                    {
                        id: 0,
                        reps: 0,
                        weight: 0,
                        restTime: 0,
                        set_order: 0,
                    },
                ],
            },
        ],
    } as ActiveRoutine,
    setRoutine: () => {},
    updateRoutine: () => {},
    addToRoutine: () => {},
    isActiveWorkout: false,
    setIsActiveWorkout: () => {},
    startTime: null,
    startWorkout: () => {},
    // activeWorkout: null,
    // setActiveWorkout: () => {},
    // addExerciseToWorkout: () => {},
    // removeExerciseFromWorkout: () => {},
});

interface ActiveWorkoutContextValueProviderProps {
    children: ReactNode;
}

export const ActiveWorkoutContextProvider = ({ children }: ActiveWorkoutContextValueProviderProps) => {

    const [startTime, setStartTime] = useState<number | null>(null);

    const [routine, setRoutine] = useState<ActiveRoutine>({
        id: 0,
        title: 'Empty Workout',
        exercises: [
            {
                id: 0,
                title: 'Empty Exercise',
                equipment: 'None',
                muscleGroupId: 0,
                muscleGroup: 'None',
                sets: [
                    {
                        id: 0,
                        reps: 0,
                        weight: 0,
                        restTime: 0,
                        set_order: 1,
                    },
                ],
            },
        ],
    } as ActiveRoutine);

    const [isActiveWorkout, setIsActiveWorkout] = useState(false);

    const updateRoutine = (updatedRoutine: ActiveRoutine) => {
        setRoutine(updatedRoutine);
    };

    const addToRoutine = (exercise: Exercise) => {
        const exerciseWithSets = {
            ...exercise,
            sets: [
                {
                    id: Date.now(), // Use a unique ID for the set
                    reps: 10, // Default reps
                    weight: 0, // Default weight
                    restTime: 60, // Default rest time in seconds
                    set_order: 1, // Set the order to 1
                },
            ],
        };
    
        setRoutine((prevRoutine) => ({
            ...prevRoutine,
            exercises: [...prevRoutine.exercises, exerciseWithSets],
        }));
    };

    const startWorkout = () => {
        setIsActiveWorkout(true);
        setStartTime(Date.now());
    };

    const value = {
        routine,
        setRoutine,
        updateRoutine,
        addToRoutine,
        isActiveWorkout,
        setIsActiveWorkout,
        startTime,
        startWorkout,
        // activeWorkout,
        // setActiveWorkout,
        // addExerciseToWorkout,
        // removeExerciseFromWorkout,
    };

    return (
        <ActiveWorkoutContext.Provider value={value}>
            {children}
        </ActiveWorkoutContext.Provider>
    );
};