import prisma from ".";

export type Category = {
  id: string;
  label: string;
  image: string;
  slug: string;
  _count: {
    posts: number;
  };
};

export namespace Categories {
  export const getAll = async (): Promise<Category[]> =>
    await prisma.categories.findMany({
      orderBy: [{ label: "asc" }],
      select: {
        id: true,
        label: true,
        image: true,
        slug: true,
        _count: {
          select: {
            posts: true
          }
        }
      }
    });
}
