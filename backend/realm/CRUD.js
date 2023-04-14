import { UseGlucoseData, UseInsulinData } from '../nightscoutAPI';
import { realmOpen } from './utils';

function autoIncrementId(realm, modelName) {
    const lastObject = realm.objects(modelName).sorted('_id', true)[0];
    const highestId = lastObject == null ? 0 : lastObject._id;
    return highestId + 1;
}

function getLastMonthDate() {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return lastMonth;
}

export async function readGlucoses(realm, fromDate, toDate) {
    try {
        const glucoses = realm
            .objects('GlucoseInfo')
            .filtered('timestamp >= $0 AND timestamp <= $1', fromDate, toDate);

        if (!glucoses) {
            return null;
        }

        const glucosesArray = Array.from(glucoses).map(glucose => ({
            glucose: glucose.glucose,
            timestamp: glucose.timestamp,
        }));

        return glucosesArray.sort((a, b) => b.timestamp - a.timestamp);
    } catch (err) {
        console.error('Error in readGlucoses:', err);
        return null;
    }
}

export async function readLatestGlucose(realm) {
    try {
        if (realm) {
            let glucoseInfos = await realm.objects('GlucoseInfo');

            if (glucoseInfos.isEmpty()) {
                return null;
            }

            glucoseInfos = glucoseInfos.sorted('timestamp', true);
            const dateString = glucoseInfos[0].timestamp;
            const dateObj = new Date(dateString.getTime() + 1 * 60000);
            const isoString = dateObj.toISOString();
            return isoString;
        } else {
            throw new Error('Realm instance is null');
        }
    } catch (error) {
        console.error('Error fetching latest glucose:', error);
        return null;
    }
}

export async function updateGlucose(realm) {
    if (!realm) {
        console.error('updateGlucose: Realm instance is null');
        return;
    }

    const latestGlucose = await readLatestGlucose(realm);

    const currentDate = new Date();
    const fromDate =
        latestGlucose === null ? getLastMonthDate() : new Date(latestGlucose);

    const result = await UseGlucoseData(
        fromDate.toISOString(),
        currentDate.toISOString(),
    );

    if (result.length !== 0) {
        console.log('Adding ' + result.length + ' glucose entries.');

        await realm.write(() => {
            for (const glucoseInfo of result) {
                if (glucoseInfo.sgv != null && glucoseInfo.dateString != null) {
                    realm.create('GlucoseInfo', {
                        glucose: glucoseInfo.sgv,
                        timestamp: glucoseInfo.dateString,
                    });
                }
            }
        });

        console.log('Database: Glucose updated');
    } else {
        console.log('No glucose entries to add to database.');
    }
}

export async function readInsulins(realm, fromDate, toDate) {
    try {
        const insulins = realm
            .objects('InsulinInfo')
            .filtered('timestamp >= $0 AND timestamp <= $1', fromDate, toDate);

        if (!insulins) {
            return null;
        }

        const insulinsArray = Array.from(insulins).map(insulin => ({
            insulin: insulin.insulin,
            timestamp: insulin.timestamp,
        }));

        return insulinsArray.sort((a, b) => b.timestamp - a.timestamp);
    } catch (err) {
        console.error('Error in readInsulins:', err);
        return null;
    }
}

export async function readLatestInsulin(realm) {
    try {
        if (realm) {
            let insulinInfos = await realm.objects('InsulinInfo');

            if (insulinInfos.isEmpty()) {
                return null;
            }

            insulinInfos = insulinInfos.sorted('timestamp', true);
            const dateString = insulinInfos[0].timestamp;
            const dateObj = new Date(dateString.getTime() + 1 * 60000);
            const isoString = dateObj.toISOString();
            return isoString;
        } else {
            throw new Error('readLatestInsulin: Realm instance is null');
        }
    } catch (error) {
        console.error('Error fetching latest insulin:', error);
        return null;
    }
}

export async function updateInsulin(realm) {
    if (!realm) {
        console.error('updateInsulin: Realm instance is null');
        return;
    }
    const latestInsulin = await readLatestInsulin(realm);
    const currentDate = new Date();
    const fromDate =
        latestInsulin === null ? getLastMonthDate() : new Date(latestInsulin);
    const result = await UseInsulinData(
        fromDate.toISOString(),
        currentDate.toISOString(),
    );

    if (result.length !== 0) {
        console.log('Adding ' + result.length + ' insulin entries.');

        await realm.write(() => {
            for (const insulinInfo of result) {
                if (insulinInfo.insulin != null && insulinInfo.created_at != null) {
                    realm.create('InsulinInfo', {
                        insulin: insulinInfo.insulin,
                        timestamp: insulinInfo.created_at,
                    });
                }
            }
        });

        console.log('Database: Insulin updated');
    } else {
        console.log('No insulin entries to add to database.');
    }
}

export async function readFoods(realm) {
    const foods = await realm.objects('Food');

    if (!foods) {
        return null;
    }

    const foodsArray = Array.from(foods).map(food => ({
        name: food.name,
        calories: food.calories,
        carbohydrates: food.carbohydrates,
        protein: food.protein,
        fat: food.fat,
    }));

    return foodsArray;
}

export async function readFood(realm, name) {
    const food = await realm.objectForPrimaryKey('Food', name);

    if (!food) {
        return null;
    }

    return food;
}

export async function createOrUpdateFood(
    realm,
    name,
    calories,
    carbohydrates,
    protein,
    fat,
) {
    const existingFood = await realm.objectForPrimaryKey('Food', name);

    await realm.write(() => {
        if (existingFood) {
            existingFood.calories = calories;
            existingFood.carbohydrates = carbohydrates;
            existingFood.protein = protein;
            existingFood.fat = fat;
        } else {
            const newFood = realm.create('Food', {
                name,
                calories,
                carbohydrates,
                protein,
                fat,
            });
        }
    });
}

export async function deleteFood(realm, foodName) {
    try {
        const foodToDelete = await realm.objectForPrimaryKey('Food', foodName);

        if (!foodToDelete) {
            console.log(`Food with name ${foodName} not found`);
            return false;
        }

        await realm.write(() => {
            realm.delete(foodToDelete);
        });

        console.log(`Food with name ${foodName} deleted`);
        return true;
    } catch (error) {
        console.log('Error deleting Food:', error);
        return false;
    }
}

export async function readFoodEntries(realm) {
    const foodEntries = await realm.objects('FoodEntry');

    if (!foodEntries) {
        return null;
    }

    const foodEntriesArray = Array.from(foodEntries).map(entry => ({
        _id: entry._id,
        food: entry.food,
        amount: entry.amount,
    }));

    return foodEntriesArray;
}

export async function readFoodEntry(realm, foodEntryId) {
    try {
        const foodEntry = await realm.objectForPrimaryKey('FoodEntry', foodEntryId);

        if (!foodEntry) {
            console.log(`FoodEntry with id ${foodEntryId} not found`);
            return null;
        }

        return {
            _id: foodEntry._id,
            food: foodEntry.food,
            amount: foodEntry.amount,
        };
    } catch (error) {
        console.log('Error retrieving FoodEntry:', error);
        return null;
    }
}

export async function createFoodEntry(realm, foodName, amount) {
    const food = await readFood(realm, foodName);
    if (!food) {
        throw new Error('Food not found');
    }

    await realm.write(() => {
        realm.create('FoodEntry', {
            _id: autoIncrementId(realm, 'FoodEntry'),
            food,
            amount,
        });
    });
}

export async function deleteFoodEntry(realm, foodEntryId) {
    try {
        const foodEntry = realm.objectForPrimaryKey('FoodEntry', foodEntryId);

        if (!foodEntry) {
            console.log(`FoodEntry with id ${foodEntryId} not found`);
            return;
        }

        await realm.write(() => {
            realm.delete(foodEntry);
        });

        console.log(`FoodEntry with id ${foodEntryId} has been deleted`);
        return true;
    } catch (error) {
        console.log('Error deleting FoodEntry:', error);
        return false;
    }
}

export async function readMeals(realm) {
    const meals = await realm.objects('Meal');

    if (!meals) {
        return null;
    }

    const mealsArray = Array.from(meals).map(meal => ({
        _id: meal._id,
        timestamp: meal.timestamp,
        entries: Array.from(meal.entries),
    }));

    return mealsArray;
}

export async function readMeal(realm, mealId) {
    try {
        const meal = await realm.objectForPrimaryKey('Meal', mealId);

        if (!meal) {
            console.log(`Meal with _id ${mealId} not found`);
            return null;
        }

        return {
            _id: meal._id,
            timestamp: meal.timestamp,
            entries: Array.from(meal.entries),
        };
    } catch (error) {
        console.log('Error reading Meal:', error);
        return null;
    }
}

export async function createMeal(realm, foodEntryIds) {
    try {
        const foodEntries = [];

        for (const id of foodEntryIds) {
            const foodEntry = await realm.objectForPrimaryKey('FoodEntry', id);
            if (foodEntry) {
                foodEntries.push(foodEntry);
            } else {
                console.log(`FoodEntry with id ${id} not found`);
            }
        }

        await realm.write(() => {
            const newMeal = realm.create('Meal', {
                _id: autoIncrementId(realm, 'Meal'),
                timestamp: new Date().toISOString(),
                entries: foodEntries,
            });

            console.log('New meal created:', newMeal);
        });

        console.log('Meal created with the specified food entries.');
    } catch (error) {
        console.log('Error creating meal:', error);
    }
}

export async function deleteMeal(realm, mealId) {
    try {
        const mealToDelete = await realm.objectForPrimaryKey('Meal', mealId);

        if (!mealToDelete) {
            console.log(`Meal with _id ${mealId} not found`);
            return false;
        }

        await realm.write(() => {
            realm.delete(mealToDelete);
        });

        console.log(`Meal with _id ${mealId} deleted`);
        return true;
    } catch (error) {
        console.log('Error deleting Meal:', error);
        return false;
    }
}

export async function readUser(realm, userId) {
    try {
        const user = await realm.objectForPrimaryKey('User', userId);

        if (!user) {
            console.log(`User with id ${userId} not found`);
            return null;
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.Age,
        };
    } catch (error) {
        console.log('Error reading User:', error);
        return null;
    }
}

export async function readUsers(realm) {
    const users = await realm.objects('User');

    if (!users) {
        return null;
    }

    const usersArray = Array.from(users).map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.Age,
    }));

    return usersArray;
}

export async function createUser(realm, id, name, email, age) {
    try {
        await realm.write(() => {
            const newUser = realm.create('User', {
                id,
                name,
                email,
                age,
            });
        });

        console.log('New user created:', { id, name, email, age });
    } catch (error) {
        console.log('Error creating User:', error);
    }
}

export async function deleteUser(realm, userId) {
    try {
        const userToDelete = await realm.objectForPrimaryKey('User', userId);

        if (!userToDelete) {
            console.log(`User with id ${userId} not found`);
            return false;
        }

        await realm.write(() => {
            realm.delete(userToDelete);
        });

        console.log(`User with id ${userId} deleted`);
        return true;
    } catch (error) {
        console.log('Error deleting User:', error);
        return false;
    }
}
