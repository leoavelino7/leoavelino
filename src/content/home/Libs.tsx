import { Link } from "remix";
import { ButtonLink, Chip } from "~/components";
import { GitHubIcon } from "~/icons";
import { AppLinks } from "~/lib/appLinks";

const libs = [
  {
    name: "Mocker API Faster",
    description: "É uma API Faker que simula e ajuda a você com operações CRUD.",
    githubLink: "https://github.com/leoavelino7/mocker-api-faster"
  },
  {
    name: "Shortcut Keys",
    description: "Um utilitário simples para criar atalhos de teclado em seus projeto web.",
    githubLink: "https://github.com/leoavelino7/shortcut-keys"
  }
];

export const Libs = () => (
  <section className="w-full py-28 bg-paper-light">
    <header className="w-full px-4 lg:px-1 m-auto max-w-7xl">
      <Chip className="text-primary bg-primary-light">Compartilhar</Chip>
      <h2 className="font-bold font-poppins text-3xl lg:text-4xl mt-8">Bibliotecas</h2>
      <h3 className="font-poppins max-w-[741px] text-neutral text-lg lg:text-xl mt-4">
        Para colaborar com a comunidade desenvolvi algumas bibliotecas afim de facilitar a vida dos desenvolvedores com seus projetos.
      </h3>
    </header>
    <section className="px-4 lg:px-0 my-12 m-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {libs.map((lib) => (
          <section key={lib.name} className="bg-paper flex flex-col gap-3 rounded-lg border border-solid border-neutral-light py-11 px-10">
            <div className="flex flex-row justify-between">
              <h3 className="font-semibold text-neutral-dark text-xl">{lib.name}</h3>
              <a href={lib.githubLink} target="_blank" className="hidden lg:flex flex-row gap-1 text-primary font-medium focus:outline-dashed">
                Ir para GitHub <span className="sr-only">de {lib.name}</span> <GitHubIcon />
              </a>
            </div>
            <p className="text-neutral">{lib.description}</p>
            <a href={lib.githubLink} target="_blank" className="flex flex-row lg:hidden gap-1 text-primary font-medium focus:outline-dashed">
              Ir para GitHub <span className="sr-only">de {lib.name}</span> <GitHubIcon />
            </a>
          </section>
        ))}
      </div>
      <div className="w-fit m-auto mt-12 lg:mt-24">
        <ButtonLink external to={AppLinks.github} outline>
          Ir para GitHub <GitHubIcon className="ml-1" />
        </ButtonLink>
      </div>
    </section>
  </section>
);
