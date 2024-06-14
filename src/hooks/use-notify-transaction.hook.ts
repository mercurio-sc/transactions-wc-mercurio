import { useState } from "react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useDisclosure } from "@nextui-org/react";

import axiosInstance from "@wc/api/interceptor";
import { NotifyTransactionRequestDto } from "@wc/api/types/notify-transaction.request.dto";
import { NotifyTransactionErrorResponse } from "@wc/api/types/notify-transaction.response.dto";
import { ERROR_MESSAGES } from "@wc/constants/exceptions.constants";

export default function useNotifyTransaction() {
  const modalDisclosure = useDisclosure();

  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
    variant: "success" | "error";
  }>();

  const notifyTransaction = useMutation<
    void,
    AxiosError<NotifyTransactionErrorResponse>,
    NotifyTransactionRequestDto
  >(
    (request) =>
      axiosInstance({
        method: "POST",
        url: `/${request.utid}/notify`,
        params: {
          method: request.notificationMethod,
        },
      }),
    {
      onSuccess: () => {
        setModalContent({
          title: "Notificación enviada",
          message: "Se ha enviado la notificación al cliente",
          variant: "success",
        });
        modalDisclosure.onOpen();
      },
      onError: (error) => {
        setModalContent({
          title: "Error",
          message:
            ERROR_MESSAGES[error.response?.data.exception.name as string] ||
            "Hubo un error al enviar la notificación",
          variant: "error",
        });
        modalDisclosure.onOpen();
      },
    }
  );

  return { notifyTransaction, modalDisclosure, modalContent };
}
