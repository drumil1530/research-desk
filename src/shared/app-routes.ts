const appRoutes = {
  home: "/",

  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },

  research: {
    list: "/research",
    overview: (id: string) => `/research/${id}`,
  } as const,
} as const;

export default appRoutes;
