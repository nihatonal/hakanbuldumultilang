import { type SchemaTypeDefinition } from "sanity";
import { blockContentType } from "./blockContentType";
import { blogCategoryType } from "./blogCategoryType";
import { blogType } from "./blogType";
import { authorType } from "./authorType";
import { faqType } from "./faqType";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogCategoryType, blogType, blockContentType, authorType, faqType],
};
