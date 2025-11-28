import type {Appointment} from "./appointment.types.ts";

export interface CalendarDay {
    date: Date;                    // Gregorian date
    jalaliDate: string;            // "1403/09/08"
    jalaliDay: number;             // Day number in Jalali
    isCurrentMonth: boolean;       // Gray out other months
    isToday: boolean;              // Highlight today
    isWeekend: boolean;            // Friday styling
    appointments: Appointment[];   // Appointments on this day
}

export type ViewMode = 'month' | 'week' | 'day';

export interface CalendarState {
    currentDate: Date;
    viewMode: ViewMode;
    selectedDate: Date | null;
}