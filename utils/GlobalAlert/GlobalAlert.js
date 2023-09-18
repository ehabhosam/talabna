// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Alert } from "react-native";

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

  // <Alert /> is your custom RN alert, e.g. a bottom-sheet modal.
  return alertProps ? <Alert {...alertProps} /> : null;
});