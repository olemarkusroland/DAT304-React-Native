import Realm from 'realm';

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
      food: 'Food',
      amount: 'float',
      inMeal: {type: 'bool', default: false},
    },
  };
}

class Meal extends Realm.Object {
  static schema = {
    name: 'Meal',
    properties: {
      timestamp: 'string',
      entries: 'FoodEntry[]',
    },
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

export {
  User,
  Food,
  FoodEntry,
  Meal,
  Configuration,
  ExercicesInfo,
  GlucoseInfo,
  InsulinInfo,
};
