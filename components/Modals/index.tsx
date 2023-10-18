"use client";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import { Fragment, ReactNode, useRef } from "react";
import { Button } from "../Button";
type IDiloag = {
  isOpen: boolean;
  toggleOpen: (isOpen?: boolean) => void;
  content: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
  buttonsProps?: {
    okbtnTxt?: ReactNode;
    cancelbtnTxt?: ReactNode;
    onOK?: () => Promise<any> | void;
    onClose?: () => Promise<any> | void;
  };
};

export default function DialogModel(props: IDiloag) {
  const { isOpen, toggleOpen, buttonsProps, content, title, icon } = props;

  const cancelButtonRef = useRef(null);
  let LeftIcon: any = icon;
  if (icon) {
    LeftIcon =
      typeof LeftIcon === "string" ? (
        <span className={clsx("w-1/4 h-2/4")}>
          <Image
            src={LeftIcon}
            alt="LeftIcon"
            fill
            className="object-contain"
          />
        </span>
      ) : (
        <LeftIcon />
      );
  }
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={toggleOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {LeftIcon ? (
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        {/* <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      /> */}
                        {LeftIcon}
                      </div>
                    ) : null}
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{content}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    type="button"
                    className="w-full rounded-md  sm:ml-3 sm:w-auto"
                    onClick={() => {
                      if (buttonsProps?.onOK) {
                        buttonsProps?.onOK();
                      } else {
                        toggleOpen(false);
                      }
                    }}
                  >
                    {buttonsProps?.okbtnTxt || "Ok"}
                  </Button>
                  <Button
                    type="button"
                    variant={"destructive"}
                    className="mt-3 rounded-md w-full sm:mt-0 sm:w-auto"
                    onClick={() => {
                      if (buttonsProps?.onClose) {
                        buttonsProps?.onClose();
                      } else {
                        toggleOpen(false);
                      }
                    }}
                    ref={cancelButtonRef}
                  >
                    {buttonsProps?.cancelbtnTxt || "Cancel"}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
