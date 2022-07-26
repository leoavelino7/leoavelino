export const AppLinks = {
  home: (language: string) => `/${language}/`,
  github: "https://github.com/leoavelino7",
  githubBlog: "https://github.com/leoavelino7/leoavelino",
  homeCategories: (language: string, categories: string) => `/${language}/#${categories}`,
  homeCategory: (language: string, category: string) => `/${language}/#categorias?category=${category}`,
  post: (language: string, slug: string) => `/${language}/post/${slug}`
} as const;
