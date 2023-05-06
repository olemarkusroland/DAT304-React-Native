import { UseGlucoseData, UseInsulinBasalData, UseInsulinData } from '../nightscoutAPI';
import { realmOpen } from './utils';
//import DeviceInfo from 'react-native-device-info';
//import { getMemoryInfo } from 'react-native-ps';

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

function getOneDayAgo() {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    return oneDayAgo;
}

function getSevenDaysAgo() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return sevenDaysAgo;
}

function getThirtyDaysAgo() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return thirtyDaysAgo;
}

function getSixtyDaysAgo() {
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    return sixtyDaysAgo;
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

export async function deleteGlucoseTest(realm, amount, text){
    if (!realm) {
        console.error('deleteGlucose: Realm instance is null');
        return;
    }

    const allObjects = realm.objects('GlucoseInfo');
    //const objectsToDelete = allObjects.slice(0, amount);
    
    
    const timeStart = global.nativePerformanceNow();
    console.log("WRITING!!");
    await realm.write(() => {
        for (let i = 0; i < amount; i++) {
          realm.delete(allObjects[i]);
        }
      });
    console.log("NOT WRITING!!");

    const timeEnd = global.nativePerformanceNow();
    console.log(`Delete Test finished in: ${timeEnd - timeStart}ms`);
    console.log('Deleted glucoses: ', amount);
    
}

export async function updateGlucose(realm, amount) {
    if (!realm) {
        console.error('updateGlucose: Realm instance is null');
        return;
    }

    const currentDate = new Date();
    const result = [];

    // Add amount glucose entries to the result array
    for (let i = 0; i < amount; i++) {
        result.push({
            sgv: Math.floor(Math.random() * 100) + 50, // Random glucose value between 50 and 149
            dateString: new Date(currentDate - i * 60000).toISOString(), // Date string for the last 60 days, incremented by 1 minute
        });
    }
    console.log('Adding ' + result.length + ' glucose entries.');
    const timeStart = global.nativePerformanceNow();
    await realm.write(() => {
        for (const glucoseInfo of result) {
            realm.create('GlucoseInfo', {
                glucose: glucoseInfo.sgv,
                timestamp: glucoseInfo.dateString,
            });
        }
    });
    const timeEnd = global.nativePerformanceNow();
    console.log(`Realm write time spent: ${timeEnd - timeStart}ms`);
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

        for (const insulinInfo of result) {

            if (insulinInfo.insulin != null && insulinInfo.created_at != null) {

                var basal = await getBasal(insulinInfo.created_at.toString());
                var parse_basal = parseFloat(basal);
                var insulin = parseFloat(insulinInfo.insulin);
                var date = insulinInfo.created_at;
                await realm.write(async () => {
                    realm.create('InsulinInfo', {
                        insulin: insulin,
                        basal: parse_basal,
                        timestamp: date,
                    });
                });
            }
                var date = currentDate.toISOString();
                var basal = await getBasal(date);
                var basal_parse = parseFloat(basal);
                var insulin = 0;
                
                //console.log('No insulin entries to add to database. but added Basal...' + insulin)
                await realm.write(() => {
                    realm.create('InsulinInfo', {
                        insulin: insulin,
                        basal: basal_parse,
                        timestamp: date,
                    });
                });
        }
        console.log('Database: Insulin updated');
    } else {
        var date = currentDate.toISOString();
        var basal = await getBasal(date);
        var parse_basal = parseFloat(basal);
        var insulin = 0;
        
        console.log('No insulin entries to add to database. but added Basal...' + insulin)
        await realm.write(() => {
            realm.create('InsulinInfo', {
                insulin: insulin,
                basal: parse_basal,
                timestamp: date,
            });
        });

    }
}

export async function getBasal(date_time) {

    const basal = await UseInsulinBasalData();
    var current_newest = null;
    var current_value = null;
    if (basal.length > 0) {

        for (let i = 0; i < basal.length; i++) {
            current_newest = getNewestDate(date_time, basal[i].created_at);
            if (current_newest["_j"] == date_time) {
                var dateStrings = [];
                var timeStrings = [];
                var dateAddstrings = [];

                if (basal[i].store["Pattern 1"].basal.length != 0) { dateStrings.push(basal[i].created_at); }
                for (let k = 0; k < basal[i].store["Pattern 1"].basal.length; k++) {

                    timeStrings.push(basal[i].store["Pattern 1"].basal[k].timeAsSeconds)
                }

                for (let j = 0; j < basal[i].store["Pattern 1"].basal.length; j++) {
                    var originalDate = dateStrings[j];
                    var dateObject = new Date(originalDate);
                    dateObject.getTime() + parseInt(timeStrings[j]) * 1000;
                    dateAddstrings.push(new Date(dateObject.getTime() + parseInt(timeStrings[j]) * 1000));
                    dateStrings.push(dateAddstrings[j].toISOString());

                }
                var current_value = null;

                for (let l = 0; l < dateAddstrings.length; l++) {
                    current_value = getNewestDate(date_time, dateAddstrings[l]);
                    if (current_value == date_time) {
                        return basal[i].store["Pattern 1"].basal[l].value;
                    }
                    if (l == dateAddstrings.length - 1) {
                        return basal[i].store["Pattern 1"].basal[l].value;
                    }
                }


            }
            else if (i == basal.length - 1) {
                current_newest = getNewestDate(date_time, basal[i].created_at);

                var dateStrings = [];
                var timeStrings = [];
                var dateAddstrings = [];
                if (basal[i].store["Pattern 1"].basal.length != 0) { dateStrings.push(basal[i].created_at); }
                for (let k = 0; k < basal[i].store["Pattern 1"].basal.length; k++) {

                    timeStrings.push(basal[i].store["Pattern 1"].basal[k].timeAsSeconds)
                }

                for (let j = 0; j < basal[i].store["Pattern 1"].basal.length; j++) {
                    var originalDate = dateStrings[j];
                    var dateObject = new Date(originalDate);
                    dateObject.getTime() + parseInt(timeStrings[j]) * 1000;
                    dateAddstrings.push(new Date(dateObject.getTime() + parseInt(timeStrings[j]) * 1000));
                    dateStrings.push(dateAddstrings[j].toISOString());

                }
                var current_value = null;
                var current_value = null;

                for (let l = 0; l < dateAddstrings.length; l++) {
                    current_value = getNewestDate(date_time, dateAddstrings[l]);
                    if (current_value == date_time) { return basal[i].store["Pattern 1"].basal[l].value; }
                    if (l == dateAddstrings.length - 1) { return basal[i].store["Pattern 1"].basal[l].value; }

                }


            }

        }
    }
    return 0;
}

export async function getNewestDate(first_date, second_date) {
    const firstDate = new Date(first_date);
    const secondDate = new Date(second_date);

    if (firstDate.getTime() < secondDate.getTime()) {
        return second_date;
    } else {
        return first_date;
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


export async function createExericise(realm, steps, start, end) {
    try {
        await realm.write(() => {
            const newExerice = realm.create('ExercicesInfo', {
                steps,
                start,
                end,
            });
        });

       
    } catch (error) {
        console.log('Error creating Exercise:', error);
    }
}

export async function deleteExerciseByTimestamp(realm, timestamp) {
   
    const entriesToDelete = realm.objects('ExercicesInfo').filtered('start > $0', timestamp);
   
    console.log("Deleted entires : " + entriesToDelete.length);


    realm.write(() => {
        realm.delete(entriesToDelete);
    });

    
}

export async function readAllExercises(realm) {
    const allEntries = realm.objects('ExercicesInfo');
   
    console.log(allEntries);
    return allEntries;
}

export async function deleteAllExercises(realm) {
    const allEntries = realm.objects('ExercicesInfo');

    realm.write(() => {
        realm.delete(allEntries);
    });
}
