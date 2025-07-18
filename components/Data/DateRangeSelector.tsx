import DatePickerModal from '@/components/modals/DatePickerModal';
import { Text, View } from '@/components/Themed';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    dateRange: { start: Date; end: Date };
    onDateRangeChange: (start: Date, end: Date) => void;
    onGo?: () => void;
}

const DateRangeSelector: React.FC<Props> = ({ dateRange, onDateRangeChange, onGo }) => {
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const backgroundColor = useThemeColor({}, 'grayBackground');
    const borderColor = useThemeColor({}, 'grayBorder');

    const handleStartDateChange = (date: Date) => {
        onDateRangeChange(date, dateRange.end);
    };

    const handleEndDateChange = (date: Date) => {
        onDateRangeChange(dateRange.start, date);
    };

    const handleGoPress = () => {
        // This will trigger the parent component to update the data
        // The actual implementation depends on how you want to handle this
        if (onGo) {
            onGo();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.dateButton, { backgroundColor: backgroundColor }]}
                onPress={() => setShowStartPicker(true)}
            >
                <Text style={styles.dateText}>
                    {dateRange.start.toLocaleDateString()}
                </Text>
            </TouchableOpacity>
            
            <MaterialCommunityIcons 
                name="arrow-right" 
                size={20} 
                color="#666" 
                style={styles.arrow}
            />
            
            <TouchableOpacity 
                style={[styles.dateButton, { backgroundColor: backgroundColor }]}
                onPress={() => setShowEndPicker(true)}
            >
                <Text style={styles.dateText}>
                    {dateRange.end.toLocaleDateString()}
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.goButton} onPress={handleGoPress}>
                <Text style={styles.goButtonText}>Go</Text>
            </TouchableOpacity>

            {/* Date Pickers */}
            <DatePickerModal
                visible={showStartPicker}
                onClose={() => setShowStartPicker(false)}
                initialDate={dateRange.start}
                onDateSelected={handleStartDateChange}
                mode="start"
            />
            
            <DatePickerModal
                visible={showEndPicker}
                onClose={() => setShowEndPicker(false)}
                initialDate={dateRange.end}
                onDateSelected={handleEndDateChange}
                mode="end"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    dateButton: {
        flex: 1,
        backgroundColor: '#f1f3f5',
        borderRadius: 8,
        padding: 12,
    },
    dateText: {
        textAlign: 'center',
    },
    arrow: {
        marginHorizontal: 8,
    },
    goButton: {
        backgroundColor: '#ff8787',
        borderRadius: 8,
        padding: 12,
        marginLeft: 8,
    },
    goButtonText: {
        color: 'white',
        fontWeight: '600',
        minWidth: 40,
        textAlign: 'center',
    },
});

export default DateRangeSelector;