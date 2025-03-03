import React, { useState } from "react";
import BackendConfigModel from "../models/backendConfig.model";
import ParamTypeVetementsModel from "../models/params/paramTypeVetements.model";
import ParamTailleVetementsModel from "../models/params/paramTailleVetements.model";
import DressingModel from "../models/dressing.model";
import ParamUsageVetementsModel from "../models/params/paramUsageVetements.model";
import ParamEtatVetementsModel from "../models/params/paramEtatVetements.model";


/**
 * Contexte de la partie applicative, partageable dans toute l'application
 */
type AppContextType = {
    backendConnexionData: BackendConfigModel | undefined;
    setBackendConnexionData: React.Dispatch<React.SetStateAction<BackendConfigModel | undefined>>;
    
    typeVetements: ParamTypeVetementsModel[];
    setTypeVetements: React.Dispatch<React.SetStateAction<ParamTypeVetementsModel[] | []>>;

    taillesMesures: ParamTailleVetementsModel[];
    setTaillesMesures: React.Dispatch<React.SetStateAction<ParamTailleVetementsModel[] | []>>;

    usages: ParamUsageVetementsModel[];
    setUsages: React.Dispatch<React.SetStateAction<ParamUsageVetementsModel[] | []>>;

    etats: ParamEtatVetementsModel[];
    setEtats: React.Dispatch<React.SetStateAction<ParamEtatVetementsModel[] | []>>;

    dressings: DressingModel[] | []; 
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
    const [taillesMesures, setTaillesMesures]               = useState<ParamTailleVetementsModel[]>([]);
    const [usages, setUsages]                               = useState<ParamUsageVetementsModel[]>([]);
    const [etats, setEtats]                                 = useState<ParamEtatVetementsModel[]>([]);

    const [dressings, setDressings]                         = useState<DressingModel[]>([]);


    const contextValue = React.useMemo(() => ({
        backendConnexionData,
        setBackendConnexionData,
        dressings,
        setDressings,
        typeVetements,
        setTypeVetements,
        taillesMesures,
        setTaillesMesures,
        usages,
        setUsages,
        etats,
        setEtats
    }), [
        backendConnexionData,
        typeVetements,
        taillesMesures,
        usages,
        dressings,
        etats
    ]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}
