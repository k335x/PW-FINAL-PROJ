export function sortNames(values: string[], order: 'asc' | 'desc'): string[] {
    const sorted = [...values];
    return sorted.sort((a, b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
}

export function sortPrices(values: number[], order: 'asc' | 'desc'): number[] {
    const sorted = [...values];
    return sorted.sort((a, b) => order === 'asc' ? a - b : b - a);
}