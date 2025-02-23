import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "@/components/ui/menu";
import { Button, Icon } from "@chakra-ui/react";
import { TbChevronDown } from "react-icons/tb";

interface Props {
  onClick: (order: string) => void;
  selectedSort: string;
}

function SortSelector({ onClick, selectedSort }: Props) {
  const sortOrder = [
    { value: "rating", label: "Rating" },
    { value: "releasedDate", label: "Released Date" },
    { value: "uploadDate", label: "Upload Date" },
    { value: "seasonNumber", label: "Season Number" },
  ];

  // currentSort for "Order by: <currentSort>"
  let currentSort = sortOrder.find((sort) => sort.value === selectedSort || "-" + sort.value === selectedSort)?.label || "Relevance";

  if (["title", "-title"].includes(selectedSort)) {
    currentSort = "Title";
  }

  return (
    <MenuRoot>
      {/* BUTTON */}
      <MenuTrigger asChild>
        <Button variant="outline"> Order by: {currentSort}
          <Icon size={"sm"}><TbChevronDown /></Icon>
        </Button>
      </MenuTrigger>

      <MenuContent>
        {/* TITLE */}
        <MenuRoot positioning={{ placement: "right-start", gutter: 2 }} key={"title"}>
          <MenuTriggerItem value="title">Title</MenuTriggerItem>
          <MenuContent>
            <MenuItem onClick={() => onClick("title")} value="title"> Ascending</MenuItem>
            <MenuItem onClick={() => onClick("-title")} value="-title"> Descending</MenuItem>
          </MenuContent>
        </MenuRoot>

        {/* OTHERS */}
        {sortOrder.map((sort) => (
          <MenuRoot positioning={{ placement: "right-start", gutter: 2 }} key={sort.value}>
            <MenuTriggerItem value="sort.value">{sort.label}</MenuTriggerItem>
            <MenuContent>
              <MenuItem onClick={() => onClick("-" + sort.value)} key={"-" + sort.value} value={"-" + sort.value}> Ascending</MenuItem>
              <MenuItem onClick={() => onClick(sort.value)} key={sort.value} value={sort.value} > Descending</MenuItem>
            </MenuContent>
          </MenuRoot>
        ))}
      </MenuContent>
    </MenuRoot>
  );
}

export default SortSelector;
