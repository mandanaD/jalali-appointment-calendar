import type {TimeSlot} from "../constans/slot.ts";

export const generateTimeSlot = (
    startHour: number = 7,
    endHour: number = 18,
    steps: number = 20,
) => {
    const timeSlots: TimeSlot[] = []
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += steps) {
            timeSlots.push({
                hour,
                minute,
                display: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
            })
        }
    }
    return timeSlots;
}
