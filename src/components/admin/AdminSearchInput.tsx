import { Input } from "@chakra-ui/react"
import { FieldValues, useForm } from "react-hook-form"
import { LuSearch } from "react-icons/lu";
import { InputGroup } from "../ui/input-group";

interface Props {
  onSubmit: (data: FieldValues) => void;
  placeholderName: string;
}

function AdminSearchInput({ onSubmit, placeholderName }: Props) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup startElement={<LuSearch />} width='full'>
        <Input
          {...register('searchName')}
          placeholder={`Search ${placeholderName} ... `}
          borderRadius='4px'
        />
      </InputGroup>
    </form>
  )
}

export default AdminSearchInput