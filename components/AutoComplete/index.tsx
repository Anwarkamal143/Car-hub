"use client";

import useThrottle from "@/hooks/useThrottle";
import {
  Combobox,
  ComboboxButtonProps,
  ComboboxInputProps,
  ComboboxOptionProps,
  ComboboxOptionsProps,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";

type IAutocompleteItem = {
  value: string;
  label: string;
};
type Props = {
  onChange: (text: string) => void | Promise<unknown>;
  onChangeItem?: (text: string | IAutocompleteItem) => void | Promise<unknown>;
  value?: IAutocompleteItem;
  options?: IAutocompleteItem[] | string[];
  inputProps?: ComboboxInputProps<any, any>;
  buttonProps?: ComboboxButtonProps<any>;
  optionProps?: ComboboxOptionProps<any, any>;
  optionsProps?: ComboboxOptionsProps<any>;
};

const AutoComplete = (props: Props) => {
  const {
    onChange,
    value,
    options: opts,
    onChangeItem,
    inputProps = {},
    buttonProps = {},
    optionProps = {},
    optionsProps = {},
  } = props;
  const [query, setQueryValue] = useState(value?.label || "");
  const [options, setOptions] = useState(opts || []);
  const [loading, setIsLoading] = useState(false);
  const setQuery = useThrottle({
    fn: async (searchQuery: any) => {
      setIsLoading(true);
      const data = await onChange?.(searchQuery);
      setOptions(data as any);
      setIsLoading(false);
    },
    delay: 300,
  });
  const onItemChange = (value: IAutocompleteItem) => {
    console.log({ value });
    onChangeItem?.(value);
  };
  return (
    <div className="search-manufacturer">
      <Combobox value={value?.label || value} onChange={onItemChange}>
        <div className="relative w-full">
          <Combobox.Button className={"absolute top-[14px]"} {...buttonProps}>
            <Image
              src={"/car-logo.svg"}
              height={20}
              width={20}
              className="ml-4"
              alt="Car Logo"
            />
          </Combobox.Button>
          <Combobox.Input
            className={"search-manufacturer__input"}
            placeholder="Volkswagen"
            displayValue={(item: IAutocompleteItem) => {
              return item.label;
            }}
            onChange={(e) => {
              console.log({ e: e.target });
              setQuery(e.target.value);
              setQueryValue(e.target.value);
            }}
            {...inputProps}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => {
              console.log("leaved");
              setQueryValue("");
            }}
          >
            <Combobox.Options {...optionsProps}>
              {loading ? (
                <Combobox.Option
                  disabled
                  value={"Loading..."}
                  className={"search-manufacturer__option"}
                  {...optionProps}
                >
                  Loading...
                </Combobox.Option>
              ) : (
                <>
                  {
                    // options?.length === 0 && query !== "" ? (
                    //   <Combobox.Option
                    //     value={query}
                    //     className={"search-manufacturer__option"}
                    //   >
                    //     Create {query}
                    //   </Combobox.Option>
                    // ) : (
                    options.map((item) => {
                      const isString = typeof item === "string";
                      return (
                        <Combobox.Option
                          key={isString ? item : item.label}
                          value={item}
                          className={({ active }) => {
                            return `relative search-manufacturer__option ${
                              active
                                ? "bg-primary-blue text-white"
                                : "text-gray-900"
                            }`;
                          }}
                          {...optionProps}
                        >
                          {({ active, selected, disabled }) => {
                            return (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {isString ? item : item.label}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-teal-600"
                                    }`}
                                  />
                                ) : null}
                              </>
                            );
                            // return isString ? item : item.label;
                          }}
                        </Combobox.Option>
                      );
                    })
                    // )
                  }
                </>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default AutoComplete;
