import { Fragment } from "react";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import { Header, Footer } from "~/components";
import type { Category } from "~/server/database/categories.server";
import type { Post } from "~/server/database/posts.server";
import { BannerMain } from "./BannerMain";
import { Feedbacks } from "./Feedbacks";
import { Libs } from "./Libs";
import { PostList } from "./PostList";
import { Categories } from "~/lib/categories";

type LoaderData = {
  categories: Category[];
  posts: Post[];
};

export const Home = () => {
  const { t, i18n, ready } = useTranslation("home");

  const data = useLoaderData<LoaderData>();

  const [searchParams, setSearchParams] = useSearchParams({
    category: Categories.All
  });

  return (
    <Fragment>
      <Header loading={!ready} />
      <main>
        <BannerMain language={i18n.resolvedLanguage} translate={t} loading={!ready} />
        <PostList
          language={i18n.resolvedLanguage}
          translate={t}
          loading={!ready}
          posts={data.posts}
          categories={data.categories}
          selectedCategory={searchParams.get("category") as Categories}
          setSelectedCategory={(category) => setSearchParams({ category })}
        />
        <Libs translate={t} loading={!ready} />
        <Feedbacks translate={t} loading={!ready} />
        <Footer language={i18n.resolvedLanguage} categories={data.categories} loading={!ready} />
      </main>
    </Fragment>
  );
};
