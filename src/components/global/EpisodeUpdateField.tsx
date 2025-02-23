
import { Input } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FetchEpisodes, FormEpisode } from "@/hooks/useSerie";

interface EpisodeFeildProps {
  label: string;
  payloadKey: keyof FormEpisode;
  fetchKey: keyof FetchEpisodes;
  errors: FieldErrors<FormEpisode>;
  episode: FetchEpisodes;
  register: UseFormRegister<FormEpisode>;
}

export default function EpisodeUpdateField({ label, payloadKey, fetchKey, register, errors, episode }: EpisodeFeildProps) {

  return (
    <Field label={label}>
      <Input {...register(payloadKey)} type="text" placeholder={`${episode[fetchKey]}`} />
      {errors[payloadKey]?.message && (<p className="text-danger">{errors[payloadKey]?.message}</p>)}
    </Field>
  )
}