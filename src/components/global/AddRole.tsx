
import { Input, Button, Fieldset, DialogFooter } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schemaRole, FormRole } from "@/hooks/useRole";
import { useRoleActions } from "@/hooks/useRole";
import AlertMessage from '@/components/global/AlertMessage'
import DialogBox from "./DialogBox";

export default function AddRole() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormRole>({ resolver: zodResolver(schemaRole) });
  const { alert, loading, handleCreate } = useRoleActions();

  const onSubmit = (payload: FormRole) => {
    handleCreate(payload);
  };

  return (
    <>

      <DialogBox dialogTitle="Role Form" buttonTitle="Add Role">
        {alert && <AlertMessage message={alert} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root>
            <Fieldset.HelperText>
              Please provide role details below.
            </Fieldset.HelperText>
            <Fieldset.Content>
              <Field label="Name">
                <Input {...register("title", { required: true })} type="text" placeholder="Name..." />
                {errors.title?.message && (<p className="text-danger">{errors.title?.message}</p>)}
              </Field>
            </Fieldset.Content>
            {!loading ? (
              <DialogFooter>
                <Button type="submit">Submit</Button>{" "}
              </DialogFooter>
            ) : (
              <DialogFooter>
                <Button disabled>Submiting...</Button>
              </DialogFooter>
            )}
          </Fieldset.Root>
        </form>
      </DialogBox>
    </>
  );
};
