// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";


// const AppWithProviders = () => (
//   <BottomSheetModalProvider>
//     <App />
//     <GlobalAlert />
//   </BottomSheetModalProvider>
// );

/**
 * Path: src/components/GlobalAlert
 */
import { globalAlertManager } from "./GlobalAlertManager";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import { Alert } from 'react-native';


export const GlobalAlert = memo(() => {
  const [alertProps, setAlertProps] = useState(undefined);

  const handlePresent = useCallback((newProps) => {
    setAlertProps(newProps);
  }, []);

  const handleOpen = useCallback(() => {
    setAlertProps((prev) => (prev ? { ...prev, isOpened: true } : undefined));
  }, []);

  const handleDismiss = useCallback(() => {
    setAlertProps((prev) => (prev ? { ...prev, isOpened: false } : undefined));
  }, []);

  const alertRef = useRef({
    open: handleOpen,
    present: handlePresent,
    dismiss: handleDismiss,
  });

  useEffect(() => {
    globalAlertManager.register(alertRef.current);
  }, []);

  useEffect(() => {
    console.log("alertProps changed", alertProps)
  }, [alertProps])

  // <Alert /> is your custom RN alert, e.g. a bottom-sheet modal.
  // TODO: replace this with custom alert component built with RN BottomSheet
  return alertProps ? <Alert {...alertProps} /> : null;
});

/**
 * Path: src/components/GlobalAlertManager.ts
 */


// custom alert component built with RN BottomSheet
// function Alert({ title, description, actions, isOpened, setIsOpened }) {
//   return (
//     <BottomSheetModal
//       ref={alertRef}
//       snapPoints={["0%", "50%"]}
//       index={0}
//       backgroundComponent={Background}
//       handleComponent={Handle}
//       handleIndicatorStyle={styles.handleIndicator}
//       style={styles.bottomSheetModal}
//       backdropComponent={BackDrop}
//       onDismiss={handleDismiss}
//       onAnimate={handleAnimate}
//     >
//       <View style={styles.contentContainer}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.title}>{title}</Text>
//           <Text style={styles.description}>{description}</Text>
//         </View>
//         <View style={styles.actionsContainer}>{actions}</View>
//       </View>
//     </BottomSheetModal>
//   );
// }

const Alert = ({ title, description, isOpened, setIsOpened, actions }) => {
  const bottomSheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isOpened) {
      setModalVisible(true);
      bottomSheetRef.current.present();
    } else {
      bottomSheetRef.current.dismiss();
    }
  }, [isOpened]);

  const closeModal = () => {
    setModalVisible(false);
    setIsOpened(false);
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={['5%', '80%']}
      backgroundComponent={({ style }) => (
        <TouchableOpacity
          style={[styles.modalBackground, style]}
          activeOpacity={1}
          onPress={closeModal}
        />
      )}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <View style={styles.actionsContainer}>{actions}</View>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});