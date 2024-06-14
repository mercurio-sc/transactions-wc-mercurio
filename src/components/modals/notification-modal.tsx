import { useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/modal";
import { Button, tv } from "@nextui-org/react";

import useMainContext from "@wc/hooks/use-main-context.hook";

const notificationModal = tv({
  base: "flex h-14 w-14 flex-col items-center justify-center rounded-full text-2xl",
  variants: {
    color: {
      success: "bg-success-50 text-success",
      error: "bg-danger-50 text-danger",
    },
  },
});

export default function NotificationModal() {
  const { notificationMutation } = useMainContext();
  const { modalDisclosure, modalContent } = notificationMutation;

  const icon = useMemo(() => {
    switch (modalContent?.variant) {
      case "success":
        return "fa-check";
      case "error":
        return "fa-exclamation";
      default:
        return "fa-info";
    }
  }, [modalContent?.variant]);

  return (
    <Modal
      isOpen={modalDisclosure.isOpen}
      onOpenChange={modalDisclosure.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <span
                className={notificationModal({ color: modalContent?.variant })}
              >
                <i className={`fa-regular ${icon}`}></i>
              </span>
              <h3 className="text-lg font-bold">{modalContent?.title}</h3>
              <p className="text-center">{modalContent?.message}</p>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button radius="full" color="secondary" onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
