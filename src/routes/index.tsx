import { json, LoaderFunction, MetaFunction } from "remix";
import { Home } from "~/content/home";
import { Categories } from "~/server/database/categories.server";
import { Posts } from "~/server/database/posts.server";

const MAX_POST_TO_LIST = 20;

type LoaderData = {
  url: string;
  domain: string;
};

export const loader: LoaderFunction = async () => {
  const categories = await Categories.getAll();
  const posts = await Posts.getAll(MAX_POST_TO_LIST);

  const url = process.env.APP_URL;

  const domain = process.env.APP_DOMAIN;

  return json(
    {
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

  const title = "Léo Avelino - Página inicial";

  const url = data.url;
  const description = "Blog pessoal de Leonardo Avelino. Aprendendo e compartilhando conhecimentos de desenvolvimento de sistemas e de vida.";

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
    decription: description,
    ...facebookMetaTags,
    ...twitterMetaTags
  };
};

export default Home;
