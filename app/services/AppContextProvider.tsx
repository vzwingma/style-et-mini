import React, { useState } from "react";
import BackendConfig from "../components/models/appConfig.model";


/**
 * Contexte de la partie budget
 */
type AppContextType = {
    backendConnexionData: BackendConfig | undefined;
    setBackendConnexionData: React.Dispatch<React.SetStateAction<BackendConfig | undefined>>;
};


export const AppContext = React.createContext<AppContextType | null>(null);


/**
 * App context provider
 * @returns  provider
 */
export function AppContextProvider({ children }: Readonly<{ children: React.ReactNode }>) : JSX.Element {
    const [backendConnexionData, setBackendConnexionData]       = useState<BackendConfig>();  // State to store the response data
    const contextValue = React.useMemo(() => ({
        backendConnexionData,
        setBackendConnexionData,
    }), [
        backendConnexionData,
    ]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}
