import Link from "next/link";

import {
  Card,
  CardFrame,
  CardFrameDescription,
  CardFrameFooter,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
} from "@/coss/ui/card";
import SignInForm from "@/features/auth/components/sign-in-form";
import appRoutes from "@/shared/app-routes";

export default function SignInPage() {
  return (
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle>Sign in</CardFrameTitle>
        <CardFrameDescription>Continue your research from where you left off.</CardFrameDescription>
      </CardFrameHeader>

      <Card>
        <CardPanel>
          <SignInForm />
        </CardPanel>
      </Card>

      <CardFrameFooter>
        <p className="text-sm text-muted-foreground">
          {"Don't have an account?"}{" "}
          <Link href={appRoutes.auth.signUp} className="hover:underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </CardFrameFooter>
    </CardFrame>
  );
}
