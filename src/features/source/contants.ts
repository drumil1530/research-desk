import { SourceType } from "@/generated/prisma/enums";

export const sourceTypes = [
  { label: "Article", value: SourceType.ARTICLE },
  { label: "Documentation", value: SourceType.DOCUMENTATION },
  { label: "Video", value: SourceType.VIDEO },
  { label: "Repository", value: SourceType.REPOSITORY },
  { label: "Paper", value: SourceType.PAPER },
  { label: "Other", value: SourceType.OTHER },
];
