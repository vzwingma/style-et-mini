import React, { useState } from "react";
import BackendConfigModel from "../models/backendConfig.model";
import ParamTypeVetementsModel from "../models/paramTypeVetements.model";
import TailleVetementsModel from "../models/paramTailleVetements.model";
import DressingModel from "../models/dressing.model";


/**
 * Contexte de la partie applicative, partageable dans toute l'application
 */
type AppContextType = {
    backendConnexionData: BackendConfigModel | undefined;
    setBackendConnexionData: React.Dispatch<React.SetStateAction<BackendConfigModel | undefined>>;
    
    typeVetements: ParamTypeVetementsModel[] | undefined;
    setTypeVetements: React.Dispatch<React.SetStateAction<ParamTypeVetementsModel[] | []>>;

    taillesMesures: TailleVetementsModel[] | undefined;
    setTaillesMesures: React.Dispatch<React.SetStateAction<TailleVetementsModel[] | []>>;

    dressings: DressingModel[] | undefined; 
    setDressings: React.Dispatch<React.SetStateAction<DressingModel[] | []>>;
};


export const AppContext = React.createContext<AppContextType | null>(null);


/**
 * App context provider
 * @returns  provider
 */
export function AppContextProvider({ children }: Readonly<{ children: React.ReactNode }>) : JSX.Element {
    const [backendConnexionData, setBackendConnexionData]   = useState<BackendConfigModel>();  // State to store the response data
    const [typeVetements, setTypeVetements]                 = useState<ParamTypeVetementsModel[]>([]);
    const [taillesMesures, setTaillesMesures]               = useState<TailleVetementsModel[]>([]);
    const [dressings, setDressings]                         = useState<DressingModel[]>([]);


    const contextValue = React.useMemo(() => ({
        backendConnexionData,
        setBackendConnexionData,
        dressings,
        setDressings,
        typeVetements,
        setTypeVetements,
        taillesMesures,
        setTaillesMesures
    }), [
        backendConnexionData,
        typeVetements,
        taillesMesures,
        dressings
    ]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}
