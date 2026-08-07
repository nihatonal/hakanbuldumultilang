import {TagIcon} from '@sanity/icons/Tag'
import { defineField, defineType } from "sanity";

export const blogCategoryType = defineType({
  name: "blogcategory",
  title: "Blog Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      title: "Kısa Açıklama",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(180).warning(
          "Kategori açıklaması 180 karakteri geçmemelidir.",
        ),
    }),
  ],
});
