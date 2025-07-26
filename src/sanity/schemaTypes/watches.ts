import type { Rule } from 'sanity';

export default {
  name: 'Smart Watches',
  title: 'Smart Watches',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string',  validation: (Rule: Rule) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' },validation: (Rule: Rule) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'image', title: 'Cover_Image', type: 'image', options: { hotspot: true },validation: (Rule: Rule) => Rule.required() },
    { name: 'detailImage_1', title: 'Cover_Image', type: 'image', options: { hotspot: true } },
    { name: 'detailImage_2', title: 'Cover_Image', type: 'image', options: { hotspot: true } },
    { name: 'category', title: 'Category', type: 'string',validation: (Rule: Rule) => Rule.required() },
  ]
}
