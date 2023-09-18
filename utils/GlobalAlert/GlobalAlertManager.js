import { Button } from "react-native";

class GlobalAlertManager {
    //   private alertRef: GlobalAlertRef | undefined;
    //   private retryCount = 0;
    //   private readonly maxRetries = 2;
    //   private dismissReason: "retryButton" | "unknown" | "dismissButton" =
    //     "unknown";   

    alertRef = undefined;
    retryCount = 0;
    maxRetries = 2;
    dismissReason = "unknown";

    constructor() { }

    /**
     * Register the alert globally
     */
    register(ref) {
        // this.logger.info("Registering a global alert");
        this.alertRef = ref;
    }

    setIsOpen(isOpen) {
        if (!this.alertRef) {
            throw new Error("You must first register your alert in the AlertManager");
        }

        if (isOpen) {
            this.alertRef.open();
        } else {
            this.onPressDismiss();
        }
    }

    onPressDismiss() {
        if (!this.alertRef) {
            throw new Error("You must first register your alert in the AlertManager");
        }

        if (this.dismissReason === "dismissButton") {
            // this.logger.info("Dismissing retry alert (reason: dismiss button)");
        } else if (this.dismissReason === "unknown") {
            // this.logger.info("Dismissing retry alert (reason: bottom sheet cb)");
        }

        if (this.dismissReason !== "retryButton") {
            // this.logger.info("Resetting retry count");
            this.retryCount = 0;
        }

        this.alertRef.dismiss();
    }

    onPressRetry(onRetry) {
        if (!this.alertRef) {
            throw new Error("You must first register your alert in the AlertManager");
        }
        this.retryCount += 1;
        // this.logger.info(`Retrying, attempt ${this.retryCount}/${this.maxRetries}`);
        this.alertRef.dismiss();
        onRetry();
    }

    /**
     * Displays a retryable alert.
     */
    alertWithRetry({
        title,
        description = "Sugerimos tentar mais uma vez",
        onRetry,
    }) {
        if (!this.alertRef) {
            throw new Error("You must first register your alert in the AlertManager");
        }

        const canRetry = this.retryCount < this.maxRetries;

        if (!canRetry) {
            // this.logger.info("Retries exhausted");
        }

        this.dismissReason = "unknown";

        this.alertRef.present({
            title,
            description,
            isOpened: true,
            setIsOpened: (isOpen) => {
                this.setIsOpen(isOpen);
            },
            actions: [
                <Button
                    key="dismiss"
                    onPress={() => {
                        this.dismissReason = "dismissButton";
                        this.onPressDismiss();
                    }}
                    variant="secondary"
                >
                    Fechar
                </Button>,

                canRetry ? (
                    <Button
                        key="retry"
                        onPress={() => {
                            this.dismissReason = "retryButton";
                            this.onPressRetry(onRetry);
                        }}
                        variant="primary"
                    >
                        Tentar de novo
                    </Button>
                ) : null,
            ],
        });
    }

    /**
     * Displays a simple alert with a dismiss button.
     */
    alert({
        title,
        description = "Sugerimos tentar mais uma vez",
        dismissTitle = "Fechar",
        onPressDismiss,
        actions: options,
        actionsDirection = "horizontal",
    }) {
        if (!this.alertRef) {
            throw new Error("You must first register your alert in the AlertManager");
        }

        const actions = Array.isArray(options)
            ? options.map((option) => (
                <Button
                    grow
                    key={option.title}
                    onPress={() => {
                        this.alertRef?.dismiss();
                        option.onPress();
                    }}
                    variant={option.variant ?? "secondary"}
                    title={option.title || "Option"}
                >
                    {/* {option.title} */}
                </Button>
            ))
            : [
                <Button
                    grow
                    key="dismiss"
                    onPress={() => {
                        this.alertRef?.dismiss();
                        onPressDismiss?.();
                    }}
                    variant="primary"
                    title={dismissTitle || "Dismiss"}
                >
                    {/* {dismissTitle} */}
                </Button>,
            ];

        this.alertRef.present({
            title,
            description,
            isOpened: true,
            setIsOpened: (isOpen) => {
                if (isOpen) {
                    this.alertRef?.open();
                } else {
                    this.alertRef?.dismiss();
                }
            },
            actions,
            actionsDirection,
        });
    }
}
export const globalAlertManager = new GlobalAlertManager();