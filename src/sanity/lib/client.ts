import { createClient } from 'next-sanity'

import { sanityClient } from './sanityClient';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN, // Ensure this is a write token
});



export async function countProducts() {
  try {
    const query = `count(*[_type == "product" ])`;
    const totalProducts = await sanityClient.fetch<number>(query);
    return totalProducts;
  } catch (error) {
    console.error("Error fetching product count:", error);
    return 0;
  }
}

export async function countLaptops() {
  try {
    const query = `count(*[_type == "laptops" ])`;
    const totalProducts = await sanityClient.fetch<number>(query);
    return totalProducts;
  } catch (error) {
    console.error("Error fetching product count:", error);
    return 0;
  }
}

export async function countMobiles() {
  try {
    const query = `count(*[_type == "mobiles" ])`;
    const totalProducts = await sanityClient.fetch<number>(query);
    return totalProducts;
  } catch (error) {
    console.error("Error fetching product count:", error);
    return 0;
  }
}
export async function LaptopStocks() {
  try {
    const query = `*[_type == "laptops"]{ stock }`;
    const laptops = await sanityClient.fetch<{ stock: number }[]>(query);
    const totalStock = laptops.reduce((sum, laptop) => sum + (laptop.stock || 0), 0);
    return totalStock;
  } catch (error) {
    console.error("Error fetching laptop stock:", error);
    return 0;
  }
}