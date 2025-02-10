import logo from '../assets/PEFA(black).svg'
import { HStack, Image, Spacer } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';

import SearchInput from './SearchInput';
import DarkMode from './DarkMode';
import Dropdown from './Dropdown';

interface Props {
  onSearch: (searchValue: string) => void;
}

export default function NavBar({ onSearch }: Props) {

  return (
    <HStack padding="10px" width="100%">
      {/* Left Side: Dropdown */}
      <Dropdown></Dropdown>

      {/* Center: Logo */}
      <Spacer />
      <NavLink to="/" end>
        <Image src={logo} boxSize="50px" minWidth="50px" />
      </NavLink>
      <Spacer />

      {/* Right Side: SearchInput and DarkMode */}
      <HStack>
        <SearchInput submitHandler={(event) => onSearch(event.searchName)} />
        <DarkMode />
      </HStack>
    </HStack>
  )
}
