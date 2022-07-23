export const AppLinks = {
  home: "/",
  github: "https://github.com/leoavelino7",
  homeCategories: "/#categorias",
  homeCategory: (category: string) => `/#categorias?category=${category}`,
  post: (slug: string) => `/post/${slug}`
} as const;
