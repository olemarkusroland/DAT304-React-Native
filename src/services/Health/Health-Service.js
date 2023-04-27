import { readGlucoses, readInsulins } from '../../../backend/realm/CRUD';

export const HealthService = {
    getInsulins: async realm => {
        try {
            const fromDate = new Date();
            fromDate.setDate(fromDate.getDate() - 7); // 1 days ago

            const toDate = new Date();

            let insulinData = await readInsulins(realm, fromDate, toDate);
            //console.log(insulinData);

            if (insulinData === null) {
                return [];
            }

            return insulinData;
        } catch (error) {
            console.log('Error retrieving glucose data:', error);
            return null;
        }
    },

    getGlucoses: async realm => {
        try {
            const fromDate = new Date();
            fromDate.setDate(fromDate.getDate() - 7); // 7 days ago

            const toDate = new Date();

            let glucoseData = await readGlucoses(realm, fromDate, toDate);

            if (glucoseData === null) {
                return [];
            }

            return glucoseData;
        } catch (error) {
            console.log('Error retrieving glucose data:', error);
            return null;
        }
    },
};
