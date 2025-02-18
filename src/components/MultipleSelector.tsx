import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

type OptionType = {
  _id: string;
  name?: string;
  title?: string;
  role?: string;
};

interface Props<T> {
  onValueChange: any;
  data: T[];
  labelName: keyof T;
  placeholderName: string;
}

export default function MultipleSelector<T extends OptionType>({
  onValueChange,
  data,
  labelName,
  placeholderName,
}: Props<T>) {
  const collection = createListCollection({
    items: data.map((d) => ({ label: d[labelName] as string, value: d._id })),
  });

  return (
    <SelectRoot
      multiple
      collection={collection}
      width="200px"
      onValueChange={(selected) => onValueChange(selected.value)}
    >
      <SelectTrigger clearable>
        <SelectValueText placeholder={`All ${placeholderName}`} />
      </SelectTrigger>

      <SelectContent>
        {collection.items.map((c) => (
          <SelectItem item={c} key={c.value}>
            {c.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
