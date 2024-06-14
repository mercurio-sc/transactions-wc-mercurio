import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";

import ActionButton from "./action-button";

interface ActionMenuProps {
  icon: string;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}
export default function ActionMenu(props: ActionMenuProps) {
  const { icon, title, disabled, children } = props;

  const Button = <ActionButton icon={icon} title={title} disabled={disabled} />;

  return disabled ? (
    Button
  ) : (
    <Popover placement="top" radius="sm">
      <PopoverTrigger>{Button}</PopoverTrigger>
      <PopoverContent className="p-4">{children}</PopoverContent>
    </Popover>
  );
}
