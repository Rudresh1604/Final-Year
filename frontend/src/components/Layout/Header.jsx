import React from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

const NavbarComponent = () => {
  return (
    <div className="mt-1 fixed top-0 left-0 right-3  w-full">
      <Navbar fluid rounded className="mx-3 border border-gray-300 rounded-lg">
        <NavbarBrand href="/">
          <img
            src={"/Logo.png"}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            HealthScan AI
          </span>
        </NavbarBrand>
        <div className="flex md:order-2 gap-3">
          <Button
            color={"alternative"}
            className="border border-black bg-gray-100 cursor-pointer"
          >
            Sign in
          </Button>
          <Button className="cursor-pointer">Sign Up</Button>
          <NavbarToggle />
        </div>

        <NavbarCollapse>
          <NavbarLink href="#" active>
            Solutions
          </NavbarLink>
          <NavbarLink href="#">Community</NavbarLink>
          <NavbarLink href="#">Resources</NavbarLink>
          <NavbarLink href="#">Pricing</NavbarLink>
          <NavbarLink href="#">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
