import { ParametragesVetementEnum } from "@/app/constants/AppEnum";
import { ImageSourcePropType } from "react-native";

export default interface MenuParametragesModel {
    
    readonly titre         : string;
    readonly icone         : ImageSourcePropType;
    readonly class         : ParametragesVetementEnum;
}
