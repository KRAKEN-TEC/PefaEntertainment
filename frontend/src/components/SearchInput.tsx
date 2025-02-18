import { FieldValues, useForm } from "react-hook-form";
interface Props {
  onSubmit: (payload: FieldValues) => void;
  placeholderName: string;
}

function SearchInput({ onSubmit, placeholderName }: Props) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("searchName")}
        placeholder={`Search ${placeholderName} ... `}
      />
    </form>
  );
}

export default SearchInput;
