import logo from '../assets/PEFA(black).svg'
import { HStack, Image, Spacer } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

import SearchInput from './SearchInput';
import DarkMode from './DarkMode';
import { useUserStore } from '@/context/useUserStore';
import Dropdown from './Dropdown';

interface Props {
  onSearch: (searchValue: string) => void;
}

export default function NavBar({ onSearch }: Props) {
  const { accessToken } = useUserStore();

  return (
    <HStack padding='10px'>

      <Dropdown></Dropdown>


      <NavLink to="/" end>
        <Image src={logo} boxSize="50px" minWidth="50px" />
      </NavLink>

      <Box>
        <Spacer/>
        
        <Box width="20%">
          <SearchInput submitHandler={(event) => onSearch(event.searchName)} />
        </Box>
        
        <DarkMode/>
      </Box>
    </HStack >
  )
}
