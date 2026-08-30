import { Button } from "@/coss/ui/button";
import { signOut } from "../actions/sign-out";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <Button type="submit" variant="destructive-outline">
        Sign Out
      </Button>
    </form>
  );
}
