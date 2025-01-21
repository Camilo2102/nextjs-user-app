import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
  Avatar,
} from "@nextui-org/react";
import { useUserConfig } from "@/app/context/UserConfigContext";
import ShoppingCart from "../(pages)/landing/components/shoppingCart";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { getValue } = useLocalStorage()
  const menuItems = ["Inicio", "Categorias", "Log Out"];

  const [logged, setLogged] = useState<boolean>(false);
  const [role, setRole] = useState<string>("guess");

  const { getGlobalProps } = useUserConfig();

  const globalProps = getGlobalProps();

  useEffect(()=> {
    const role = getValue("role");

    setRole(role ?? "guess")

    if(!role || role === "guess" ) {
      return setLogged(false);
    }

    setLogged(true);

  }, [])

  const logginButtons = () => {
    return (
      <>
        <NavbarItem className="hidden lg:flex">
          <Link href="/auth/login">Iniciar Sesión</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="warning"
            href="/auth/register"
            variant="flat"
          >
            Registrarse
          </Button>
        </NavbarItem>
      </>
    );
  };

  const loggedButtons = () => {
    return (
      <>
        <NavbarItem className="hidden lg:flex">
          <Avatar name="User" />
        </NavbarItem>
        <NavbarItem>
          <ShoppingCart />
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly radius="full" color="danger" aria-label="Exit">
            <svg
              viewBox="-10.5 -10.5 42.00 42.00"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>shut_down [#1431]</title>{" "}
                <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  {" "}
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-419.000000, -560.000000)"
                    fill="#000000"
                  >
                    {" "}
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      {" "}
                      <path
                        d="M378.381271,401.145 C377.596921,400.752 376.64982,401.278 376.64982,402.123 C376.64982,402.552 376.91862,402.925 377.316571,403.126 C380.236622,404.602 382.110873,407.716 381.575372,411.174 C381.046172,414.602 378.050521,417.343 374.434319,417.728 C369.515067,418.251 365.333966,414.581 365.333966,410 C365.333966,407.004 367.121066,404.4 369.733467,403.101 C370.102018,402.918 370.349818,402.572 370.349818,402.176 L370.349818,402.084 C370.349818,401.256 369.423717,400.745 368.651967,401.129 C364.951765,402.966 362.545164,406.841 363.072265,411.191 C363.624565,415.742 367.515866,419.43 372.296519,419.936 C378.634321,420.607 383.999823,415.9 383.999823,410 C383.999823,406.155 381.722372,402.818 378.381271,401.145 M372.449819,409 L372.449819,401 C372.449819,400.447 372.920219,400 373.499819,400 C374.080469,400 374.549819,400.447 374.549819,401 L374.549819,409 C374.549819,409.552 374.080469,410 373.499819,410 C372.920219,410 372.449819,409.552 372.449819,409"
                        id="shut_down-[#1431]"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </Button>
        </NavbarItem>
      </>
    );
  };

  const generateMenuItems = () => {
    return globalProps?.navbar?.items.filter(item => role && !item.roles || item.roles.length === 0 || item.roles.includes(role)).map(item =>
      <NavbarItem key={item.name + "-" + item.path}>
        <Link href={item.path}>
          {item.name}
        </Link>
      </NavbarItem>
    )
  }

  return (
    <Navbar position={globalProps?.navbar?.isStatic ? "static" : "sticky"}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">{globalProps?.navbar?.brand ?? "Demo"}</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">{globalProps?.navbar?.brand ?? "Demo"}</p>
        </NavbarBrand>
        {generateMenuItems()}
      </NavbarContent>
      
      <NavbarContent justify="end">
          {logged ? loggedButtons() : logginButtons() }
      </NavbarContent>
      

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
