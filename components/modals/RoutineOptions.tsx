import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { Routine } from '@/utils/types';
import { Text, View } from '../Themed';

interface RoutineOptionsProps {
    visible: boolean;
    close: () => void;
    routine: Routine;
    onSelect: (option: string) => void;
}

export default function RoutineOptions({ visible, close, routine, onSelect }: RoutineOptionsProps) {

    const handleSelect = (option: string) => {
        onSelect(option);
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
                                onPress={() => handleSelect('start')}
                            >
                                <View style={styles.optionButtons}>
                                    <Text style={styles.optionText}>Start Workout</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => handleSelect('edit')}
                            >
                                <View style={styles.optionButtons}>
                                    <Text style={styles.optionText}>Edit Routine</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => handleSelect('delete')}
                            >
                                <View style={styles.optionButtons}>
                                    <Text style={styles.optionText}>Delete Routine</Text>
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
