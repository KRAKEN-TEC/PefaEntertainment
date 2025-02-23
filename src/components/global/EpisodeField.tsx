
import { Input } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FormEpisode } from "@/hooks/useSerie";

interface EpisodeFeildProps {
  label: string;
  payloadKey: keyof FormEpisode;
  placeHolder: string;
  valueAsNumber?: boolean;
  required?: boolean;
  errors: FieldErrors<FormEpisode>;
  register: UseFormRegister<FormEpisode>;
}

export default function EpisodeField({ label, payloadKey, required, valueAsNumber, placeHolder, register, errors }: EpisodeFeildProps) {

  return (
    <Field label={label}>
      <Input {...register(payloadKey, { required: required, valueAsNumber: valueAsNumber })} type="text" placeholder={placeHolder} />
      {errors[payloadKey]?.message && (<p className="text-danger">{errors[payloadKey]?.message}</p>)}
    </Field>
  )
}