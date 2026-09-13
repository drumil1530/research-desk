import { type Metadata } from "next";
import { Suspense } from "react";

import { Page, PageDescription, PageHeader, PageTitle } from "@/components/core/page";
import Profile from "@/features/profile/components/profile";
import ProfileSkeleton from "@/features/profile/components/profile-skeleton";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile and account settings.",
};

export default function ProfilePage() {
  return (
    <Page>
      <PageHeader className="sm:flex-col sm:items-start gap-1">
        <PageTitle>Profile</PageTitle>
        <PageDescription>Manage your profile and account settings.</PageDescription>
      </PageHeader>

      <Suspense fallback={<ProfileSkeleton />}>
        <Profile />
      </Suspense>
    </Page>
  );
}
