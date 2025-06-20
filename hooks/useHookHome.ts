import { SplitContext } from '@/contexts/SplitContext';
import { ActiveRoutine } from '@/utils/types';
import { useContext, useState } from 'react';

const useHookHome = () => {

    const { activeSplit } = useContext(SplitContext);

    const [addRoutineModal, setAddRoutineModal] = useState(false);
    const [settingsModal, setSettingsModal] = useState(false);
    const [routineModal, setRoutineModal] = useState(false);
    const [routineOptionsModal, setRoutineOptionsModal] = useState(false);
    const [helpSupportModal, setHelpSupportModal] = useState(false);
    const [privacySettingsModal, setPrivacySettingsModal] = useState(false);
    const [notificationModal, setNotificationModal] = useState(false);
    const [appearanceSettingsModal, setAppearanceSettingsModal] = useState(false);

    const [routine, setRoutine] = useState<ActiveRoutine>({
        id: 0,
        title: 'Test Routine',
        exercises: []
    });
    const [curDay, setDay] = useState(activeSplit ? activeSplit.routines[0] : {
        day: 1,
        routine: 'Push',
    });

    const openAddRoutineModal = () => setAddRoutineModal(true);
    const closeAddRoutineModal = () => setAddRoutineModal(false);

    const openSettingsModal = () => setSettingsModal(true);
    const closeSettingsModal = () => setSettingsModal(false);

    const openRoutineModal = (routine : ActiveRoutine) => {
        setRoutine(routine);
        setRoutineModal(true);
    }
    const closeRoutineModal = () => setRoutineModal(false);

    const openRoutineOptionsModal = (routine: ActiveRoutine) => {
        setRoutine(routine);
        setRoutineOptionsModal(true);
    }
    const closeRoutineOptionsModal = () => setRoutineOptionsModal(false);

    const openHelpSupportModal = () => setHelpSupportModal(true);
    const closeHelpSupportModal = () => setHelpSupportModal(false);

    const openPrivacySettingsModal = () => setPrivacySettingsModal(true);
    const closePrivacySettingsModal = () => setPrivacySettingsModal(false);

    const openNotificationModal = () => setNotificationModal(true);
    const closeNotificationModal = () => setNotificationModal(false);

    const openAppearanceSettingsModal = () => setAppearanceSettingsModal(true);
    const closeAppearanceSettingsModal = () => setAppearanceSettingsModal(false);

    return {
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
    };
};

export default useHookHome;