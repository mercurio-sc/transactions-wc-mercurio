import { Button, Tooltip } from "@nextui-org/react";

import { FILTERS } from "@wc/constants/table.constants";
import useMainContext from "@wc/hooks/use-main-context.hook";

export default function Filters() {
  const { filters } = useMainContext();
  const { filterSelected, onUpdateFilterSelected } = filters;

  return (
    <div className="flex w-full items-center gap-2">
      <div className="font-bold">Filtrar por:</div>
      {FILTERS.map((filter, key) => {
        const isSelected = filter.key === filterSelected;
        return (
          <Tooltip
            key={`${filter.key}_${key}_tooltip`}
            color="secondary"
            placement="top-start"
            content={
              <div>
                <span className="mr-2">
                  <i className="fa-regular fa-circle-exclamation"></i>
                </span>
                <span>{filter.description}</span>
              </div>
            }
            shouldFlip={false}
            showArrow
          >
            <Button
              variant={isSelected ? "solid" : "ghost"}
              color="secondary"
              size="sm"
              key={`${filter.key}_${key}`}
              onClick={() => onUpdateFilterSelected(filter.key)}
            >
              {filter.label}
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
}
