// Function to get mock data

import {realmOpen} from '../../../backend/realm/utils';
import {readFoods} from '../../../backend/realm/CRUD';

export const GetFoodAsyncMock = async () => {
  // Create an array of mock foods
  const mockFoods = [
    {id: 1, name: 'Pizza', carbs: 30},
    {id: 2, name: 'Burger', carbs: 14},
    {id: 3, name: 'Salad', carbs: 17},
  ];

  // Simulate an API call by waiting for 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return the mock foods
  return mockFoods;
};

export const GetFoodAsync = async () => {
  // Create an array of mock foods

  const realm = await realmOpen();
  const foods = await readFoods(realm);
  console.log('Retrieved food from DB', foods);

  // Return the mock foods
  return foods;
};
