import { json, LoaderFunction, MetaFunction, redirect } from "remix";

import { PostContent, Posts } from "~/server/database/posts.server";
import { Categories, Category } from "~/server/database/categories.server";
import { markdown } from "~/lib/markdown";
import { Post as PostView } from "../../content/post";
import { Nullable } from "~/lib/types";

type LoaderData = {
  domain: string;
  url: string;
  slug: string;
  title: string;
  post: PostContent;
  categories: Category[];
  code: Nullable<string>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const categories = await Categories.getAll();
  const slug = params.slug as string;

  const post = await Posts.getBySlug(slug);

  if (!post) {
    return redirect("/404", {
      status: 404,
      statusText: "Post not found"
    });
  }

  const code = await markdown(post?.content ?? "");

  const title = `Léo Avelino - ${post?.title}`;

  const url = `${process.env.APP_URL}/post/${slug}`;

  const domain = process.env.APP_DOMAIN;

  return json(
    {
      domain,
      url,
      slug,
      title,
      post,
      categories,
      code
    },
    200
  );
};

export const meta: MetaFunction = (props) => {
  const data = props.data as LoaderData;

  const title = data.title;

  const url = data.url;

  const facebookMetaTags: Record<`og:${string}`, string> = {
    "og:url": url,
    "og:title": title,
    "og:type": "article",
    "og:description": data.post.description,
    "og:image": data.post.openGraph?.["og:image"] || ""
  };

  const twitterMetaTags: Record<`twitter:${string}`, string> = {
    "twitter:card": "summary_large_image",
    "twitter:APP_DOMAIN": data.domain,
    "twitter:url": url,
    "twitter:title": title,
    "twitter:description": data.post.description,
    "twitter:image": data.post.openGraph?.["twitter:image"] || ""
  };

  return {
    title,
    decription: data.post.description,
    ...facebookMetaTags,
    ...twitterMetaTags
  };
};

export default PostView;
