import type { ReactNode } from "react";

interface DescriptionProps {
  children: ReactNode;
}

function Description({ children }: DescriptionProps) {
  return <p>{children}</p>;
}

export default Description;
