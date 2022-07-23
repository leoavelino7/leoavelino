import { ButtonLink } from "~/components";
import { FeedbackIllustration } from "~/illustrations";
import { AppLinks } from "~/lib/appLinks";

export const Feedbacks = () => (
  <div className="w-full pt-20 pb-28 bg-paper">
    <section className="grid grid-cols-1 md:grid-cols-2 justify-center mx-4 lg:mx-auto my-12 m-auto max-w-7xl border-2 border-solid border-neutral-light rounded-lg">
      <div className="col-span-1 px-4 py-11 lg:px-16">
        <h4 className="text-3xl lg:text-4xl font-bold leading-snug">Como posso sugerir temas para novos conteúdos?</h4>
        <ul className="flex flex-col gap-5 my-8 text-lg lg:text-xl font-medium">
          <ol className="font-poppins">
            <span className="font-bold text-primary mr-1">1.</span>
            Vá até o Github do meu blog
          </ol>
          <ol className="font-poppins">
            <span className="font-bold text-primary mr-1">2.</span>
            Abra uma discussão
          </ol>
          <ol className="font-poppins">
            <span className="font-bold text-primary mr-1">3.</span>
            Preencha com detalhes sobre o tema sugerido
          </ol>
          <ol className="font-poppins">
            <span className="font-bold text-primary mr-1">4.</span>
            Crie a discussão e acompanhe
          </ol>
        </ul>
        <div className="w-fit">
          <ButtonLink to={AppLinks.homeCategories} small outline>
            Quero sugerir um tema
          </ButtonLink>
        </div>
      </div>
      <div className="col-span-1 md:flex md:items-center bg-neutral-light px-7 lg:px-14">
        <FeedbackIllustration />
      </div>
    </section>
  </div>
);
