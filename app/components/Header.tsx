"use client";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";
import Cart from "./Cart";
import SearchBox from "./SearchBox";
import Image from "next/image";

const navigation = [
  { name: "Brands", href: "#" },
  { name: "Sneakers", href: "#" },
  { name: "Apparel", href: "#" },
  { name: "Accessories", href: "#" },
];
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const renderMobileHeader = () => (
    <Dialog
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
      className="lg:hidden"
    >
      <div className="fixed inset-0 z-50" />
      <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );

  const renderLogoSection = () => (
    <div className="flex lg:flex">
      <a href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">Your Company</span>
        <Image
          src="/images/ericson.png"
          alt="logo"
          width={60}
          height={100}
          quality={75}
        />
      </a>
    </div>
  );
  const renderCartButton = () => (
    <div className="lg:flex lg:flex-1 lg:justify-end ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="size-6 cursor-pointer"
        onClick={() => setCartOpen(true)}
      >
        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
      </svg>
    </div>
  );

  const renderMobileMenuButton = () => (
    <div className="flex lg:hidden">
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
      </button>
    </div>
  );

  const renderMenuItems = () => (
    <div className="hidden lg:flex lg:gap-x-12  ">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="text-sm/6 font-semibold text-gray-900"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
  return (
    <header className=" fixed bg-white shadow-md inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8 "
      >
        <div className="flex ">
          {renderLogoSection()}
          <SearchBox />
        </div>
        <div className="flex">
          {renderMenuItems()}

          <div className="flex sm:w-48">
            {renderCartButton()}
            {renderMobileMenuButton()}
          </div>
        </div>
        <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
      </nav>

      {renderMobileHeader()}
    </header>
  );
}
