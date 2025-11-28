export interface JalaliDate {
    year: number;    // e.g., 1403
    month: number;   // 1-12
    day: number;     // 1-31
}

// For display purposes
export interface DateDisplay {
    jalali: string;      // "1403/09/08"
    gregorian: Date;     // JavaScript Date object
    dayName: string;     // "شنبه"
    monthName: string;   // "آذر"
}