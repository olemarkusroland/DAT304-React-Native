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

    addTestFoods(realm)

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

export async function addTestFoods(realm) {
    const testFoods = [
        { name: "Food 1", calories: 100, carbohydrates: 20, protein: 5, fat: 2 },
        { name: "Food 2", calories: 150, carbohydrates: 30, protein: 10, fat: 5 },
        { name: "Food 3", calories: 200, carbohydrates: 40, protein: 15, fat: 8 },
        { name: "Food 4", calories: 250, carbohydrates: 50, protein: 20, fat: 11 },
        { name: "Food 5", calories: 300, carbohydrates: 60, protein: 25, fat: 14 },
        { name: "Food 6", calories: 350, carbohydrates: 70, protein: 30, fat: 17 },
        { name: "Food 7", calories: 400, carbohydrates: 80, protein: 35, fat: 20 },
        { name: "Food 8", calories: 450, carbohydrates: 90, protein: 40, fat: 23 },
        { name: "Food 9", calories: 500, carbohydrates: 100, protein: 45, fat: 26 },
        { name: "Food 10", calories: 550, carbohydrates: 110, protein: 50, fat: 29 },
    ];

    try {
        await realm.write(() => {
            for (const food of testFoods) {
                realm.create("Food", food);
            }
        });

        console.log("Test foods added to the database");
    } catch (err) {
        console.error("Error adding test foods:", err);
    }
}

