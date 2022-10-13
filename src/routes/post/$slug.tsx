import type { LoaderFunction, MetaFunction } from "remix";
import { json } from "remix";

import type { PostContent } from "~/server/database/posts.server";
import { Posts } from "~/server/database/posts.server";
import type { Category } from "~/server/database/categories.server";
import { Categories } from "~/server/database/categories.server";
import { markdown } from "~/lib/markdown";
import { Post as PostView } from "../../content/post";
import type { Nullable } from "~/lib/types";
import type { Language } from "~/lib/language";
import { isSupported } from "~/lib/language";

type LoaderData = {
  domain: string;
  url: string;
  slug: string;
  title: string;
  post: PostContent;
  categories: Category[];
  code: Nullable<string>;
};

type Params = {
  language: Language;
  slug: string;
};

export const loader: LoaderFunction = async (props) => {
  const params = props.params as Params;

  if (!isSupported(params.language)) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  const categories = await Categories.getAll();
  const slug = params.slug;

  const post = await Posts.getBySlug(slug);

  if (!post) {
    throw new Response("Not Found", {
      status: 404
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
  const description = data.post.description;

  const url = data.url;

  const facebookMetaTags: Record<`og:${string}`, string> = {
    "og:url": url,
    "og:title": title,
    "og:type": "article",
    "og:description": description,
    "og:image": data.post.openGraph?.["og:image"] || ""
  };

  const twitterMetaTags: Record<`twitter:${string}`, string> = {
    "twitter:card": "summary_large_image",
    "twitter:APP_DOMAIN": data.domain,
    "twitter:url": url,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": data.post.openGraph?.["twitter:image"] || ""
  };

  return {
    title,
    description,
    ...facebookMetaTags,
    ...twitterMetaTags
  };
};

export default PostView;
