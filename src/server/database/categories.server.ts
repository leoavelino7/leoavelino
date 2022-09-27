import prisma from ".";

export type Category = {
  id: string;
  label: string;
  image: string;
  slug: string;
};

export namespace Categories {
  export const getAll = async (): Promise<Category[]> =>
    await prisma.categories.findMany({
      orderBy: [{ label: "asc" }],
      select: {
        id: true,
        label: true,
        image: true,
        slug: true
      },
      where: {
        posts: {
          some: {
            publised: true
          }
        }
      }
    });
}
