// Fonction de tri alphanumérique
export function alphanumSort(a: string, b: string) {
    return a.localeCompare(b, 'fr', { numeric: true });
}