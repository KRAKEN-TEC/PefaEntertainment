import { FieldValues, useForm } from "react-hook-form";
import "@/components/CSS/NavBar.css";

interface Props {
  onSubmit: (payload: FieldValues) => void;
  placeholderName: string;
}

function SearchInput({ onSubmit, placeholderName }: Props) {
  const { register, handleSubmit } = useForm();

  return (
    <form className="searchBox" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("searchName")}
        placeholder={`Search ${placeholderName} ... `}
      ></input>
    </form>
  );
}

export default SearchInput;
