import { UserIcon } from "@sanity/icons";
import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,

  fields: [
    defineField({
      name: "name",
      title: "Ad Soyad",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Unvan",
      type: "string",
      description: "Örneğin: Avukat ve Hukuk Danışmanı",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "photo",
      title: "Fotoğraf",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternatif Metin",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "shortBio",
      title: "Kısa Tanıtım",
      type: "text",
      rows: 5,
      validation: (Rule) =>
        Rule.required()
          .max(500)
          .warning("Tanıtım metni 500 karakteri geçmemelidir."),
    }),

    defineField({
      name: "experienceYears",
      title: "Deneyim Yılı",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "expertise",
      title: "Uzmanlık Alanları",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "quote",
      title: "Kısa Mesaj",
      type: "text",
      rows: 3,
      description:
        "Ana sayfada avukatın yaklaşımını anlatan kısa bir mesaj.",
    }),

    defineField({
      name: "email",
      title: "E-posta",
      type: "string",
    }),

    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),

    defineField({
      name: "isPrimary",
      title: "Ana Yazar",
      type: "boolean",
      initialValue: false,
      description:
        "Ana sayfadaki yazar bölümünde gösterilecek kişi.",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "photo",
    },
  },
});