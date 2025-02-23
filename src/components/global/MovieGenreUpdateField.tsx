
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { HStack } from "@chakra-ui/react";
import { Field } from "../ui/field";

import { FetchGenres, useGenre } from "@/hooks/useGenre";
import { FormMovie } from "@/hooks/useMovie";

interface OptionTypes {
  _id?: string,
  genres?: FetchGenres[],
}

interface OtherFieldsProps<T> {
  register: UseFormRegister<FormMovie>;
  errors: FieldErrors<FormMovie>;
  document: T
}

export default function MovieGenreUpdateField<T extends OptionTypes>({ register, errors, document }: OtherFieldsProps<T>) {
  const { data: genres } = useGenre();
  return (
    <Field label="Select Genres">
      <HStack>
        {genres.map((genre) => (
          <div key={genre._id}>
            <input {...register("genreIds")} type="checkbox" id={`${genre._id}`} value={genre._id} defaultChecked={document.genres?.some(doc => doc._id === genre._id)} />
            <label htmlFor={`${genre._id}`} style={{ paddingLeft: "5px" }}>{genre.name}</label>
          </div>
        ))}
      </HStack>
      {errors.genreIds?.message && (<p className="text-danger">{errors.genreIds?.message}</p>)}
    </Field>
  );
};