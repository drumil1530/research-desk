const appRoutes = {
  home: "/",

  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },

  research: {
    list: "/research",
    overview: (researchId: string) => `/research/${researchId}`,
    notes: (researchId: string) => `/research/${researchId}/notes`,

    sources: {
      list: (researchId: string) => `/research/${researchId}/sources`,
      details: (researchId: string, sourceId: string) =>
        `/research/${researchId}/sources/${sourceId}`,
    },
  } as const,
} as const;

export default appRoutes;
