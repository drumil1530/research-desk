const appRoutes = {
  home: "/",

  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },

  research: {
    list: "/researches",
    listPage: (page: number) => `/researches/page/${page}`,

    overview: (researchId: string) => `/researches/${researchId}`,
    notes: (researchId: string) => `/researches/${researchId}/notes`,

    sources: {
      list: (researchId: string) => `/researches/${researchId}/sources`,
      listPage: (researchId: string, page: number) =>
        `/researches/${researchId}/sources/page/${page}`,

      details: (researchId: string, sourceId: string) =>
        `/researches/${researchId}/sources/${sourceId}`,
    },
  } as const,
} as const;

export default appRoutes;
