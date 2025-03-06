export interface EchoData {
    category: string;
    cost: number;
    image: string;
    name: string;
    type: string;
    lastUsed: number;
    lastLearned: number;
    timesUsed: number;
    startingOrder: number;
}

export enum SortType {
    LastUsed = "Last Used",
    MostUsed = "Most Used",
    LastLearned = "Last Learned",
    Cost = "Cost",
    Type = "Type",
}