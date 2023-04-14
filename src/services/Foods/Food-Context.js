import React, { createContext, useEffect, useState } from 'react';
import { GetFoodAsync } from './Food-Service';
import debounce from 'lodash.debounce';

export const FoodContext = createContext();

export const FoodContextProvider = ({ children }) => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedFoods, setSelectedFoods] = useState([]);

    const addDistinctFood = food => {
        setSelectedFoods(prevSelectedFoods => {
            const foodIndex = prevSelectedFoods.findIndex(f => f.name === food.name);
            if (foodIndex > -1) {
                // Food already exists in selected foods, update its grams value
                const updatedSelectedFoods = [...prevSelectedFoods];
                updatedSelectedFoods[foodIndex] = {
                    ...updatedSelectedFoods[foodIndex],
                    grams: food.grams || 0,
                };
                return updatedSelectedFoods;
            } else {
                // Food doesn't exist in selected foods, add it with default grams value of 0
                const newFood = { ...food, grams: food.grams || 0 };
                return [...prevSelectedFoods, newFood];
            }
        });
    };

    const removeSelectedFood = foodToRemove => {
        setSelectedFoods(prevSelectedFoods =>
            prevSelectedFoods.filter(food => food !== foodToRemove),
        );
    };

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const mockFoods = await GetFoodAsync();
                setFoods(mockFoods);
                setFilteredFoods(mockFoods);
                console.log('Foods fetched successfully', mockFoods);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
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
                selectedFoods,
                AddFood: addDistinctFood,
                RemoveFood: removeSelectedFood,
            }}>
            {children}
        </FoodContext.Provider>
    );
};
