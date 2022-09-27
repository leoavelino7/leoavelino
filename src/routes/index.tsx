import { json, LoaderFunction, MetaFunction } from "remix";
import { Home } from "~/content/home";
import { i18n } from "~/i18n.server";
import { fallbackLng } from "~/lib/language";
import { Categories } from "~/server/database/categories.server";
import { Posts } from "~/server/database/posts.server";

type LoaderData = {
  url: string;
  domain: string;
  title: string;
  description: string;
};

type Params = {
  language: string;
};

export const loader: LoaderFunction = async (props) => {
  const { searchParams } = new URL(props.request.url);

  const category = searchParams.get("category") ?? undefined;
  const categorySlug = category !== "all" ? category : undefined;

  const params = props.params as Params;
  const t = await i18n.getFixedT(params.language ?? fallbackLng, "home");

  const categories = await Categories.getAll();

  const posts = await Posts.getAll({
    where: {
      publised: true,
      category: {
        slug: categorySlug
      }
    }
  });

  const url = process.env.APP_URL;

  const domain = process.env.APP_DOMAIN;

  const title = t("page_title");
  const description = t("page_description");

  return json(
    {
      title,
      description,
      url,
      domain,
      categories,
      posts
    },
    200
  );
};

export const meta: MetaFunction = (props) => {
  const data = props.data as LoaderData;

  const title = data.title;

  const url = data.url;
  const description = data.description;

  const facebookMetaTags: Record<`og:${string}`, string> = {
    "og:url": url,
    "og:title": title,
    "og:type": "website",
    "og:description": description,
    "og:image": "https://via.placeholder.com/1200x630"
  };

  const twitterMetaTags: Record<`twitter:${string}`, string> = {
    "twitter:card": "summary_large_image",
    "twitter:APP_DOMAIN": data.domain,
    "twitter:url": url,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": "https://via.placeholder.com/1200x630"
  };

  return {
    title,
    description,
    ...facebookMetaTags,
    ...twitterMetaTags
  };
};

export default Home;
