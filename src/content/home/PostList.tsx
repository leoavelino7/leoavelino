import { FC } from "react";
import { Link } from "remix";

import { Category } from "~/server/database/categories.server";
import { Post } from "~/server/database/posts.server";

import { AppLinks } from "~/lib/appLinks";
import { Chip } from "~/components";
import { PostResume } from "./PostResume";
import classNames from "classnames";
import { Categories, categoriesColor, categoriesEvent } from "~/lib/categories";

type CategoryItemProps = {
  slug: string;
  label: string;
  selectedCategory: Categories;
  hasPosts: boolean;
  onClick: (slug: Categories) => void;
};

const CategoryItem: FC<CategoryItemProps> = ({ selectedCategory, slug, label, onClick, hasPosts }) => {
  const categoryClassName =
    selectedCategory === slug
      ? categoriesColor[selectedCategory as Categories] ?? categoriesColor[Categories.Default]
      : categoriesColor[Categories.Default];

  const className = classNames(
    "whitespace-nowrap py-2 px-4 font-bold rounded-md",
    categoryClassName,
    categoriesEvent[slug as Categories],
    "focus:outline-dashed",
    {
      "cursor-not-allowed opacity-40": !hasPosts
    }
  );

  return (
    <li key={slug}>
      <button type="button" onClick={hasPosts ? () => onClick(slug as Categories) : undefined} className={className} disabled={!hasPosts}>
        {label}
      </button>
    </li>
  );
};

type PostListProps = {
  posts: Post[];
  categories: Category[];
  selectedCategory: Categories;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Categories>>;
};

export const PostList: FC<PostListProps> = ({ posts, categories, selectedCategory, setSelectedCategory }) => (
  <section className="relative w-full py-28" id="categorias">
    <div className="flex flex-col justify-center items-center text-center px-4 lg:px-0">
      <header>
        <Chip Tag="h2" className="w-fit m-auto">
          Categorias
        </Chip>
        <h3 className="font-bold font-poppins max-w-[770px] text-3xl lg:text-4xl mt-4">Filtre posts por categoria</h3>
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
            Todas
          </button>
        </li>
        {categories.map((category) => (
          <CategoryItem
            key={category.slug}
            {...category}
            selectedCategory={selectedCategory}
            onClick={setSelectedCategory}
            hasPosts={category._count.posts > 0}
          />
        ))}
      </ul>
    </div>
    <section className="mt-9 px-4 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto w-fit gap-y-11 gap-x-8 max-w-7xl px-1">
        {posts.map((post) => {
          return (
            <Link key={post.id} to={AppLinks.post(post.slug)} tabIndex={-1}>
              <PostResume post={post} />
            </Link>
          );
        })}
      </div>

      {/* <div className="w-fit m-auto mt-12 lg:mt-24">
        <ButtonLink to={AppLinks.homeCategories} outline>
          Veja mais <ArrowDownIcon className="ml-1" />
        </ButtonLink>
      </div> */}
    </section>
  </section>
);
