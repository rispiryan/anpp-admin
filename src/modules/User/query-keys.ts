export const usersQueryKeys = {
  getUserInfo: (token: string) =>
    [
      {
        scope: "single-User",
        entity: "users",
        token,
      },
    ] as const,
};
