// function to resolve zod schema we provide
import { zodResolver } from "@hookform/resolvers/zod";

// We will fully type `<Form />` component by providing component props and fwding // those

import {
  useForm as useHookForm,
  // typescript types of useHookForm props
  UseFormProps as UseHookFormProps,
} from "react-hook-form";

// Type of zod schema
import { TypeOf, ZodSchema } from "zod";

// We provide additional option that would be our zod schema.
interface UseFormProps<T extends ZodSchema<any>>
  extends UseHookFormProps<TypeOf<T>> {
  schema: T;
}

export function useForm<T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseFormProps<T>) {
  return useHookForm({
    ...formConfig,
    resolver: zodResolver(schema),
  });
}
