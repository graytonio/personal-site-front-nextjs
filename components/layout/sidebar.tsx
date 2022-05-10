import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { SlideIn, FadeIn } from "../pure/animations";
import navigation from "./navitems";
import Link from "next/link";
import NavItem from "./NavItem";

interface SidebarItemProps {
  navigation: any[];
}

function SidebarItems({ navigation }: SidebarItemProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link href="/" passHref={true}>
            <a className="h-8 w-auto text-3xl text-accent font-bold">Grayton Ward</a>
          </Link>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </nav>
      </div>
    </div>
  );
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" open={open} onClose={onClose}>
          <FadeIn>
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </FadeIn>
          <SlideIn>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button type="button" className="ml-1 flex items-center justify-venter h-10 w-10 rounded-full" onClick={onClose}>
                  <span className="sr-only">Close Sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <SidebarItems navigation={navigation} />
            </div>
          </SlideIn>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-slate-600">
        <SidebarItems navigation={navigation} />
      </div>
    </>
  );
}
