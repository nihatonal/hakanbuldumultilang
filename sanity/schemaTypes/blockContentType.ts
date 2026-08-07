import {ImageIcon} from '@sanity/icons/Image'
import { defineArrayMember, defineType } from "sanity";

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",

  of: [
    defineArrayMember({
      type: "block",

      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
      ],

      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],

      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
        ],

        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",

            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              {
                title: "Yeni sekmede aç",
                name: "blank",
                type: "boolean",
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),

    defineArrayMember({
      type: "image",
      icon: ImageIcon,

      options: {
        hotspot: true,
      },

      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (Rule) =>
            Rule.required().warning(
              "SEO ve erişilebilirlik için alternatif metin ekleyin."
            ),
        },
      ],
    }),
  ],
});