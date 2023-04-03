import React, {useContext, useState} from 'react';
import {IconButton, Searchbar} from 'react-native-paper';
import {FoodContext} from '../../../services/Foods/Food-Context';
import {styles} from '../../../Styles';

export const Search = ({}) => {
  const {foods, search, searchInstant} = useContext(FoodContext);
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <Searchbar
      placeholder="Search for a food"
      value={searchKeyword}
      style={styles.searchbar}
      renderLeftAccessory={() => (
        <IconButton icon="magnify" onPress={() => search(searchKeyword)} />
      )}
      renderRightAccessory={() => (
        <IconButton
          icon="close"
          onPress={() => {
            setSearchKeyword('');
            searchInstant('');
          }}
        />
      )}
      onSubmitEditing={() => {
        search(searchKeyword);
      }}
      onChangeText={text => {
        setSearchKeyword(text);
        search(text);
      }}
    />
  );
};
