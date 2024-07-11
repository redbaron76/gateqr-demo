export const log = (...args: unknown[]) =>
  import.meta.env.MODE !== "production" && console.log(...args);

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};
