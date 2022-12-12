import prisma from ".";
import type { Nullable } from "~/lib/types";
import type { Category } from "./categories.server";
import type { Tag } from "./tags.server";
import type PrismaClient from "@prisma/client";

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
  export const getAll = async (options?: Pick<PrismaClient.Prisma.PostsAggregateArgs, "where" | "cursor" | "take" | "skip">) =>
    await prisma.posts.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
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
      ...options
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
