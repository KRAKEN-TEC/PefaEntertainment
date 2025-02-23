
import { Input } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FetchMovies, FormMovie } from "@/hooks/useMovie";

interface MovieFeildProps {
  label: string;
  payloadKey: keyof FormMovie;
  fetchKey: keyof FetchMovies;
  errors: FieldErrors<FormMovie>;
  movie: FetchMovies;
  register: UseFormRegister<FormMovie>;
}

export default function MovieUpdateField({ label, payloadKey, fetchKey, register, errors, movie }: MovieFeildProps) {

  return (
    <Field label={label}>
      <Input {...register(payloadKey)} type="text" placeholder={`${movie[fetchKey]}`} />
      {errors[payloadKey]?.message && (<p className="text-danger">{errors[payloadKey]?.message}</p>)}
    </Field>
  )
}