import {UseGlucoseData, UseInsulinData} from '../nightscoutAPI';

export async function readLatestGlucose(realm) {
  let glucoseInfos = await realm.objects('GlucoseInfo');

  if (glucoseInfos.isEmpty()) {
    return null;
  }

  glucoseInfos = glucoseInfos.sorted('timestamp', true);
  const dateString = glucoseInfos[0].timestamp;
  const dateObj = new Date(dateString.getTime() + 1 * 60000);
  const isoString = dateObj.toISOString();
  return isoString;
}

export async function readLatestInsulin(realm) {
  let insulinInfos = await realm.objects('InsulinInfo');

  if (insulinInfos.isEmpty()) {
    return null;
  }

  insulinInfos = insulinInfos.sorted('timestamp', true);
  const dateString = insulinInfos[0].timestamp;
  const dateObj = new Date(dateString.getTime() + 1 * 60000);
  const isoString = dateObj.toISOString();
  return isoString;
}

function getLastMonthDate() {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  return lastMonth;
}
export async function updateGlucose(realm) {
  const latestGlucose = await readLatestGlucose(realm);

  const currentDate = new Date();
  const fromDate =
    latestGlucose === null ? getLastMonthDate() : new Date(latestGlucose);

  const result = await UseGlucoseData(
    fromDate.toISOString(),
    currentDate.toISOString(),
  );

  if (result.length !== 0) {
    console.log('Adding ' + result.length + ' to entry...');

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
    console.log('No entries to add to database.');
  }
}

export async function updateInsulin(realm) {
  const latestInsulin = await readLatestInsulin(realm);

  const currentDate = new Date();
  const fromDate =
    latestInsulin === null ? getLastMonthDate() : new Date(latestInsulin);

  const result = await UseInsulinData(fromDate, currentDate);

  if (result.length !== 0) {
    console.log('Adding ' + result.length + ' to entry...');

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
    console.log('No entries to add to database.');
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

export async function readFoodEntries(realm) {
  const allFoodEntry = await realm.objects('FoodEntry');

  if (!allFoodEntry) {
    return null;
  }

  return allFoodEntry;
}

export async function createFoodEntry(realm, foodName, amount) {
  const food = await readFood(realm, foodName);
  if (!food) {
    throw new Error('Food not found');
  }

  await realm.write(() => {
    realm.create('FoodEntry', {
      food,
      amount,
      inMeal: false,
    });
  });
}

export async function readMeals(realm) {
  const meals = await realm.objects('Meal');

  if (!meals) {
    return null;
  }

  const mealsArray = Array.from(meals).map(meal => ({
    timestamp: meal.timestamp,
    entries: Array.from(meal.entries).map(entry => ({
      food: {
        name: entry.food.name,
        calories: entry.food.calories,
        carbohydrates: entry.food.carbohydrates,
        protein: entry.food.protein,
        fat: entry.food.fat,
      },
      amount: entry.amount,
      inMeal: entry.inMeal,
    })),
  }));

  return mealsArray;
}

export async function createMeal(realm) {
  const allFoodEntries = await realm
    .objects('FoodEntry')
    .filtered('inMeal == false');

  if (!allFoodEntries || allFoodEntries.length === 0) {
    console.log('No food entries found in the database.');
    return;
  }

  const meal = {
    timestamp: new Date().toISOString(),
    entries: [],
  };

  console.log('Meal object:', meal);

  await realm.write(async () => {
    console.log('Inside realm.write');
    const newMeal = realm.create('Meal', meal);
    console.log('New meal created:', newMeal);

    allFoodEntries.forEach(entry => {
      console.log('Processing entry:', entry);
      // Modify the relationship
      const {food, amount, inMeal} = entry;
      console.log('Creating FoodEntry with meal:', newMeal);
      const newEntry = realm.create('FoodEntry', {
        food,
        amount,
        inMeal: true,
        meal: newMeal,
      });
      console.log('Entry processed:', newEntry);
    });
  });

  console.log(
    'Meal created with the available food entries and their "inMeal" attribute set to true.',
  );
}

export async function readGlucoses(realm) {
  const glucoses = await realm.objects('GlucoseInfo');

  if (!glucoses) {
    return null;
  }

  const glucosesArray = Array.from(glucoses).map(glucose => ({
    glucose: glucose.glucose,
    timestamp: glucose.timestamp,
  }));

  return glucosesArray;
}

export async function readInsulins(realm) {
  const insulins = realm.objects('InsulinInfo');

  if (!insulins) {
    return null;
  }

  const insulinsArray = Array.from(insulins).map(insulin => ({
    insulin: insulin.insulin,
    timestamp: insulin.timestamp,
  }));

  return insulinsArray;
}
