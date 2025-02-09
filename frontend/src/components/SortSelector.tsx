
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu"
import { Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectedSortOrder: (order: string) => void;
  selectedSortOrder: string;
}

function SortSelector({ onSelectedSortOrder, selectedSortOrder }: Props) {
  const sortOrder = [
    { value: '', label: 'Relevance' },
    { value: 'title', label: 'Title' },
    { value: '-rating', label: 'Rating' },
    { value: '-releasedDate', label: 'Released Date' },
    { value: '-episode', label: 'Episode' },
    { value: '-season', label: 'Season' },
  ]

  const currentSortOrder = sortOrder.find(s => s.value === selectedSortOrder)?.label || 'Relevance';

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button>Order by: {currentSortOrder} <BsChevronDown /> </Button>
      </MenuTrigger>
      <MenuContent>
        {sortOrder.map(s => <MenuItem onClick={() => onSelectedSortOrder(s.value)} key={s.value} value={s.value}>{s.label}</MenuItem>)}
      </MenuContent>
    </MenuRoot>
  )
}

export default SortSelector