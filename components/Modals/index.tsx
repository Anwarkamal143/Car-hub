"use client";
import { CloseIcon } from "@/assets/svgs";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import {
  Fragment,
  HTMLAttributes,
  ReactNode,
  cloneElement,
  useRef,
} from "react";
import { Button } from "../Button";
type IDiloag = {
  isOpen: boolean;
  toggleOpen: (isOpen?: boolean) => void;
  content: ReactNode;
  rightContent?: {
    content: ReactNode;
    props?: HTMLAttributes<HTMLElement>;
  };
  closeIconClassNames?: HTMLAttributes<HTMLElement>["className"];
  contentClassNames?: HTMLAttributes<HTMLElement>["className"];
  closeIcon?: boolean;
  leftContent?: {
    content: ReactNode;
    props?: HTMLAttributes<HTMLElement>;
  };
  title?: ReactNode;
  buttonsProps?: {
    okbtnTxt?: ReactNode;
    cancelbtnTxt?: ReactNode;
    onOK?: () => Promise<any> | void;
    onClose?: () => Promise<any> | void;
  };
  allowFotter?: boolean;
};

export default function DialogModel(props: IDiloag) {
  const {
    isOpen,
    toggleOpen,
    buttonsProps,
    content,
    title,
    leftContent,
    rightContent,
    closeIcon = true,
    allowFotter = true,
    closeIconClassNames = "",
    contentClassNames = "",
  } = props;

  const cancelButtonRef = useRef(null);
  let LeftIcon: any = leftContent?.content;
  if (leftContent?.content) {
    LeftIcon =
      typeof LeftIcon === "string" ? (
        <Image src={LeftIcon} alt="LeftIcon" fill className="object-contain " />
      ) : (
        cloneElement(LeftIcon, { ...leftContent.props })
      );
  }
  let RightIcon: any = rightContent?.content;
  if (rightContent?.content) {
    RightIcon =
      typeof RightIcon === "string" ? (
        <Image
          src={RightIcon}
          alt="LeftIcon"
          fill
          className="object-contain "
        />
      ) : (
        cloneElement(RightIcon, { ...rightContent.props })
      );
  }
  const { className, ...rest } = leftContent?.props || {};
  const { className: rclassName, ...restt } = rightContent?.props || {};
  const isHeader = LeftIcon || title || RightIcon;
  const getHeaderComponent = () => {
    const isLeftSide = LeftIcon || title;
    return isHeader ? (
      <div className="flex justify-between w-full p-4 bg-gray-100">
        {isLeftSide ? (
          <div className="flex items-center flex-1">
            {LeftIcon ? (
              <div
                className={clsx(
                  "relative  flex w-5 flex-shrink-0",
                  className || ""
                )}
                {...rest}
              >
                {LeftIcon}
              </div>
            ) : null}
            {title ? (
              <Dialog.Title
                as="h3"
                className={clsx(
                  "ml-[5%] text-base font-semibold leading-6 text-gray-900",
                  { "ml-0": !LeftIcon }
                )}
              >
                {title}
              </Dialog.Title>
            ) : null}
          </div>
        ) : null}
        {RightIcon ? (
          <div
            className={clsx("relative  flex flex-shrink-0", rclassName || "", {
              "pr-6": closeIcon,
            })}
            {...restt}
          >
            {RightIcon}
          </div>
        ) : null}
      </div>
    ) : null;
  };
  const getFooter = () => {
    return allowFotter ? (
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
    ) : null;
  };
  return (
    <Transition.Root appear show={isOpen} as={Fragment}>
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
              <Dialog.Panel
                className={clsx(
                  "bg-white relative transform overflow-hidden  rounded-lg  text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-4xl",

                  contentClassNames
                )}
              >
                {closeIcon ? (
                  <div
                    className={clsx(
                      "text-gray-500  cursor-pointer absolute right-0 p-2 z-10",
                      {
                        "p-4": isHeader,
                      },
                      closeIconClassNames
                    )}
                  >
                    <CloseIcon
                      className="w-5 h-5"
                      onClick={() => {
                        if (buttonsProps?.onClose) {
                          buttonsProps?.onClose();
                        } else {
                          toggleOpen(false);
                        }
                      }}
                    />
                  </div>
                ) : null}
                {getHeaderComponent()}
                <div className="px-4 pb-4">
                  <div className="mt-3 sm:mt-0">
                    <div className="mt-2">{content}</div>
                  </div>
                </div>
                {getFooter()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
