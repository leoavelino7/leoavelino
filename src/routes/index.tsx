import { json, LoaderFunction } from "remix";
import { Home } from "~/content/home";
import { Categories } from "~/server/database/categories.server";
import { Posts } from "~/server/database/posts.server";

const MAX_POST_TO_LIST = 20;

export const loader: LoaderFunction = async () => {
  const categories = await Categories.getAll();
  const posts = await Posts.getAll(MAX_POST_TO_LIST);

  return json(
    {
      categories,
      posts
    },
    200
  );
};

export default Home;
