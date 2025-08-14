import type { Rule } from 'sanity';

const laptopSchema = {
  name: 'laptops',
  title: 'Laptops',
  type: 'document',
  fields: [
     {name: 'id', title: 'ID', type: 'string', validation: (Rule: Rule) => Rule.required() },
   
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: Rule) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule: Rule) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'discountPrice', title: 'Discount Price', type: 'number' },
    { name: 'brand', title: 'Brand', type: 'string' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'rating', title: 'Rating', type: 'number' },
    { name: 'isFeatured', title: 'Featured Product', type: 'boolean' },
    
    { name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true }, validation: (Rule: Rule) => Rule.required() },
    { name: 'detailImage_1', title: 'Detail Image 1', type: 'image', options: { hotspot: true } },
    { name: 'detailImage_2', title: 'Detail Image 2', type: 'image', options: { hotspot: true } },
    { name: 'category', title: 'Category', type: 'string', validation: (Rule: Rule) => Rule.required() },
    { name: 'stock', title: 'Stock', type: 'number', validation: (Rule: Rule) => Rule.required() },
    { name: 'warranty', title: 'Warranty', type: 'string' },
    { name: 'releaseDate', title: 'Release Date', type: 'date' },
    { name: 'availabilityStatus', title: 'Availability Status', type: 'string', options: { list: ['In Stock', 'Out of Stock', 'Preorder'] } }
  ]
}
export default laptopSchema;