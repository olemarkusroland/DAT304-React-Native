import {
    readGlucoses,
    readInsulins,
    readLatestGlucose,
    readLatestInsulin,
    updateGlucose,
    updateInsulin,
    readFoods,
    readFood,
    createOrUpdateFood,
    deleteFood,
    readFoodEntries,
    readFoodEntry,
    createFoodEntry,
    deleteFoodEntry,
    readMeals,
    readMeal,
    createMeal,
    deleteMeal,
} from './CRUD';

import { realmOpen, deleteRealmFile } from './utils';

(async () => {
    await deleteRealmFile();
    const realm = await realmOpen();

    console.log('\nTest createOrUpdateFood, readFood, and deleteFood:');
    await createOrUpdateFood(realm, 'Pizza', 250, 40, 10, 12);
    const pizza = await readFood(realm, 'Pizza');
    console.log('Read Food (Pizza):', pizza);
    await deleteFood(realm, 'Pizza');
    console.log('Read foods after deletion:', await readFoods(realm));

    console.log('\nTest createFoodEntry, readFoodEntries, readFoodEntry, and deleteFoodEntry:');
    await createOrUpdateFood(realm, 'Pizza', 250, 40, 10, 12);
    await createFoodEntry(realm, 'Pizza', 2);
    const foodEntries = await readFoodEntries(realm);
    console.log('Read Food Entries:', foodEntries);
    const foodEntryId = foodEntries[0]._id;
    console.log('Read Food Entry:', await readFoodEntry(realm, foodEntryId));
    await deleteFoodEntry(realm, foodEntryId);
    console.log('Read Food Entries after deletion:', await readFoodEntries(realm));

    console.log('\nTest createMeal, readMeals, readMeal, and deleteMeal:');
    await createFoodEntry(realm, 'Pizza', 2);
    const newFoodEntries = await readFoodEntries(realm);
    const foodEntryIds = newFoodEntries.map(entry => entry._id);
    await createMeal(realm, foodEntryIds);
    const meals = await readMeals(realm);
    console.log("Read Meals:", meals);
    const mealId = meals[0]._id;
    console.log("Read Meal:", await readMeal(realm, mealId));
    await deleteMeal(realm, mealId);
    console.log("Read Meals after deletion:", await readMeals(realm));

    //console.log('\nTest updateGlucose, readLatestGlucose, and readGlucoses:');
    //await updateGlucose(realm);
    //const latestGlucose = await readLatestGlucose(realm);
    //console.log('Latest Glucose:', latestGlucose);
    //const glucoses = await readGlucoses(realm);
    //console.log('Read Glucoses:', glucoses);

    //console.log('\nTest updateInsulin, readLatestInsulin, and readInsulins:');
    //await updateInsulin(realm);
    //const latestInsulin = await readLatestInsulin(realm);
    //console.log('Latest Insulin:', latestInsulin);
    //const insulins = await readInsulins(realm);
    //console.log('Read Insulins:', insulins);

    realm.close();
})();
