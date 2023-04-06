import {
  readGlucoses,
  readInsulins,
  updateGlucose,
  updateInsulin,
} from '../../../backend/realm/CRUD';
import {realmOpen} from '../../../backend/realm/utils';

export const HealthService = {
  updataGlucoseData: async () => {
    try {
      const realm = await realmOpen();
      await updateGlucose(realm);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  updateInsulinData: async () => {
    try {
      const realm = await realmOpen();
      await updateInsulin(realm);
    } catch (e) {
      console.error('Error updating insulin data:', e);
    }
  },

  getGlucoseData: async () => {
    try {
      const realm = await realmOpen();
      let glucoseData = await readGlucoses(realm);
      if (glucoseData !== null) {
        await updateGlucose(realm);
        glucoseData = await readGlucoses(realm);
      }
      return glucoseData;
    } catch (error) {
      console.log('Error retrieving glucose data:', error);
      return null;
    }
  },

  getInsulinData: async () => {
    try {
      const realm = await realmOpen();

      const insulinData = await readInsulins(realm);

      return insulinData;
    } catch (error) {
      console.log('Error retrieving insulin data:', error);
      return null;
    }
  },
};
