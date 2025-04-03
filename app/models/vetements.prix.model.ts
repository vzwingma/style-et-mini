/**
 * Modèle représentant les prix d'un vetement
 */
export default interface VetementPrixModel {
  readonly achat : number | null,
  readonly neuf  : number | null
}