import { ReactNode, useState } from "react";

import { MAX_LENGTH_DESCRIPTION } from "@wc/constants/table.constants";

export default function Description({ children }: { children: ReactNode }) {
  const description = children?.toString();

  const [isExpanded, setIsExpanded] = useState(false);

  if (!children || !description)
    return <span className="italic text-default-400">Sin descripción</span>;

  const TruncatedDescription = () => {
    if (description.length <= MAX_LENGTH_DESCRIPTION) return description;

    return `${description.substring(0, MAX_LENGTH_DESCRIPTION)}...`;
  };

  return (
    <>
      {isExpanded ? description : <TruncatedDescription />}
      {description.length > MAX_LENGTH_DESCRIPTION && (
        <span
          className="ml-2 cursor-pointer text-primary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Ver menos" : "Ver más"}
        </span>
      )}
    </>
  );
}
