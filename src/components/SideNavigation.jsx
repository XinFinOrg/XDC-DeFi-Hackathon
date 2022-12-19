/* eslint-disable @next/next/no-img-element */
import React, { useState, Fragment, useContext } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = ["Home", "Services", "Client", "About", "Contact"];

const SideNavigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6  py-6 px-4">
                  {navigation.map((page) => (
                    <div key={page} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page}
                      </a>
                    </div>
                  ))}
                </div>

                {user ? (
                  <div
                    className="m-2 block p-2 font-medium text-gray-900"
                    onClick={() => {
                      googleSignOut();
                      setOpen(false);
                    }}
                  >
                    Logout
                  </div>
                ) : (
                  <div className="space-y-6  py-6 px-4">
                    <div className="flow-root">
                      <Link href="/login">
                        <a
                          className="-m-2 block p-2 font-medium text-gray-900"
                          onClick={() => setOpen(false)}
                        >
                          Sign in
                        </a>
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link href="/signup">
                        <a
                          className="-m-2 block p-2 font-medium text-gray-900"
                          onClick={() => setOpen(false)}
                        >
                          Create account
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <header className="relative bg-indigo-500 text-[#f8f8f2]">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.map((page) => (
                    <a
                      key={page}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-white "
                    >
                      {page}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              {user ? (
                <div
                  className="ml-auto flex items-center"
                  onClick={() => {
                    googleSignOut();
                    setOpen(false);
                  }}
                >
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <span className="text-sm font-medium text-white">
                      Logout
                    </span>
                  </div>
                </div>
              ) : (
                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link href="/login">
                      <a className="text-sm font-medium text-white">Sign in</a>
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link href="/signup">
                      <a className="text-sm font-medium text-white ">
                        Create account
                      </a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default SideNavigation;
