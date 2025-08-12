import { clerkClient } from "@clerk/nextjs/server";

export async function CountUsers() {
  try {
    const client = await clerkClient();
    const users = await client.users.getUserList();
    return users.data.length; // Use users.data.length instead of users.length
  } catch (error) {
    console.error("Error fetching users:", error);
    return 0; // Fallback value
  }
}