import { Fragment, useEffect, useState } from "react";
import { useLoaderData } from "remix";

import { Header, Footer, Chip } from "~/components";
import { CopyAndShare } from "~/components/CopyAndShare";
import { Divider } from "~/components/Divider";
import { Nullable } from "~/lib/types";
import { Category } from "~/server/database/categories.server";
import { PostContent } from "~/server/database/posts.server";
import { useProcessor } from "./hooks/useProcessor";

type LoaderData = {
  code: Nullable<string>;
  slug: string;
  post: PostContent;
  categories: Category[];
};

export const Post = () => {
  const data = useLoaderData<LoaderData>();
  const [shareData, setShareData] = useState<ShareData>({});
  const contentHtml = useProcessor(data.code ?? "");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareData({
        title: window.document.title,
        text: data.post.description,
        url: window.location.href
      });
    }
  }, []);

  return (
    <Fragment>
      <Header />
      <main className="bg-paper-light">
        <header className="flex flex-col justify-center items-center px-4 pt-24 pb-12">
          <p className="flex flex-row gap-x-2 items-center text-primary font-medium font-poppins">
            Leonardo Avelino
            <span aria-hidden="true" className="rounded-full w-2 h-2 bg-primary" />
            {new Date(data.post.createdAt).toLocaleDateString("pt-br", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })}
          </p>
          <h1 className="font-poppins text-neutral-dark font-bold text-4xl md:text-5xl mt-3 text-center">{data.post.title}</h1>
          <h2 className="font-poppins text-neutral font-medium text-lg md:text-xl text-center mt-4 mb-6 max-w-7xl">{data.post.description}</h2>
          <h3>
            <Chip className={`${data.post.category.className} flex flex-row items-center w-fit gap-x-1 uppercase`}>
              <img src={data.post.category.image} className="w-5 h-5" alt="" />
              {data.post.category.label}
            </Chip>
          </h3>
        </header>
        <section>
          <header>
            <div className="mx-auto w-full max-w-6xl">
              <img src={data.post.thumbnailLarge} />
            </div>
            <div className="px-4 mx-auto w-full max-w-4xl">
              <h3 className="font-poppins text-neutral font-medium text-3xl mt-4 mb-6">Sumário</h3>
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
      <Footer categories={data.categories} />
    </Fragment>
  );
};
