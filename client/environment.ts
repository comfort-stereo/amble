export const environment = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isServerSide: typeof window === "undefined",
  isClientSide: typeof window !== "undefined",
  rootUri: process.env.NEXT_PUBLIC_ROOT_URI,
  graphqlUri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
}
