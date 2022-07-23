import { json, LoaderFunction, MetaFunction } from "remix";

import { PostContent, Posts } from "~/server/database/posts.server";
import { Categories, Category } from "~/server/database/categories.server";
import { markdown } from "~/lib/markdown";
import { Post as PostView } from "../../content/post";
import { Nullable } from "~/lib/types";

type LoaderData = {
  code: Nullable<string>;
  slug: string;
  post: PostContent;
  categories: Category[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const categories = await Categories.getAll();
  const slug = params.slug as string;

  const post = await Posts.getBySlug(slug);

  const code = await markdown(post?.content ?? "");

  post?.id && Posts.incrementViews(post.id);

  return json(
    {
      code,
      slug,
      post,
      categories
    },
    200
  );
};

export const meta: MetaFunction = (props) => {
  const data = props.data as LoaderData;

  return {
    title: `Léo Avelino - ${data.post.title}`,
    decription: data.post.description
  };
};

export default PostView;
