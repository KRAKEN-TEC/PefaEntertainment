
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { HStack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { Path } from "react-hook-form";

import { useGenre } from "@/hooks/useGenre";
import { FormSerie } from "@/hooks/useSerie";
import { FormMovie } from "@/hooks/useMovie";


interface GenreField<T extends FormMovie | FormSerie> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  payloadKey: Path<T>;
}

export default function GenreField<T extends FormMovie | FormSerie>({ register, payloadKey, errors }: GenreField<T>) {
  const { data: genres } = useGenre();
  return (
    <Field label="Select Genres">
      <HStack>
        {genres.map((genre) => (
          <div key={genre._id}>
            <input {...register(payloadKey)} type="checkbox" id={`${genre._id}`} value={genre._id} />
            <label htmlFor={`${genre._id}`} style={{ paddingLeft: "5px" }}>{genre.name}</label>
          </div>
        ))}
        {errors[payloadKey as keyof typeof errors]?.message && (<p className="text-danger">{String(errors[payloadKey as keyof typeof errors]?.message)}</p>)}
      </HStack>
    </Field>
  );
};