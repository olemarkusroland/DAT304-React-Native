import React, {createContext, useEffect, useRef, useState} from 'react';
import {GetFoodAsync, GetFoodAsyncMock} from './Food-Service';
import debounce from 'lodash.debounce';

export const FoodContext = createContext();

export const FoodContextProvider = ({children}) => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  // Add a new state for the selected foods
  const [selectedFoods, setSelectedFoods] = useState([]);

  const addDistinctFood = food => {
    setSelectedFoods(prevSelectedFoods => {
      if (prevSelectedFoods.some(f => f.name === food.name)) {
        return prevSelectedFoods;
      } else {
        return [...prevSelectedFoods, food];
      }
    });
  };

  // Function to add a food to the selected foods list

  useEffect(() => {
    const fetchFoods = async () => {
      const mockFoods = await GetFoodAsyncMock();
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
        selectedFoods,
        addDistinctFood,
      }}>
      {children}
    </FoodContext.Provider>
  );
};
