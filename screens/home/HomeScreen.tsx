import RoutineInfo from '@/components/Home/RoutineInfo';
import SplitComponent from '@/components/Home/SplitComponent';
import AddRoutineModal from '@/components/modals/AddRoutineModal/AddRoutineModal';
import AppearanceSettingsModal from '@/components/modals/ApperanceSettingsModal';
import HelpSupportModal from '@/components/modals/HelpSupportModal';
import NotificationSettingsModal from '@/components/modals/NotificationSettingsModal';
import OptionsModal from '@/components/modals/OptionsModal';
import PrivacySettingsModal from '@/components/modals/PrivacySettingsModal';
import RoutineModal from '@/components/modals/RoutineModal/RoutineModal';
import SettingsModal from '@/components/modals/SettingsModal';
import { ScrollView, View } from '@/components/Themed';
import Title from '@/components/Title';
import { ActiveWorkoutContext } from '@/contexts/ActiveWorkoutContext';
import { HomeContext } from '@/contexts/HomeContext';
import useHomeActions from '@/hooks/useHomeActions';
import useHookHome from '@/hooks/useHookHome';
import useRoutineOptionsHandler from '@/hooks/useRoutineOptionsHandler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
    
    const { 
        addRoutineModal,
        openAddRoutineModal,
        closeAddRoutineModal,
        settingsModal,
        openSettingsModal,
        closeSettingsModal,
        routineModal,
        openRoutineModal,
        closeRoutineModal,
        routineOptionsModal,
        openRoutineOptionsModal,
        closeRoutineOptionsModal,
        helpSupportModal,
        openHelpSupportModal,
        closeHelpSupportModal,
        privacySettingsModal,
        openPrivacySettingsModal,
        closePrivacySettingsModal,
        notificationModal,
        openNotificationModal,
        closeNotificationModal,
        appearanceSettingsModal,
        openAppearanceSettingsModal,
        closeAppearanceSettingsModal,
        routine,
        curDay,
        setDay,
    } = useHookHome();

    const { setRoutineToEdit } = useContext(HomeContext);

    const { isActiveWorkout, setRoutine } = useContext(ActiveWorkoutContext);

    const [favoritesRefreshKey, setFavoritesRefreshKey] = useState(0);

    const refreshFavorites = () => setFavoritesRefreshKey(k => k + 1);

    const router = useRouter();

    const {
        onAdd, 
        onStart, 
        onSelectSetting 
    } = useHomeActions({
        closeAddRoutineModal,
        closeRoutineModal,
        closeSettingsModal,
        openNotificationModal,
        openPrivacySettingsModal,
        openHelpSupportModal,
        openAppearanceSettingsModal,
        setRoutine,
        isActiveWorkout
    });

    const handleOption = useRoutineOptionsHandler({
        routine,
        onStart,
        closeOptionsModal: closeRoutineOptionsModal,
        refreshFavorites,
        setRoutineToEdit,
    });

    return (
        <View style={styles.container}>
            <Title 
                title="Home"
                rightContent={
                    <View style={styles.rightContent}>
                        <TouchableOpacity onPress={() => router.replace('/(tabs)/profile/main')}>
                            <Ionicons name="person" size={20} color="#ff8787" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openSettingsModal}>
                            <Ionicons name="settings" size={20} color="#ff8787" />
                        </TouchableOpacity>
                    </View>                        
                }
            /> 
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}    
            >
                <SplitComponent
                    curDay={curDay} 
                    setDay={setDay} 
                    close={closeRoutineModal}
                    onStart={onStart}
                />
                <RoutineInfo 
                    open={openRoutineModal} 
                    openAddRoutine={openAddRoutineModal} 
                    openRoutineOptions={openRoutineOptionsModal}
                    favoritesRefreshKey={favoritesRefreshKey}
                />
            </ScrollView>
            <AppearanceSettingsModal
                visible={appearanceSettingsModal}
                close={closeAppearanceSettingsModal}
            />
            <NotificationSettingsModal
                visible={notificationModal}
                close={closeNotificationModal}
            />
            <HelpSupportModal
                visible={helpSupportModal}
                close={closeHelpSupportModal}
            />
            <PrivacySettingsModal
                visible={privacySettingsModal}
                close={closePrivacySettingsModal}
            />
            <SettingsModal
                visible={settingsModal}
                close={closeSettingsModal}
                onSelect={onSelectSetting}
            />
            <RoutineModal
                visible={routineModal}
                close={closeRoutineModal}
                start={onStart}
                routine={routine}
                onFavoriteChange={refreshFavorites}
            />
            <AddRoutineModal
                visible={addRoutineModal}
                close={closeAddRoutineModal}
                add={onAdd}
            />          
            <OptionsModal
                visible={routineOptionsModal}
                close={closeRoutineOptionsModal}
                title={routine.title}
                options={[
                    { label: 'Start Workout', value: 'start' },
                    { label: 'Edit Routine', value: 'edit' },
                    { label: 'Favorite Routine', value: 'favorite' },
                    { label: 'Delete Routine', value: 'delete', destructive: true }
                ]}
                onSelect={handleOption}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4, // Add spacing between the icons
    }, 
    scrollView: {
        paddingTop: 10, 
        marginBottom: 83,
        width: '100%',
    } 
});
