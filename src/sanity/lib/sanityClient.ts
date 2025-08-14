// lib/sanityClient.ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'as8dyov2',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false, // set to false for fresh data
  token: process.env.SANITY_API_TOKEN, // required for server-side queries
})
// import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-08-07',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Fetch total sales by date (grouped by month)
export async function getSalesByDate() {
  const query = `
    *[_type == "order"]{
      "date": createdAt,
      totalPrice
    } | order(createdAt asc)
  `;
  const orders = await client.fetch<{ date: string; totalPrice: number }[]>(query);
  // Aggregate by month
  const salesByMonth = orders.reduce((acc, order) => {
    const month = new Date(order.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + order.totalPrice;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(salesByMonth).map(([month, total]) => ({ month, total }));
}

// Fetch order counts by status
export async function getOrdersByStatus() {
  const query = `
    *[_type == "order"]{
      status
    }
  `;
  const orders = await client.fetch<{ status: string }[]>(query);
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
}

// Fetch top products by total revenue
export async function getTopProducts() {
  const query = `
    *[_type == "order"]{
      products[]->{title, price}
    }
  `;
  const orders = await client.fetch<{ products: { title: string; price: number }[] }[]>(query);
  const productRevenue = orders.flatMap(order => order.products).reduce((acc, product) => {
    acc[product.title] = (acc[product.title] || 0) + product.price;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(productRevenue)
    .map(([title, revenue]) => ({ title, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5); // Top 5 products
}
