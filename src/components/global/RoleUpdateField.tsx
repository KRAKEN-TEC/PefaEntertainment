
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { HStack } from "@chakra-ui/react";
import { Field } from "../ui/field";

import { FetchRoles, useRole } from "@/hooks/useRole";
import { FormUser } from "@/hooks/useUser";

interface OptionTypes {
  role?: FetchRoles,
}

interface OtherFieldsProps<T> {
  register: UseFormRegister<FormUser>;
  errors: FieldErrors<FormUser>;
  document: T
}

export default function RoleUpdateField<T extends OptionTypes>({ register, errors, document }: OtherFieldsProps<T>) {
  const { data: roles } = useRole();

  return (
    <Field label="Select Role">
      <HStack>
        {roles.map((role) => (
          <div key={role._id}>
            <input
              {...register("roleId")}
              type="radio"
              id={`${role._id}`}
              value={role._id}
              defaultChecked={document.role?._id === role._id} // Ensure only one selection
            />
            <label htmlFor={`${role._id}`} style={{ paddingLeft: "5px" }}>{role.title}</label>
          </div>
        ))}
      </HStack>
      {errors.roleId?.message && (<p className="text-danger">{errors.roleId?.message}</p>)}
    </Field>
  );
};