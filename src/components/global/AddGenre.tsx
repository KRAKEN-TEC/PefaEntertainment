
import { Input, Button, Fieldset, DialogFooter } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schemaGenre, FormGenre } from "@/hooks/useGenre";
import { useGenreActions } from "@/hooks/useGenre";
import AlertMessage from '@/components/global/AlertMessage'
import DialogBox from "./DialogBox";

export default function AddGenre() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormGenre>({ resolver: zodResolver(schemaGenre) });
  const { alert, loading, handleCreate } = useGenreActions();

  const onSubmit = (payload: FormGenre) => {
    handleCreate(payload);
  };

  return (
    <>
      {alert && <AlertMessage message={alert} />}

      <DialogBox dialogTitle="Genre Form" buttonTitle="Add Genre">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root>
            <Fieldset.HelperText>
              Please provide genre details below.
            </Fieldset.HelperText>
            <Fieldset.Content>
              <Field label="Name">
                <Input {...register("name", { required: true })} type="text" placeholder="Name..." />
                {errors.name?.message && (<p className="text-danger">{errors.name?.message}</p>)}
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
