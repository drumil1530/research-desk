import { Suspense } from "react";

import { Page, PageDescription, PageHeader, PageTitle } from "@/components/core/page";
import Profile from "@/features/profile/components/profile";
import ProfileSkeleton from "@/features/profile/components/profile-skeleton";

export default function ProfilePage() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Profile</PageTitle>
        <PageDescription>Manage your account information</PageDescription>
      </PageHeader>

      <Suspense fallback={<ProfileSkeleton />}>
        <Profile />
      </Suspense>
    </Page>
  );
}
