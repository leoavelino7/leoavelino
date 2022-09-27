import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import { Category } from "~/server/database/categories.server";
import { Post } from "~/server/database/posts.server";

import { Chip } from "~/components";
import { PostResume } from "./PostResume";
import classNames from "classnames";
import { Categories, categoriesColor, categoriesEvent } from "~/lib/categories";

type CategoryItemProps = {
  slug: string;
  label: string;
  selectedCategory: Categories;
  onClick: (slug: Categories) => void;
};

const CategoryItem: FC<CategoryItemProps> = ({ selectedCategory, slug, label, onClick }) => {
  const categoryClassName =
    selectedCategory === slug
      ? categoriesColor[selectedCategory as Categories] ?? categoriesColor[Categories.Default]
      : categoriesColor[Categories.Default];

  const className = classNames(
    "whitespace-nowrap py-2 px-4 font-bold rounded-md",
    categoryClassName,
    categoriesEvent[slug as Categories],
    "focus:outline-dashed"
  );

  return (
    <li key={slug}>
      <button type="button" onClick={() => onClick(slug as Categories)} className={className}>
        {label}
      </button>
    </li>
  );
};

type PostListProps = ComponentI18n & {
  posts: Post[];
  categories: Category[];
  selectedCategory: Categories;
  setSelectedCategory: (category: Categories) => void | React.Dispatch<React.SetStateAction<Categories>>;
};

export const PostList: FC<PostListProps> = ({ translate, loading, posts, categories, selectedCategory, setSelectedCategory }) => (
  <section className="relative w-full py-28" id={translate("section_category_id")}>
    <div className="flex flex-col justify-center items-center text-center px-4 lg:px-0">
      <header className="w-full">
        <Chip Tag="h2" className="w-fit m-auto">
          {loading ? <Skeleton width="100px" height="10px" /> : translate("section_category_chip")}
        </Chip>
        <h3 className="mx-auto w-full font-bold font-poppins max-w-[770px] text-3xl lg:text-4xl mt-4">
          {loading ? <Skeleton /> : translate("section_category_title")}
        </h3>
      </header>
      <ul className="flex flex-row flex-nowrap max-w-full overflow-y-auto gap-x-7 py-3 lg:py-6 px-10 mt-11 border border-solid border-neutral-light rounded-md">
        <li>
          <button
            type="button"
            onClick={() => setSelectedCategory(Categories.All)}
            className={classNames(
              "whitespace-nowrap py-2 px-4 font-bold rounded-md",
              categoriesEvent[Categories.All],
              selectedCategory === Categories.All ? categoriesColor[Categories.All] : categoriesColor[Categories.Default]
            )}
          >
            {loading ? <Skeleton width="100px" /> : translate("section_category_filter_all")}
          </button>
        </li>
        {categories.map((category) => (
          <CategoryItem key={category.slug} {...category} selectedCategory={selectedCategory} onClick={setSelectedCategory} />
        ))}
      </ul>
    </div>
    <section className="mt-9 px-4 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto w-fit gap-y-11 gap-x-8 max-w-7xl px-1">
        {posts.map((post) => (
          <PostResume key={post.id} translate={translate} loading={loading} post={post} />
        ))}
      </div>
    </section>
  </section>
);
