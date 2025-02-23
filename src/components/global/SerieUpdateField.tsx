
import { Input } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FetchSeries, FormSerie } from "@/hooks/useSerie";

interface SerieFeildProps {
  label: string;
  payloadKey: keyof FormSerie;
  fetchKey: keyof FetchSeries;
  errors: FieldErrors<FormSerie>;
  serie: FetchSeries;
  register: UseFormRegister<FormSerie>;
}

export default function SerieUpdateField({ label, payloadKey, fetchKey, register, errors, serie }: SerieFeildProps) {

  return (
    <Field label={label}>
      <Input {...register(payloadKey)} type="text" placeholder={`${serie[fetchKey]}`} />
      {errors[payloadKey]?.message && (<p className="text-danger">{errors[payloadKey]?.message}</p>)}
    </Field>
  )
}