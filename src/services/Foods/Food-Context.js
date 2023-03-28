import React, {createContext, useEffect, useRef, useState,} from "react";
import {collection, getDocs,} from 'firebase/firestore';
import {db} from '../firebase'
import {RandomVitals} from "../RandomGen";
import {CalculateWarnings, initialiseWarnings} from "../../Features/Room/Component/patientAlerts";

export const FoodContext = createContext();


export const FoodContextProvider = ({children}) => {



    return (
        <FoodContext.Provider
            value={{
                rooms,
                lastUpdated,
                warnings
            }}
        >
            {children}
        </FoodContext.Provider>
    );
};
