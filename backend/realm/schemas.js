import Realm from 'realm';

export class GlucoseInfo extends Realm.Object {
  static schema = {
    name: 'GlucoseInfo',
    properties: {
      glucose: 'float',
      timestamp: 'date',
    },
  };
}

export class InsulinInfo extends Realm.Object {
  static schema = {
    name: 'InsulinInfo',
    properties: {
      insulin: 'float',
      timestamp: 'date',
    },
  };
}

export class Food extends Realm.Object {
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

export class FoodEntry extends Realm.Object {
  static schema = {
    name: 'FoodEntry',
    properties: {
      _id: 'int',
      food: 'Food',
      amount: 'float',
    },
    primaryKey: '_id',
  };
}

export class Meal extends Realm.Object {
  static schema = {
    name: 'Meal',
    properties: {
      _id: 'int',
      timestamp: 'string',
      entries: 'FoodEntry[]',
    },
    primaryKey: '_id',
  };
}

export class Configuration extends Realm.Object {
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

export class ExercicesInfo extends Realm.Object {
  static schema = {
    name: 'ExercicesInfo',
    properties: {
      steps: 'float',
        start: 'date',
        end: 'date',
    },
  };
}

export const User = {
  name: 'User',
  properties: {
    id: 'int',
    name: 'string',
    email: 'string',
    Age: 'int',
  },
  primaryKey: 'id',
};

const schemas = [
  GlucoseInfo,
  InsulinInfo,
  Food,
  FoodEntry,
  Meal,
  Configuration,
  ExercicesInfo,
  User,
];
export default schemas;
