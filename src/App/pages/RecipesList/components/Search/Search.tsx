import React from 'react';
import styles from '../../RecipesList.module.scss';
import SearchIcon from '@assets/search.svg';
import Button from '@components/Button';
import Input from '@components/Input';
import MultiDropdown, { Option } from '@components/MultiDropdown';


import { MEAL_TYPES } from '../../types';


interface SearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  selectedTypes: Option[];
  onTypesChange: (types: Option[]) => void;
}

 const Search: React.FC<SearchProps> = ({
  searchValue,
  onSearchChange,
  onSearch,
  selectedTypes,
  onTypesChange
}) => (
  <div className={styles.search}>
    <Input
      className={styles.search__input}
      value={searchValue}
      onChange={onSearchChange}
      placeholder='Enter dishes'
      afterSlot={<Button onClick={onSearch}><SearchIcon /></Button>}
    />
    <MultiDropdown
      options={MEAL_TYPES}
      value={selectedTypes}
      onChange={onTypesChange}
      getTitle={(selected) => 
        selected.length ? selected.map(s => s.value).join(', ') : 'Meal Types'
      }
    />
  </div>
); 

export default Search;
