
import { useRef } from "react";
import { Button } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


interface Props {
  children: React.ReactNode,
  dialogTitle: string,
  buttonTitle: string,
}

export function DialogActionBox({ children, dialogTitle, buttonTitle }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <DialogRoot initialFocusEl={() => ref.current} placement={"top"}>
      <DialogTrigger asChild>
        <Button className="button-action">{buttonTitle}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          {children}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default function DialogBox({ children, dialogTitle, buttonTitle }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <DialogRoot initialFocusEl={() => ref.current} placement={"top"}>
      <DialogTrigger asChild>
        <Button>{buttonTitle}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          {children}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};
