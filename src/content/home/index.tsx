import { Fragment, useState } from "react";
import { useLoaderData } from "remix";
import { useTranslation } from "react-i18next";

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
  hasMore: boolean;
};

export const Home = () => {
  const { t, i18n, ready } = useTranslation("home");

  const data = useLoaderData<LoaderData>();

  const [selectedCategory, setSelectedCategory] = useState<Categories>(Categories.All);

  const seeMore = () => {
    // TODO - Infinity loading
  };

  return (
    <Fragment>
      <Header />
      <main>
        <BannerMain language={i18n.resolvedLanguage} translate={t} loading={ready} />
        <PostList
          language={i18n.resolvedLanguage}
          translate={t}
          loading={ready}
          posts={data.posts}
          categories={data.categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          hasMore={data.hasMore}
          onClickSeeMore={seeMore}
        />
        <Libs translate={t} loading={ready} />
        <Feedbacks translate={t} loading={ready} />
        <Footer language={i18n.resolvedLanguage} categories={data.categories} />
      </main>
    </Fragment>
  );
};
