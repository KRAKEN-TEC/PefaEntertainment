import { FieldValues, useForm } from "react-hook-form";
import "@/components/CSS/NavBar.css";

interface Props {
  onSubmit: (payload: FieldValues) => void;
  placeholderName: string;
}

function SearchInput({ onSubmit, placeholderName }: Props) {
  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = (data: FieldValues) => {
    onSubmit(data);
    reset({ searchName: "" });
  };

  return (
    <form className="searchBox" onSubmit={handleSubmit(handleFormSubmit)}>
      <input
        {...register("searchName")}
        placeholder={`Search ${placeholderName} ... `}
      />
    </form>
  );
}

export default SearchInput;
