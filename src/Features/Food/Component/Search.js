import React, {useContext, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {FoodContext} from '../../../services/Foods/Food-Context';

export const Search = ({}) => {
  const {foods, search} = useContext(FoodContext);
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <Searchbar
      placeholder="Search for a food"
      value={searchKeyword}
      onSubmitEditing={() => {
        search(searchKeyword);
      }}
      onChangeText={text => {
        setSearchKeyword(text);
      }}
    />
  );
};
