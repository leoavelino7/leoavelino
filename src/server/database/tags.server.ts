import prisma from ".";

export type Tag = {
  id: string;
  label: string;
};

export namespace Tags {
  export const getAll = async () =>
    await prisma.tags.findMany({
      orderBy: [{ label: "asc" }],
      select: { id: true, label: true }
    });
}
