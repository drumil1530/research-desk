import { PageContent } from "@/components/core/page";
import { Card, CardFrame, CardPanel } from "@/coss/ui/card";
import { authService } from "@/infrastructure/auth";

import DeleteAccountButton from "./delete-account-button";
import NameField from "./name-field";

export default async function Profile() {
  const user = await authService.getUserOrRedirect();

  return (
    <PageContent className="space-y-2">
      <CardFrame>
        <Card>
          <CardPanel className="space-y-6">
            <NameField name={user.name} />

            <div className="space-y-2">
              <p className="text-sm font-medium">Email</p>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium">Member since</p>
              <p className="text-muted-foreground text-sm">
                {user.createdAt.toLocaleDateString(undefined, { dateStyle: "long" })}
              </p>
            </div>
          </CardPanel>
        </Card>
      </CardFrame>

      <CardFrame>
        <Card>
          <CardPanel className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-muted-foreground text-sm">
                Permanently delete your account and all of your research data.
              </p>
            </div>

            <DeleteAccountButton />
          </CardPanel>
        </Card>
      </CardFrame>
    </PageContent>
  );
}
