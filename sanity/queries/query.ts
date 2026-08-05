import { defineQuery } from "next-sanity";

const CATEGORY_PROJECTION = `
  _id,
  title,
  slug,
  description
`;

const LATEST_BLOG_QUERY = defineQuery(`
  *[
    _type == "blog" &&
    (!defined($slug) || slug.current != $slug)
  ]
  | order(publishedAt desc)[0...5] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    readingTime,
    viewCount,
    description,
    blogcategories[]->{
      ${CATEGORY_PROJECTION}
    }
  }
`);

const OTHERS_BLOG_QUERY = defineQuery(`
  *[
    _type == "blog" &&
    defined(slug.current) &&
    slug.current != $slug
  ]
  | order(publishedAt desc)[0...$quantity] {
    _id,
    title,
    slug,
    description,
    publishedAt,
    readingTime,
    mainImage,
    viewCount,
    blogcategories[]->{
      ${CATEGORY_PROJECTION}
    }
  }
`);

const GET_ALL_BLOG = defineQuery(`
  *[_type == "blog"]
  | order(publishedAt desc)[0...$quantity] {
    _id,
    title,
    slug,
    body,
    description,
    publishedAt,
    readingTime,
    mainImage,
    viewCount,
    blogcategories[]->{
      ${CATEGORY_PROJECTION}
    }
  }
`);

const GET_ALL_BLOGS = defineQuery(`
  *[_type == "blog"]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    body,
    description,
    publishedAt,
    readingTime,
    mainImage,
    viewCount,
    featured,
    isLatest,
    blogcategories[]->{
      ${CATEGORY_PROJECTION}
    }
  }
`);

const SINGLE_BLOG_QUERY = defineQuery(`
  *[
    _type == "blog" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    slug,
    publishedAt,
    readingTime,
    description,
    body,
    mainImage,
    viewCount,
    featured,
    blogcategories[]->{
      ${CATEGORY_PROJECTION}
    }
  }
`);

const BLOG_CATEGORIES = defineQuery(`
  *[
    _type == "blogcategory" &&
    defined(slug.current)
  ]
  | order(title asc) {
    _id,
    title,
    slug,
    description,
    "articleCount": count(
      *[
        _type == "blog" &&
        references(^._id) &&
        defined(slug.current)
      ]
    )
  }
`);

const GET_ALL_PUBLISHED_BLOGS = defineQuery(`
  *[
    _type == "blog" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current)
  ] {
    slug
  }
`);

const MOST_VIEWED_BLOGS_QUERY = defineQuery(`
  *[
    _type == "blog" &&
    defined(viewCount)
  ]
  | order(viewCount desc)[0...3] {
    _id,
    title,
    slug,
    viewCount,
    publishedAt,
    mainImage,
    readingTime,
    description,
    blogcategories[]->{
      ${CATEGORY_PROJECTION}
    }
  }
`);

export {
  BLOG_CATEGORIES,
  GET_ALL_BLOG,
  GET_ALL_BLOGS,
  GET_ALL_PUBLISHED_BLOGS,
  LATEST_BLOG_QUERY,
  MOST_VIEWED_BLOGS_QUERY,
  OTHERS_BLOG_QUERY,
  SINGLE_BLOG_QUERY,
};