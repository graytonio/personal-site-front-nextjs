import { ref } from "firebase/storage";
import LoadingSpinner from "./pure/loadingspinner";
import Image from "next/image";
import { storage } from "../lib/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { Transition } from "@headlessui/react";

interface FirebaseImageProps {
  imageReference: string;
  loadingClassName?: string;
  imgClassName?: string;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive" | "raw";
  alt?: string;
}

export default function FirebaseImage({ imageReference, loadingClassName, imgClassName, alt, layout = "fill" }: FirebaseImageProps) {
  const imageRef = ref(storage, imageReference);
  const [value, loading, error] = useDownloadURL(imageRef);

  return (
    <>
      <Transition
        show={loading || error != undefined || value == undefined}
        enter="transition-opacity duration-700 ease-in-out w-full h-full"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150 ease-in-out w-full h-full"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as="span"
      >
        <LoadingSpinner className={loadingClassName} />;
      </Transition>

      <Transition
        show={value != undefined}
        enter="transition-opacity duration-700 ease-in-out w-full h-full"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150 ease-in-out w-full h-full"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as="span"
      >
        <Image src={value!} layout={layout} objectFit="cover" className={imgClassName} alt={alt} />
      </Transition>
    </>
  );
}
