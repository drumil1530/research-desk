import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";

import ResearchCard from "./research-card";
import ResearchEmpty from "./research-empty";

export default async function ResearchList() {
  const { id: userId } = await authService.getUserOrRedirect();

  const researches = await service.research.list({ userId });

  if (researches.length === 0) return <ResearchEmpty />;

  return (
    <div className="grid gap-4">
      {researches.map((research) => (
        <ResearchCard key={research.id} research={research} />
      ))}
    </div>
  );
}
