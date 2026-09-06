import { PageContent } from "@/components/core/page";
import { Card, CardFrame, CardPanel } from "@/coss/ui/card";
import { authService } from "@/infrastructure/auth";

import NameField from "./name-field";

export default async function Profile() {
  const user = await authService.getUserOrRedirect();

  return (
    <PageContent>
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
    </PageContent>
  );
}
