
import { Input } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FetchSeasons, FormSeason } from "@/hooks/useSerie";

interface SeasonFeildProps {
  label: string;
  payloadKey: keyof FormSeason;
  fetchKey: keyof FetchSeasons;
  errors: FieldErrors<FormSeason>;
  season: FetchSeasons;
  register: UseFormRegister<FormSeason>;
}

export default function SeasonUpdateField({ label, payloadKey, fetchKey, register, errors, season }: SeasonFeildProps) {

  return (
    <Field label={label}>
      <Input {...register(payloadKey)} type="text" placeholder={`${season[fetchKey]}`} />
      {errors[payloadKey]?.message && (<p className="text-danger">{errors[payloadKey]?.message}</p>)}
    </Field>
  )
}