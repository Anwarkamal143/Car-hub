import Image from "next/image";
import AppLink from "../AppLink";
import { Button } from "../Button";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <AppLink variant={"secondary"} size={"small"} href={"/"}>
          <Image
            className="object-contain"
            src={"/logo.svg"}
            alt="Car Hub Logo"
            width={118}
            height={18}
          />
        </AppLink>
        <AppLink variant={"secondary"} size={"small"} href={"/"}>
          <Button
            type="button"
            variant={"secondary"}
            className="text-primary-blue"
          >
            Sign In
          </Button>
        </AppLink>
      </nav>
    </header>
  );
};

export default Navbar;
