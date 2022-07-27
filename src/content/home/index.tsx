import { Fragment, useState } from "react";
import { useLoaderData } from "remix";

import { Header, Footer } from "~/components";
import { Category } from "~/server/database/categories.server";
import { Post } from "~/server/database/posts.server";
import { BannerMain } from "./BannerMain";
import { Feedbacks } from "./Feedbacks";
import { Libs } from "./Libs";
import { PostList } from "./PostList";
import { Categories } from "~/lib/categories";

type LoaderData = {
  posts: Post[];
  categories: Category[];
};

export const Home = () => {
  const data = useLoaderData<LoaderData>();
  const [selectedCategory, setSelectedCategory] = useState<Categories>(Categories.All);

  return (
    <Fragment>
      <Header />
      <main>
        <BannerMain />
        <PostList posts={data.posts} categories={data.categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Libs />
        <Feedbacks />
        <Footer categories={data.categories} />
      </main>
    </Fragment>
  );
};
