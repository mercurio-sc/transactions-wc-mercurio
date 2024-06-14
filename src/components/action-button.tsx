import { forwardRef } from "react";
import { tv } from "@nextui-org/react";

// ActionButton variants and styles.
const actionButton = tv({
  base: "cursor-pointer p-2 text-lg text-primary hover:opacity-50",
  variants: {
    disabled: {
      true: "cursor-not-allowed text-default-300",
      false: "",
    },
  },
});

const ActionButton = forwardRef<
  HTMLButtonElement,
  {
    icon: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ icon, ...props }, ref) => (
  <button
    {...props}
    className={actionButton({ disabled: props.disabled })}
    disabled={props.disabled}
    ref={ref}
  >
    <i className={`fa-regular fa-${icon}`}></i>
  </button>
));

ActionButton.displayName = "ActionButton";

export default ActionButton;
