export const qk = {
  todos: {
    list: (page: number, limit: number) =>
      ["todos", "list", page, limit] as const,
  },
};
