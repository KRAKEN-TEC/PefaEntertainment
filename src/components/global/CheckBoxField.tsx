
import { Field } from "../ui/field";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FormSerie } from "@/hooks/useSerie";

interface SerieFeildProps {
  label: string;
  payloadKey: keyof FormSerie;
  required?: boolean;
  errors: FieldErrors<FormSerie>;
  register: UseFormRegister<FormSerie>;
}

export default function CheckBoxField({ label, payloadKey, required, register, errors }: SerieFeildProps) {
  return (
    <Field label={label}>
      <input {...register(payloadKey, { required: required })} type="checkbox" onChange={(e) => e.target.checked} />
      {errors[payloadKey]?.message && (<p className="text-danger">{errors[payloadKey]?.message}</p>)}
    </Field>
  )
}