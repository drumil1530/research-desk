import type { Metadata } from "next";
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
import SignUpForm from "@/features/auth/components/sign-up-form";
import ROUTES from "@/shared/routes";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Research Desk account.",
};

export default function SignUpPage() {
  return (
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle>Create your account</CardFrameTitle>
        <CardFrameDescription>Start organizing your research in one place.</CardFrameDescription>
      </CardFrameHeader>

      <Card>
        <CardPanel>
          <SignUpForm />
        </CardPanel>
      </Card>

      <CardFrameFooter>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href={ROUTES.auth.signIn} className="hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </CardFrameFooter>
    </CardFrame>
  );
}
