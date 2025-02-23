
import { Input } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FormMovie } from "@/hooks/useMovie";

interface MovieFeildProps {
  label: string;
  payloadKey: keyof FormMovie;
  placeHolder: string;
  valueAsNumber?: boolean;
  required?: boolean;
  errors: FieldErrors<FormMovie>;
  register: UseFormRegister<FormMovie>;
}

export default function MovieField({ label, payloadKey, required, valueAsNumber, placeHolder, register, errors }: MovieFeildProps) {

  return (
    <Field label={label}>
      <Input {...register(payloadKey, { required: required, valueAsNumber: valueAsNumber })} type="text" placeholder={placeHolder} />
      {errors[payloadKey]?.message && (<p className="text-danger">{errors[payloadKey]?.message}</p>)}
    </Field>
  )
}