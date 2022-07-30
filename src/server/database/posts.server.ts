import { Nullable } from "~/lib/types";
import prisma from ".";
import { Category } from "./categories.server";
import { Tag } from "./tags.server";

type OpenGraph = {
  "og:image": string;
  "twitter:image": string;
};

type PostTag = {
  tag: Tag;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  category: Category;
  tags: PostTag[];
  readingTime: number;
  thumbnailLarge: string;
  openGraph: Nullable<OpenGraph>;
  slug: string;
  createdAt: string;
};

export type PostContent = Post & {
  description: string;
  createdAt: string;
};

export namespace Posts {
  export const getAll = async (maxResults: number) =>
    await prisma.posts.findMany({
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        readingTime: true,
        thumbnailLarge: true,
        openGraph: true,
        slug: true,
        category: {
          select: {
            label: true,
            slug: true,
            image: true
          }
        }
      },
      take: maxResults
    });

  export const getBySlug = async (slug: string) =>
    await prisma.posts.findUnique({
      where: {
        slug
      },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        readingTime: true,
        createdAt: true,
        category: true,
        thumbnailLarge: true,
        openGraph: true,
        tags: {
          select: {
            tag: {
              select: {
                label: true,
                id: true
              }
            }
          }
        }
      }
    });
}
