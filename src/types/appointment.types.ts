export interface Appointment {
    id: string;
    title: string;
    description?: string;
    startDate: Date;        // ALWAYS store as Gregorian
    endDate: Date;
    color?: string;         // For visual categorization
    location?: string;
    attendees?: string[];
    category?: 'work' | 'personal' | 'meeting' | 'other';
    reminder?: number;      // minutes before
}

export type AppointmentInput = Omit<Appointment, 'id'>;