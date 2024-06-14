import { Input } from "@nextui-org/react";

import { FILTERS } from "@wc/constants/table.constants";

export default function SearchInput() {
  return (
    <Input
      className="w-1/5"
      classNames={{
        inputWrapper: "bg-white",
      }}
      variant="faded"
      startContent={<i className="fa-regular fa-search mr-2"></i>}
      size="lg"
      endContent={
        <div className="flex items-center border-l border-default-200">
          <select className="cursor-pointer border-0 bg-transparent px-2 text-small font-bold text-primary outline-none">
            {FILTERS.map((filter) => (
              <option value={filter.key} key={filter.key}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      }
      placeholder="Buscar"
    />
  );
}
