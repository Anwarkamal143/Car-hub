"use client";
import {
  Controller,
  FieldValues,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

import TwInput, { IInputProps } from "@/components/Input/TwInput";
import { forwardRef, ReactNode, Ref } from "react";
import FieldError from "./FieldError";
import FieldHelperText from "./FieldHelperText";

type InputProps = IInputProps & {
  label?: ReactNode;
  helperText?: ReactNode;
} & {
  materialDesign?: boolean;
};
type GenericTextfieldProps<T extends FieldValues> = UseControllerProps<T> &
  InputProps;
const Input = <T extends FieldValues>(
  props: GenericTextfieldProps<T>,
  ref: Ref<HTMLInputElement>
) => {
  const { name = "", id, helperText, ...rest } = props;
  const { control } = useFormContext();
  return (
    <div className="text-input">
      <div className="input_container">
        <Controller
          name={name}
          control={control}
          render={({
            field: { ref: rref, ...rrest },
            fieldState: { error },
          }) => {
            return (
              <div className="input_wrapper">
                <TwInput
                  {...rrest}
                  {...(rest as any)}
                  ref={ref || (rref as any)}
                  id={id || name}
                  error={error}
                />
              </div>
            );
          }}
        />
      </div>
      <FieldHelperText helperText={helperText} name={name} />
      <FieldError name={name} />
    </div>
  );
};

export default forwardRef(Input);
