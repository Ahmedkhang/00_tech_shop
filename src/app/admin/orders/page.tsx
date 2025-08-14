export const dynamic = "force-dynamic"; // prevents static rendering
import { client } from '@/sanity/lib/client';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

interface Order {
  _id: string;
  customerName: string;
  email: string;
  products: { title: string; price: number }[]; // Fixed: products is an array
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default async function Orders() {
  const orders = await client.fetch<Order[]>(
    `*[_type == "order"]{ 
      _id,
      customerName,
      email,
      products[]->{title, price},
      totalPrice,
      status,
      createdAt
    } | order(createdAt desc)`
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders Dashboard</h1>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
          </SignInButton>
        </SignedOut>
      </header>
      <main className="p-6">
        <SignedIn>
          <h1 className="text-2xl font-bold mb-4">Orders</h1>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            <table className="w-full border border-[#0F172A]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Customer</th>
                  <th className="p-2 border">Products</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: Order) => (
                  <tr key={order._id}>
                    <td className="p-2 border">{order.customerName}</td>
                    <td className="p-2 border">
                      {order.products.map((p) => p.title).join(', ')}
                    </td>
                    <td className="p-2 border">${order.totalPrice}</td>
                    <td className="p-2 border">{order.status}</td>
                    <td className="p-2 border">{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </SignedIn>
        <SignedOut>
          <p className="text-center text-red-500">Please sign in to view orders.</p>
        </SignedOut>
      </main>
    </div>
  );
}