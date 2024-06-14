import { forwardRef } from "react";
import { tv } from "@nextui-org/react";

const popoverButton = tv({
  base: "mb-2 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-primary-50 text-lg transition-colors",
  variants: {
    color: {
      primary:
        "bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white",
      success:
        "bg-success-50 text-success group-hover:bg-success group-hover:text-white",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

const PopoverButton = forwardRef<
  HTMLAnchorElement,
  {
    icon: string;
    color?: "primary" | "success";
    isLoading?: boolean;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ icon, color, isLoading = false, ...props }, ref) => (
  <a
    {...props}
    className={`group flex cursor-pointer flex-col items-center ${
      !isLoading ? "cursor-pointer" : "cursor-progress opacity-50"
    }`}
    onClick={(e) => {
      e.preventDefault();
      if (isLoading) return;
      props.onClick?.(e);
    }}
    ref={ref}
  >
    <span className={popoverButton({ color })}>
      {!isLoading ? (
        <i className={`fa-regular fa-${icon}`}></i>
      ) : (
        <i className="fa-regular fa-spinner-third animate-spin"></i>
      )}
    </span>
    <span>{props.children}</span>
  </a>
));

PopoverButton.displayName = "PopoverButton";

export default PopoverButton;
