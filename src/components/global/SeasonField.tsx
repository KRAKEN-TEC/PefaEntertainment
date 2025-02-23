
import { Input } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FormSeason } from "@/hooks/useSerie";

interface SeasonFeildProps {
  label: string;
  payloadKey: keyof FormSeason;
  placeHolder: string;
  valueAsNumber?: boolean;
  required?: boolean;
  errors: FieldErrors<FormSeason>;
  register: UseFormRegister<FormSeason>;
}

export default function SeasonField({ label, payloadKey, required, valueAsNumber, placeHolder, register, errors }: SeasonFeildProps) {

  return (
    <Field label={label}>
      <Input {...register(payloadKey, { required: required, valueAsNumber: valueAsNumber })} type="text" placeholder={placeHolder} />
      {errors[payloadKey]?.message && (<p className="text-danger">{errors[payloadKey]?.message}</p>)}
    </Field>
  )
}