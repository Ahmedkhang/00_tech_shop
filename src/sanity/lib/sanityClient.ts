// lib/sanityClient.ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'as8dyov2',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false, // set to false for fresh data
  token: process.env.SANITY_API_TOKEN, // required for server-side queries
})
