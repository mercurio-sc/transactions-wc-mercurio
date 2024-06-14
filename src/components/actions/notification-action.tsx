import { NotificationMethods } from "@wc/api/types/get-transactions.response.dto";
import useMainContext from "@wc/hooks/use-main-context.hook";
import ActionMenu from "../action-menu";
import PopoverButton from "../popover-button";

interface NotificationActionProps {
  utid: string;
  methods: NotificationMethods[];
  disabled?: boolean;
}

export default function NotificationAction(props: NotificationActionProps) {
  const { utid, methods, disabled = false } = props;

  const { notificationMutation } = useMainContext();
  const { notifyTransaction } = notificationMutation;

  return (
    <ActionMenu
      icon="bell-on"
      title="Enviar enlace al cliente"
      disabled={disabled}
    >
      {methods.map((method) => {
        switch (method) {
          case "email":
            return (
              <PopoverButton
                key="email-method"
                icon="envelope"
                isLoading={notifyTransaction.isLoading}
                onClick={() =>
                  notifyTransaction.mutate({
                    utid,
                    notificationMethod: "email",
                  })
                }
              >
                Enviar por email
              </PopoverButton>
            );
          case "sms":
            return (
              <PopoverButton
                key="sms-method"
                icon="message-lines"
                isLoading={notifyTransaction.isLoading}
                onClick={() =>
                  notifyTransaction.mutate({
                    utid,
                    notificationMethod: "sms",
                  })
                }
              >
                Enviar por mensaje de texto
              </PopoverButton>
            );
          case "whatsapp":
            return (
              <PopoverButton
                key="whatsapp-method"
                icon="brands fa-whatsapp"
                isLoading={notifyTransaction.isLoading}
                onClick={() =>
                  notifyTransaction.mutate({
                    utid,
                    notificationMethod: "whatsapp",
                  })
                }
              >
                Enviar por WhatsApp
              </PopoverButton>
            );
          default:
            return null;
        }
      })}
    </ActionMenu>
  );
}
