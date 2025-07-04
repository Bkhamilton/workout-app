import { ClearView, Text, View } from '@/components/Themed';
import { History } from '@/constants/types';
import { useThemeColor } from '@/hooks/useThemeColor';
import { calculateTotalWeight } from '@/utils/workoutCalculations';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface HistoryCardProps {
    history: History;
    open: (history: any) => void;
}

export default function HistoryCard({ history, open }: HistoryCardProps) {

    const cardBackground = useThemeColor({}, 'grayBackground');
    const cardBorder = useThemeColor({}, 'grayBorder');

    function formatTime(timeStr: string | undefined) {
        if (!timeStr) return '0s'; // Handle undefined case
        // Accepts "HH:MM:SS" or "DD:HH:MM:SS"
        const parts = timeStr.split(':').map(Number);
        let days = 0, hours = 0, minutes = 0, seconds = 0;

        if (parts.length === 3) {
            // HH:MM:SS
            [hours, minutes, seconds] = parts;
        } else if (parts.length === 4) {
            // DD:HH:MM:SS
            [days, hours, minutes, seconds] = parts;
        }

        let result = '';
        if (days > 0) result += `${days}d `;
        if (hours > 0 || days > 0) result += `${hours}h `;
        if (minutes > 0 || hours > 0 || days > 0) result += `${minutes}m `;
        // Only include seconds if days === 0
        if (days === 0) result += `${seconds}s`;

        return result.trim();
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }

    const totalWeight = calculateTotalWeight(history);

    return (
        <TouchableOpacity onPress={() => open(history)}>
            <View style={[styles.cardContainer, { backgroundColor: cardBackground, borderColor: cardBorder }]}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{formatDate(history.startTime)}</Text>
                </View>
                
                <ClearView style={styles.contentContainer}>
                    <Text style={styles.routineTitle}>{history.routine.title}</Text>
                    
                    <ClearView style={styles.statsContainer}>
                        <ClearView style={styles.statItem}>
                            <MaterialCommunityIcons 
                                name="clock-outline" 
                                size={16} 
                                color="#ff8787" 
                                style={styles.icon}
                            />
                            <Text style={styles.statText}>{formatTime(history.endTime)}</Text>
                        </ClearView>
                        
                        <ClearView style={styles.statItem}>
                            <MaterialCommunityIcons 
                                name="weight-pound" 
                                size={16} 
                                color="#ff8787" 
                                style={styles.icon}
                            />
                            <Text style={styles.statText}>{totalWeight} lbs</Text>
                        </ClearView>
                    </ClearView>
                </ClearView>
                
                <MaterialCommunityIcons 
                    name="chevron-right" 
                    size={20} 
                    color="#ccc" 
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    dateContainer: {
        backgroundColor: '#ff8787',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 8,
        marginRight: 12,
        minWidth: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12,
    },
    contentContainer: {
        flex: 1,
    },
    routineTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    statsContainer: {
        flexDirection: 'row',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    icon: {
        marginRight: 4,
    },
    statText: {
        fontSize: 14,
        color: '#666',
    },
});