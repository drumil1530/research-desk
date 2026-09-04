import type { Metadata } from "next";

import ResearchesPage from "@/features/research/components/list/researches-page";

export const metadata: Metadata = {
  title: "Research",
  description: "Explore and manage your research.",
};

export default function ResearchPage(pageProps: PageProps<"/researches">) {
  return <ResearchesPage pageProps={pageProps} />;
}
