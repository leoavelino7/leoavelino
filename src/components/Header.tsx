import { Link } from "remix";
import { LeoAvelinoIcon } from "~/icons";
import { AppLinks } from "~/lib/appLinks";

export const Header = () => (
  <nav className="relative flex flex-col items-center w-full bg-paper h-20 header-shadow z-40">
    <header className="w-full px-4 lg:px-1 m-auto max-w-7xl">
      <Link to={AppLinks.home} className="flex w-fit">
        <LeoAvelinoIcon />
      </Link>
    </header>
  </nav>
);
