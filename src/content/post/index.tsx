import { Fragment, useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";

import { Header, Footer, Chip } from "~/components";
import { CopyAndShare } from "~/components/CopyAndShare";
import { Divider } from "~/components/Divider";
import type { Nullable } from "~/lib/types";
import type { Category } from "~/server/database/categories.server";
import type { PostContent } from "~/server/database/posts.server";
import { useProcessor } from "./hooks/useProcessor";
import type { Categories } from "~/lib/categories";
import { categoriesColor } from "~/lib/categories";
import { useTranslation } from "react-i18next";

type LoaderData = {
  code: Nullable<string>;
  slug: string;
  post: PostContent;
  categories: Category[];
};

export const Post = () => {
  const { t, i18n, ready } = useTranslation("post_content");

  const data = useLoaderData<LoaderData>();
  const [shareData, setShareData] = useState<ShareData>({});
  const contentHtml = useProcessor(data.code ?? "");

  useEffect(() => {
    setShareData({
      title: window.document.title,
      text: data.post.description,
      url: window.location.href
    });
  }, [data.post.description]);

  return (
    <Fragment>
      <Header loading={!ready} />
      <main className="bg-paper-light">
        <header className="flex flex-col justify-center items-center px-4 pt-24 pb-12">
          <p className="flex flex-row gap-x-2 items-center text-primary font-medium font-poppins">
            Leonardo Avelino
            <span aria-hidden="true" className="rounded-full w-2 h-2 bg-primary" />
            {i18n.resolvedLanguage &&
              new Date(data.post.createdAt).toLocaleDateString(i18n.resolvedLanguage.toLowerCase(), {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}
          </p>
          <h1 className="font-poppins text-neutral-dark font-bold text-4xl md:text-5xl mt-3 text-center">{data.post.title}</h1>
          <h2 className="font-poppins text-neutral font-medium text-lg md:text-xl text-center mt-4 mb-6 max-w-7xl">{data.post.description}</h2>
          <h3>
            <Chip className={`${categoriesColor[data.post.category.slug as Categories]} flex flex-row items-center w-fit gap-x-1 uppercase`}>
              <img src={data.post.category.image} className="w-5 h-5" alt="" />
              {data.post.category.label}
            </Chip>
          </h3>
        </header>
        <section>
          <header>
            <div className="mx-auto w-full max-w-6xl">
              <img src={data.post.thumbnailLarge} alt="" />
            </div>
            <div className="px-4 mx-auto w-full max-w-4xl">
              <h3 className="font-poppins text-neutral font-medium text-3xl mt-4 mb-6">{t("summary")}</h3>
              <div className="pb-8">{contentHtml.list}</div>
              <Divider />
            </div>
          </header>
          <section className="px-4 mx-auto w-full max-w-4xl">{contentHtml.content}</section>
          <footer className="px-4 mx-auto w-full max-w-4xl">
            <div className="py-8">
              <Divider />
            </div>
            <CopyAndShare text={shareData.url ?? ""} shareData={shareData} />
          </footer>
        </section>
      </main>
      <Footer language={i18n.resolvedLanguage} categories={data.categories} loading={!ready} />
    </Fragment>
  );
};
