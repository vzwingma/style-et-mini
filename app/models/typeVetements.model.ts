/**
 * Modèle représentant un type de vetements
 */
class TypeVetementsModel {
    readonly _id: string;
    readonly libelle: string;

    /**
     * Constructeur
     */
    constructor({ _id, libelle}: TypeVetementsModel) {
        this._id = _id;
        this.libelle = libelle;
    }
}
export default TypeVetementsModel;