import { Geisha } from "./geisha";

export interface Filter {
    geisha?: Geisha,
    walletAddress?: string,
    offset: number,
    limit: number,
}
