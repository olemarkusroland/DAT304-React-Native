// Function to get mock data

import {realmOpen} from '../../../backend/realm/utils';
import {createOrUpdateFood, readFoods} from '../../../backend/realm/CRUD';
import RNFS from 'react-native-fs';
import {Food} from '../../../backend/realm/schemas';

export const GetFoodAsyncMock = async () => {
  // Create an array of mock foods
  const mockFoods = [
    {
      name: 'Meat rissoles with pea stew, Fjordland',
      calories: 122,
      fat: 5.6,
      carbohydrates: 11.2,
      protein: 5.6,
    },
    {
      name: 'Pancakes, coarse',
      calories: 151,
      fat: 4.3,
      carbohydrates: 19.5,
      protein: 7.6,
    },
    {
      name: 'Pancakes, low-fat milk, fried in hard margarine',
      calories: 176,
      fat: 5.1,
      carbohydrates: 23.8,
      protein: 8.1,
    },
    {
      name: 'Taco with tortilla, plant-based minced, vegetables',
      calories: 151,
      fat: 6.8,
      carbohydrates: 13,
      protein: 8.4,
    },
    {
      name: 'Taco with tortilla, salmon, vegetables',
      calories: 176,
      fat: 9.5,
      carbohydrates: 12.9,
      protein: 9.3,
    },
    {
      name: 'Quinoa Salad with Roasted Vegetables',
      calories: 240,
      fat: 9.6,
      carbohydrates: 32.4,
      protein: 7.8,
    },
    {
      name: 'Grilled Chicken and Avocado Wrap',
      calories: 310,
      fat: 12.2,
      carbohydrates: 28.7,
      protein: 22.4,
    },
    {
      name: 'Vegetable Curry with Brown Rice',
      calories: 280,
      fat: 8.4,
      carbohydrates: 45.6,
      protein: 9.1,
    },
    {
      name: 'Mushroom and Spinach Stuffed Shells',
      calories: 295,
      fat: 10.1,
      carbohydrates: 40.2,
      protein: 13.3,
    },
    {
      name: 'Chickpea and Tomato Stew',
      calories: 210,
      fat: 6.3,
      carbohydrates: 29.8,
      protein: 8.7,
    },
  ];

  // Simulate an API call by waiting for 1 second

  // Return the mock foods
  return mockFoods;
};

const mockFood = [
  {
    name: 'Meat rissoles with pea stew, Fjordland',
    calories: 122,
    fat: 5.6,
    carbohydrates: 11.2,
    protein: 5.6,
  },
  {
    name: 'Pancakes, coarse',
    calories: 151,
    fat: 4.3,
    carbohydrates: 19.5,
    protein: 7.6,
  },
  {
    name: 'Pancakes, low-fat milk, fried in hard margarine',
    calories: 176,
    fat: 5.1,
    carbohydrates: 23.8,
    protein: 8.1,
  },
  {
    name: 'Taco with tortilla, plant-based minced, vegetables',
    calories: 151,
    fat: 6.8,
    carbohydrates: 13,
    protein: 8.4,
  },
  {
    name: 'Taco with tortilla, salmon, vegetables',
    calories: 176,
    fat: 9.5,
    carbohydrates: 12.9,
    protein: 9.3,
  },
  {
    name: 'Quinoa Salad with Roasted Vegetables',
    calories: 240,
    fat: 9.6,
    carbohydrates: 32.4,
    protein: 7.8,
  },
  {
    name: 'Grilled Chicken and Avocado Wrap',
    calories: 310,
    fat: 12.2,
    carbohydrates: 28.7,
    protein: 22.4,
  },
  {
    name: 'Vegetable Curry with Brown Rice',
    calories: 280,
    fat: 8.4,
    carbohydrates: 45.6,
    protein: 9.1,
  },
  {
    name: 'Mushroom and Spinach Stuffed Shells',
    calories: 295,
    fat: 10.1,
    carbohydrates: 40.2,
    protein: 13.3,
  },
  {
    name: 'Chickpea and Tomato Stew',
    calories: 210,
    fat: 6.3,
    carbohydrates: 29.8,
    protein: 8.7,
  },
];
export const GetFoodAsync = async () => {
  // Create an array of mock foods
  let mockData;
  mockData = mockFood;
  const realm = await realmOpen();
  for (const foodItem of mockData) {
    await createOrUpdateFood(
      realm,
      foodItem.name,
      foodItem.calories,
      foodItem.carbohydrates,
      foodItem.protein,
      foodItem.fat,
    );
  }
  // Return the mock foods
  return await readFoods(realm);
};
