import React, { JSX, useState } from "react";
import BackendConfigModel from "../models/backendConfig.model";
import DressingModel from "../models/dressing.model";
import ParamGenericVetementsModel from "../models/params/paramGenericVetements.model";
import { Tabs } from "../constants/TabsEnums";


/**
 * Contexte de la partie applicative, partageable dans toute l'application
 */
type AppContextType = {
    backendConnexionData: BackendConfigModel | undefined;
    setBackendConnexionData: React.Dispatch<React.SetStateAction<BackendConfigModel | undefined>>;
    
    typeVetements: ParamGenericVetementsModel[];
    setTypeVetements: React.Dispatch<React.SetStateAction<ParamGenericVetementsModel[] | []>>;

    taillesMesures: ParamGenericVetementsModel[];
    setTaillesMesures: React.Dispatch<React.SetStateAction<ParamGenericVetementsModel[] | []>>;

    usages: ParamGenericVetementsModel[];
    setUsages: React.Dispatch<React.SetStateAction<ParamGenericVetementsModel[] | []>>;

    marques: ParamGenericVetementsModel[];
    setMarques: React.Dispatch<React.SetStateAction<ParamGenericVetementsModel[] | []>>;

    etats: ParamGenericVetementsModel[];
    setEtats: React.Dispatch<React.SetStateAction<ParamGenericVetementsModel[] | []>>;

    dressings: DressingModel[] | []; 
    setDressings: React.Dispatch<React.SetStateAction<DressingModel[] | []>>;

    modalDialog: JSX.Element | null;
    setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>;

    activeTab: Tabs;
    setActiveTab: React.Dispatch<React.SetStateAction<Tabs>>;
};


export const AppContext = React.createContext<AppContextType | null>(null);


/**
 * App context provider
 * @returns  provider
 */
export function AppContextProvider({ children }: Readonly<{ children: React.ReactNode }>) : JSX.Element {
    const [backendConnexionData,    setBackendConnexionData]   = useState<BackendConfigModel>();  // State to store the response data

    const [typeVetements,           setTypeVetements]          = useState<ParamGenericVetementsModel[]>([]);
    const [taillesMesures,          setTaillesMesures]         = useState<ParamGenericVetementsModel[]>([]);
    const [usages,                  setUsages]                 = useState<ParamGenericVetementsModel[]>([]);
    const [marques,                 setMarques]                = useState<ParamGenericVetementsModel[]>([]);
    const [etats,                   setEtats]                  = useState<ParamGenericVetementsModel[]>([]);

    const [dressings, setDressings]                             = useState<DressingModel[]>([]);

    const [modalDialog, setModalDialog]                         = useState<JSX.Element | null>(null);
    const [activeTab, setActiveTab]                             = useState<Tabs>(Tabs.INDEX);

    const contextValue = React.useMemo(() => ({
        backendConnexionData,
        setBackendConnexionData,
        dressings,
        setDressings,
        typeVetements,
        setTypeVetements,
        taillesMesures,
        setTaillesMesures,
        marques,
        setMarques,
        usages,
        setUsages,
        etats,
        setEtats,

        modalDialog,
        setModalDialog,
        activeTab,
        setActiveTab
    }), [
        backendConnexionData,
        typeVetements,
        taillesMesures,
        marques,
        usages,
        dressings,
        etats,
        modalDialog,
        activeTab
    ]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}
