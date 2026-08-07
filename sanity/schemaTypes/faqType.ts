import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import { defineField, defineType } from "sanity";

export const faqType = defineType({
  name: "faq",
  title: "Sık Sorulan Sorular",
  type: "document",
  icon: HelpCircleIcon,

  fields: [
    defineField({
      name: "question",
      title: "Soru",
      type: "string",
      validation: (Rule) => Rule.required().max(180),
    }),

    defineField({
      name: "answer",
      title: "Cevap",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().max(700),
    }),

    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      description: "Küçük sayı önce gösterilir.",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "isActive",
      title: "Aktif",
      type: "boolean",
      initialValue: true,
      description: "Kapalı olan sorular ana sayfada gösterilmez.",
    }),
  ],

  orderings: [
    {
      title: "Sıralamaya göre",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "question",
      order: "order",
      isActive: "isActive",
    },

    prepare({ title, order, isActive }) {
      return {
        title,
        subtitle: `${order ?? "-"} · ${
          isActive ? "Aktif" : "Pasif"
        }`,
      };
    },
  },
});