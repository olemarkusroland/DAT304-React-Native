// Function to get mock data

export const GetFoodAsync = async () => {
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
