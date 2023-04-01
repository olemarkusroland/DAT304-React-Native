import {
  readLatestGlucose,
  readLatestInsulin,
  updateGlucose,
  updateInsulin,
  readFoods,
  readFood,
  createOrUpdateFood,
  readFoodEntries,
  createFoodEntry,
  readMeals,
  createMeal,
  readGlucoses,
  readInsulins,
} from './CRUD';

import {deleteRealmFile} from './utils';

import {realmOpen} from './utils';

/*
(async () => {
  await deleteRealmFile();
  const realm = await realmOpen();
  console.log('\nTest createOrUpdateFood and readFood:');
  await createOrUpdateFood(realm, 'Pizza', 250, 40, 10, 12);
  const pizza = await readFood(realm, 'Pizza');
  console.log('Read Food (Pizza):', pizza);

  console.log('\nTest createFoodEntry and readFoodEntries:');
  await createFoodEntry(realm, 'Pizza', 2);
  const foodEntries = await readFoodEntries(realm);
  console.log('Read Food Entries:', foodEntries);

  console.log('\nTest createMeal and readMeals:');
  await createMeal(realm);
  const meals = await readMeals(realm);
  console.log('Read Meals:', meals);

  console.log('\nTest updateGlucose and readLatestGlucose:');
  await updateGlucose(realm);
  const latestGlucose = await readLatestGlucose(realm);
  console.log('Latest Glucose:', latestGlucose);

  console.log('\nTest updateInsulin and readLatestInsulin:');
  await updateInsulin(realm);
  const latestInsulin = await readLatestInsulin(realm);
  console.log('Latest Insulin:', latestInsulin);

  console.log('\nTest readFoods:');
  const foods = await readFoods(realm);
  console.log('Read Foods:', foods);

  console.log('\nTest readGlucoses:');
  const glucoses = await readGlucoses(realm);
  console.log('Read Glucoses:', glucoses);

  console.log('\nTest readInsulins:');
  const insulins = await readInsulins(realm);
  console.log('Read Insulins:', insulins);
})();
*/
