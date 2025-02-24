
import { Input } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FormSerie } from "@/hooks/useSerie";

interface SerieFeildProps {
  label: string;
  payloadKey: keyof FormSerie;
  placeHolder: string;
  required?: boolean;
  valueAsNumber?: boolean;
  errors: FieldErrors<FormSerie>;
  register: UseFormRegister<FormSerie>;
}

export default function SerieField({ label, payloadKey, required, valueAsNumber, placeHolder, register, errors }: SerieFeildProps) {

  return (
    <Field label={label}>
      <Input {...register(payloadKey, { required: required, valueAsNumber: valueAsNumber })} type="text" placeholder={placeHolder} />
      {errors[payloadKey]?.message && (<p className="text-danger">{errors[payloadKey]?.message}</p>)}
    </Field>
  )
}