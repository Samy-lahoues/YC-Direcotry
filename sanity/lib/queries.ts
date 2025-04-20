import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && (!defined($search) || title match $search || category match $search || author->name match $search)] | order(_createdAt desc) {
    title,
    _id,
    author -> {
      name,
      username,
      image,
      _id,
      bio
    },
    image,
    description,
    _createdAt,
    views,
    slug,
    category
  }
`);

export const STARTUP_BY_ID_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    _id,
    author -> {
      name,
      username,
      image,
      _id,
      bio
    },
    pitch,
    category,
    image,
    views,
    description,
    title,
    slug,
    _createdAt
  }
`);
export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id, views
}`);
export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type == "author" && id == $id][0]{
  _id,
  username,
  name,
  image,
  email,
  bio
}`);
export const AUTHOR_BY_ID_QUERY =
  defineQuery(`*[_type == "author" && _id == $id][0]{
_id,
username,
name,
image,
email,
bio
}`);
