import Realm from 'realm';
import RNFS from 'react-native-fs';
import schemas from './schemas';

async function getRealmPath() {
    const appDir = await RNFS.DocumentDirectoryPath;
    return `${appDir}/my.realm`;
}

export async function isRealmFileExists(filePath) {
    console.log("Checks if realm file exists...");
    try {
        const exists = await RNFS.exists(filePath);
        return exists;
    } catch (error) {
        console.error(`Failed to check if the Realm file exists: ${filePath}`, error);
        return false;
    }
}

export async function realmOpen() {
    try {
        const realmPath = await getRealmPath();
        console.log("Opening Realm... ",new Date());
        const realm = await Realm.open({
            path: realmPath,
            schema: schemas,
        });
        return realm;
    } catch (error) {
        console.error('Error opening realm:', error);
        throw error;
    }
}

export async function deleteRealmFile() {
    try {
        const realmPath = await getRealmPath();
        const exists = await RNFS.exists(realmPath);

        if (exists) {
            // Close the Realm if it's open
            if (Realm.defaultPath === realmPath) {
                await Realm.default.realm.close();
            }

            // Delete the Realm file
            await RNFS.unlink(realmPath);

            console.log('Realm file deleted');
        } else {
            console.log('Realm file does not exist, no need to delete');
        }
    } catch (error) {
        console.error('Error deleting Realm file:', error);
        throw error;
    }
}