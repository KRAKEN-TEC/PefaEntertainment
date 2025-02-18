import { Input } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { InputGroup } from "./ui/input-group";
import { LuSearch } from "react-icons/lu";

interface Props {
  onSubmit: (payload: FieldValues) => void;
  placeholderName: string;
}

function SearchInput({ onSubmit, placeholderName }: Props) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup startElement={<LuSearch />}>
        <Input
          {...register("searchName")}
          placeholder={`Search ${placeholderName} ... `}
          borderRadius="5px"
        />
      </InputGroup>
    </form>
  );
}

export default SearchInput;
