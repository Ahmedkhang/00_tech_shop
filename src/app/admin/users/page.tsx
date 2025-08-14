export const dynamic = "force-dynamic";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default async function UsersPage() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <p>Please sign in to view your profile.</p>
      </SignedOut>
    </>
  );
}
