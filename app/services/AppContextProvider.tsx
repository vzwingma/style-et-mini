import React, { useState } from "react";
import BackendConfigModel from "../models/backendConfig.model";
import TypeVetementsModel from "../models/typeVetements.model";


/**
 * Contexte de la partie applicative, partageable dans toute l'application
 */
type AppContextType = {
    backendConnexionData: BackendConfigModel | undefined;
    setBackendConnexionData: React.Dispatch<React.SetStateAction<BackendConfigModel | undefined>>;
    typeVetements: TypeVetementsModel[] | undefined;
    setTypeVetements: React.Dispatch<React.SetStateAction<TypeVetementsModel[] | []>>;
};


export const AppContext = React.createContext<AppContextType | null>(null);


/**
 * App context provider
 * @returns  provider
 */
export function AppContextProvider({ children }: Readonly<{ children: React.ReactNode }>) : JSX.Element {
    const [backendConnexionData, setBackendConnexionData]   = useState<BackendConfigModel>();  // State to store the response data
    const [typeVetements, setTypeVetements]                 = useState<TypeVetementsModel[]>([]);


    const contextValue = React.useMemo(() => ({
        backendConnexionData,
        setBackendConnexionData,
        typeVetements,
        setTypeVetements
    }), [
        backendConnexionData,
        typeVetements
    ]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}
