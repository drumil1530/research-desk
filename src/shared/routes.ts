const ROUTES = {
  home: "/",

  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },

  researchList: "/researches",
  researchListPage: (page: number) => `/researches/page/${page}` as const,

  research: (researchId: string) =>
    ({
      detail: `/researches/${researchId}`,

      notes: `/researches/${researchId}/notes`,

      sources: `/researches/${researchId}/sources`,

      sourcePage: (page: number) => `/researches/${researchId}/sources/page/${page}` as const,

      source: (sourceId: string) => `/researches/${researchId}/sources/${sourceId}` as const,
    }) as const,
} as const;

export default ROUTES;
