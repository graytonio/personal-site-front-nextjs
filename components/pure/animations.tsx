import { Transition } from "@headlessui/react";
import React, { ReactNode, Fragment } from "react";

interface FadeInProps {
  children: ReactNode;
}

export function FadeIn({ children }: FadeInProps) {
  return (
    <Transition.Child
      as={Fragment}
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition.Child>
  );
}

interface SlideInProps {
  children: ReactNode;
}

export function SlideIn({ children }: SlideInProps) {
  return (
    <Transition.Child
      as={Fragment}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      {children}
    </Transition.Child>
  );
}
