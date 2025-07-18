import { ActiveRoutine } from '@/constants/types';
import { ActiveWorkoutContext } from '@/contexts/ActiveWorkoutContext';
import React, { useContext } from 'react';
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from '../../Themed';

interface WorkoutOptionsProps {
    visible: boolean;
    close: () => void;
    routine: ActiveRoutine;
}

export default function WorkoutOptionsModal({ visible, close, routine }: WorkoutOptionsProps) {

    const { resetRoutine, clearRoutine } = useContext(ActiveWorkoutContext);

    const handleResetRoutine = () => {
        resetRoutine();
        close();
    };

    const handleClearRoutine = () => {
        clearRoutine();
        close();
    };

    return (
        <Modal
            visible = {visible}
            transparent = {true}
            animationType = 'fade'
        >
            <TouchableWithoutFeedback onPress={close}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalPopup}>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
                            <View style={{ paddingHorizontal: 6 }}>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>{routine.title}</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={handleResetRoutine}
                            >
                                <View style={styles.optionButtons}>
                                    <Text style={styles.optionText}>Reset Routine</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={handleClearRoutine}
                            >
                                <View style={styles.optionButtons}>
                                    <Text style={styles.optionText}>Clear Routine</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalPopup:{
        width: '70%',
        bottom: '10%',
        elevation: 30,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 8,
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionButtons: {
        alignItems: 'center',
        paddingVertical: 2,
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500',
    } 
});
