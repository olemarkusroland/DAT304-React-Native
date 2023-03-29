import Realm from 'realm';
import {
  useGlucoseData,
  useInsulinData,
  CurrentTime,
  LastMonthTime,
} from './nightscoutAPI.js';
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import {Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';

const User = {
  name: 'User',
  properties: {
    id: 'int',
    name: 'string',
    email: 'string',
    Age: 'int',
  },
  primaryKey: 'id',
};

class Food extends Realm.Object {
  static schema = {
    name: 'Food',
    properties: {
      name: 'string',
      calories: 'float',
      carbohydrates: 'float',
      protein: 'float',
      fat: 'float',
    },
    primaryKey: 'name',
  };
}

class FoodEntry extends Realm.Object {
  static schema = {
    name: 'FoodEntry',
    properties: {
      //_id: "int",
      food: 'Food',
      amount: 'float',
    },
    //primaryKey: "_id",
  };
}

class FoodEntries extends Realm.Object {
  static schema = {
    name: 'FoodEntries',
    properties: {
      //_id: "int",
      timestamp: 'string',
      entries: 'FoodEntry[]',
    },
    //primaryKey: "_id",
  };
}

class Configuration extends Realm.Object {
  static schema = {
    name: 'Configuration',
    properties: {
      nightscoutAPI: 'string',
      nightscoutSecret: 'string',
      healthKitAPI: 'string',
      healthKitSecret: 'string',
      GPU: 'bool',
    },
  };
}

class ExercicesInfo extends Realm.Object {
  static schema = {
    name: 'ExercicesInfo',
    properties: {
      caloriesBurned: 'float',
      timestamp: 'date',
    },
  };
}

class GlucoseInfo extends Realm.Object {
  static schema = {
    name: 'GlucoseInfo',
    properties: {
      glucose: 'float',
      timestamp: 'date',
    },
  };
}

class InsulinInfo extends Realm.Object {
  static schema = {
    name: 'InsulinInfo',
    properties: {
      insulin: 'float',
      timestamp: 'date',
    },
  };
}

async function getRealmPath() {
  const appDir = await RNFS.DocumentDirectoryPath;
  return `${appDir}/my.realm`;
}

async function isRealmFileExists(filePath) {
  console.log('Checks if realm file exists...');
  try {
    const exists = await RNFS.exists(filePath);
    return exists;
  } catch (error) {
    console.error(
      `Failed to check if the Realm file exists: ${filePath}`,
      error,
    );
    return false;
  }
}

async function isRealmEmpty(realm) {
  const a = realm.objects('User').isEmpty();
  const s = realm.objects('Food').isEmpty();
  const d = realm.objects('FoodEntry').isEmpty();
  const f = realm.objects('FoodEntries').isEmpty();
  const g = realm.objects('Configuration').isEmpty();
  const h = realm.objects('ExercicesInfo').isEmpty();
  const j = realm.objects('GlucoseInfo').isEmpty();
  const k = realm.objects('InsulinInfo').isEmpty();
  console.log(a);
  console.log(s);
  console.log(d);
  console.log(f);
  console.log(g);
  console.log(h);
  console.log(j);
  console.log(k);
  return (
    userEmpty &&
    foodEmpty &&
    foodEntryEmpty &&
    foodEntriesEmpty &&
    configurationEmpty &&
    exercicesInfoEmpty &&
    glucoseInfoEmpty &&
    insulinInfoEmpty
  );
}

async function realmOpen() {
  try {
    const realmPath = await getRealmPath();
    console.log('Opening Realm...');
    const realm = await Realm.open({
      path: realmPath,
      schema: [
        User,
        Food,
        FoodEntry,
        FoodEntries,
        Configuration,
        ExercicesInfo,
        GlucoseInfo,
        InsulinInfo,
      ],
    });
    return realm;
  } catch (error) {
    console.error('Error opening realm:', error);
    throw error;
  }
}

async function readLatestGlucose(realm) {
  let glucoseInfos = realm.objects('GlucoseInfo');

  if (glucoseInfos.isEmpty()) {
    return null;
  }

  glucoseInfos = glucoseInfos.sorted('timestamp', true);
  const dateString = glucoseInfos[0].timestamp;
  const dateObj = new Date(dateString.getTime() + 1 * 60000);
  const isoString = dateObj.toISOString();
  return isoString;
}

async function readLatestInsulin(realm) {
  let insulinInfos = realm.objects('InsulinInfo');

  if (insulinInfos.isEmpty()) {
    return null;
  }

  insulinInfos = insulinInfos.sorted('timestamp', true);
  const dateString = insulinInfos[0].timestamp;
  const dateObj = new Date(dateString.getTime() + 1 * 60000);
  const isoString = dateObj.toISOString();
  return isoString;
}

async function updateGlucose() {
  const realm = await realmOpen();
  const latestGlucose = await readLatestGlucose(realm);
  console.log('Latest: ' + latestGlucose);

  if (latestGlucose == null) {
    // Checks if database is empty
    console.log('Empty realm');
    const currentDate = CurrentTime();
    const fromDate = LastMonthTime();
    var result = await useGlucoseData(fromDate, currentDate);
  } else {
    console.log('Not empty realm');
    const currentDate = CurrentTime();
    const fromDate = latestGlucose;
    var result = await useGlucoseData(fromDate, currentDate);
  }
  if (result.length != 0) {
    console.log('Adding ' + result.length + ' to entry...');

    realm.write(() => {
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

async function updateInsulin() {
  const realm = await realmOpen();
  const latestInsulin = await readLatestInsulin(realm);

  if (latestInsulin == null) {
    // Checks if database is empty
    console.log('Empty realm');
    const currentDate = CurrentTime();
    const fromDate = LastMonthTime();
    var result = await useInsulinData(fromDate, currentDate);
  } else {
    console.log('Not empty realm');
    const currentDate = CurrentTime();
    const fromDate = latestInsulin;
    var result = await useInsulinData(fromDate, currentDate);
  }
  if (result.length != 0) {
    console.log('Adding ' + result.length + ' to entry...');
    realm.write(() => {
      for (const insulinInfo of result) {
        if (insulinInfo.insulin != null && insulinInfo.created_at != null) {
          realm.create('InsulinInfo', {
            insulin: insulinInfo.insulin,
            timestamp: insulinInfo.created_at,
          });
        }
      }
    });
  } else {
    console.log('No entries to add to database.');
  }

  console.log('Database: Insulin updated');
}

export const useTimer = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    setTime(20);
  }, []);

  return time;
};

export {
  updateGlucose,
  updateInsulin,
  readLatestInsulin,
  readLatestGlucose,
  GlucoseInfo,
  realmOpen,
  isRealmFileExists,
  getRealmPath,
  isRealmEmpty,
};
