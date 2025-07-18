import EditableInfoRow from '@/components/Profile/ProfileInfo/EditableInfoRow';
import { Text, View } from '@/components/Themed';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';

export default function AboutModal({
    visible,
    onClose,
    stats,
    onChange,
}: {
    visible: boolean;
    onClose: () => void;
    stats: any;
    onChange: (field: string, value: string) => void;
}) {
    const [isEditing, setIsEditing] = useState(false);

    const grayText = useThemeColor({}, 'grayText');

    const handleEditToggle = () => setIsEditing(e => !e);

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.title}>About</Text>
                        <TouchableOpacity onPress={handleEditToggle}>
                            <MaterialCommunityIcons name="pencil" size={22} color="#ff8787" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close" size={22} color={grayText} />
                        </TouchableOpacity>
                    </View>
                    <EditableInfoRow
                        label="Goals"
                        value={stats.goals}
                        isEditing={isEditing}
                        onChange={value => onChange('stats.goals', value)}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        borderRadius: 12,
        padding: 24,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        flex: 1,
    },
    closeButton: {
        marginLeft: 12,
    },
});