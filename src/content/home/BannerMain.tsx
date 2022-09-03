import { FC } from "react";

import { AppLinks } from "~/lib/appLinks";
import { ButtonLink, Chip } from "~/components";
import { ArrowDownIcon } from "~/icons";
import { DetailIllustration, NotebookIllustration } from "~/illustrations";

export const BannerMain: FC<ComponentI18n> = ({ translate, language = "", loading }) => (
  <section className="relative py-11 bg-paper-light">
    <div className="top-0 w-full h-full absolute z-10 banner-main-hack"></div>
    <div className="flex flex-col justify-center items-center absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-full h-full z-0">
      <DetailIllustration className="opacity-60 md:opacity-40" />
    </div>
    <div className="relative z-10 px-4 lg:px-1 m-auto max-w-full lg:max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10">
        <div className="col-span-1 flex flex-col justify-center items-start gap-3">
          <Chip>{translate("main_banner_chip")}</Chip>
          <h1 className="font-bold text-4xl lg:text-6xl font-poppins">
            {translate("main_banner_title_study")} 
            {translate("main_banner_title_create")} 
            <br /> 
            {translate("main_banner_title_learn")} 
            <br />
            {translate("main_banner_title_share")}
          </h1>
          <div className="max-w-[513px] mt-1 mb-4">
            <p className="text-neutral text-md md:text-lg leading-snug font-poppins font-medium">
              {translate("main_banner_description")}
            </p>
          </div>

          <ButtonLink to={AppLinks.homeCategories(language, translate("section_category_id"))}>
            {translate("main_banner_button")} <ArrowDownIcon className="ml-1" />
          </ButtonLink>
        </div>
        <div className="col-span-1">
          <NotebookIllustration />
        </div>
      </div>
    </div>
  </section>
);
