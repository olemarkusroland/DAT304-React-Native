import React, {createContext, useEffect, useRef, useState} from 'react';
import {GetFoodAsync} from './Food-Service';
import debounce from 'lodash.debounce';

export const FoodContext = createContext();

export const FoodContextProvider = ({children}) => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      const mockFoods = await GetFoodAsync();
      setFoods(mockFoods);
      setFilteredFoods(mockFoods);
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      const filtered = foods.filter(food =>
        food.name.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods([]);
    }
  }, [searchKeyword, foods]);

  const onSearch = debounce(newSearchKeyword => {
    setSearchKeyword(newSearchKeyword);
  }, 300);

  const onSearchInstant = newSearchKeyword => {
    setSearchKeyword(newSearchKeyword);
  };

  return (
    <FoodContext.Provider
      value={{
        foods: filteredFoods,
        search: onSearch,
        searchInstant: onSearchInstant,
        isLoading,
      }}>
      {children}
    </FoodContext.Provider>
  );
};
