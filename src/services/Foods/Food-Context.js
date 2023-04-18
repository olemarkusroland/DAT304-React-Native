import React, { createContext, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { getFoods, addFood, addFoodEntry, addMeal, addExampleFoods, getFoodEntries } from './Food-Service';

export const FoodContext = createContext();

export const FoodContextProvider = ({ children }) => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedFoods, setSelectedFoods] = useState([]);

    const createMealFromSelectedFoods = async () => {
        try {
            const foodEntryIds = [];
            for (const food of selectedFoods) {
                const foodEntryID = await addFoodEntry(food.name, food.grams);
                foodEntryIds.push(foodEntryID);
            }
            await addMeal(foodEntryIds);
            setSelectedFoods([]);
            console.log('A new meal has been created from the selected foods');
        } catch (error) {
            console.error('Error creating meal from selected foods:', error);
        }
    };

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

    const fetchFoods = async () => {
        try {
            await addExampleFoods();
            const foods = await getFoods();
            setFoods(foods);
            setFilteredFoods(foods);
            console.log('Foods fetched successfully', foods);
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    };

    useEffect(() => {
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
                CreateMeal: createMealFromSelectedFoods,
                addFood,
                getFoodEntries,
                fetchFoods,
            }}>
            {children}
        </FoodContext.Provider>

    );
};
