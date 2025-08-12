import { currentUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default async function UsersPage() {
  const user = await currentUser();

  return (
    <>
      <SignedIn>
        <h1>Welcome, {user?.firstName}!</h1>
        <UserButton />
        {/* Order history, wishlist, etc. */}
      </SignedIn>

      <SignedOut>
        <p>Please sign in to view your profile.</p>
      </SignedOut>
    </>
  );
}
