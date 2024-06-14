import { useCallback, useEffect, useState } from "react";

import ActionMenu from "../action-menu";
import PopoverButton from "../popover-button";

interface LinkActionProps {
  href: string;
  disabled?: boolean;
}

export function LinkAction(props: LinkActionProps) {
  const { href, disabled = false } = props;

  const [status, setStatus] = useState<"success" | "error">();

  const onAddToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, []);

  /** BUG: After closed popover children components not re-render. */
  /** useEffect to reset 'status' state component after 3 seconds. */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus(undefined);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [status]);

  return (
    <ActionMenu
      icon="link"
      title="Ver o copiar enlace de la venta"
      disabled={disabled}
    >
      <div className="flex items-center gap-4">
        <PopoverButton
          icon="up-right-from-square"
          onClick={() => window.open(href, "_blank")}
        >
          Ir a enlace de pago
        </PopoverButton>
        <PopoverButton
          icon={status === "success" ? "check" : "clipboard"}
          color={status === "success" ? "success" : "primary"}
          onClick={() => onAddToClipboard(href)}
        >
          {status === "success" ? "¡Copiado!" : "Copiar enlace"}
        </PopoverButton>
      </div>
    </ActionMenu>
  );
}
