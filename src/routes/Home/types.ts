export type Category = "query" | "mutation" | "scaling";

export interface Example {
  title: string;
  description: string;
  tag: string;
  to: string;
  category: Category;
  subsection?: string;
}
