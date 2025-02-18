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
    { value: "episode", label: "Episode" },
    { value: "season", label: "Season" },
    { value: "uploadDate", label: "Upload Date" },
  ];

  // currentSort for "Order by: <currentSort>"
  let currentSort =
    sortOrder.find(
      (s) => s.value === selectedSort || "-" + s.value === selectedSort
    )?.label || "Relevance";

  if (["title", "-title"].includes(selectedSort)) {
    currentSort = "Title";
  }

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline">
          Order by: {currentSort}
          <Icon size={"sm"}>
            <TbChevronDown />
          </Icon>
        </Button>
      </MenuTrigger>
      <MenuContent>
        {/* TITLE */}
        <MenuRoot
          positioning={{ placement: "right-start", gutter: 2 }}
          key={"title"}
        >
          <MenuTriggerItem value="title">Title</MenuTriggerItem>
          <MenuContent>
            <MenuItem onClick={() => onClick("title")} value="title">
              Ascending
            </MenuItem>
            <MenuItem onClick={() => onClick("-title")} value="-title">
              Descending
            </MenuItem>
          </MenuContent>
        </MenuRoot>

        {/* OTHERS */}
        {sortOrder.map((s) => (
          <MenuRoot
            positioning={{ placement: "right-start", gutter: 2 }}
            key={s.value}
          >
            <MenuTriggerItem value="s.value">{s.label}</MenuTriggerItem>
            <MenuContent>
              <MenuItem
                onClick={() => onClick("-" + s.value)}
                key={"-" + s.value}
                value={"-" + s.value}
              >
                Ascending
              </MenuItem>
              <MenuItem
                onClick={() => onClick(s.value)}
                key={s.value}
                value={s.value}
              >
                Descending
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        ))}
      </MenuContent>
    </MenuRoot>
  );
}

export default SortSelector;
