import {startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, format} from "date-fns-jalali"
import {generateTimeSlot} from "../generateTimeSlots.ts";

const WeekDisplay = ({today, currentDate}: {
    today: Date,
    currentDate: Date,
}) => {
    const startOfTheWeek = startOfWeek(currentDate);
    const endOfTheWeek = endOfWeek(currentDate);
    const daysOfWeek = eachDayOfInterval({start: startOfTheWeek, end: endOfTheWeek})

    const timeSlots = generateTimeSlot()

    return (
        <div className="border border-gray-300/60 rounded-xl overflow-hidden w-full">
            <div className="grid border-b border-gray-300/60 grid-cols-[60px_repeat(7,_1fr)] sm:grid-cols-[80px_repeat(7,_1fr)]">
                <div className="border-l border-gray-300/60"/>
                {daysOfWeek.map((day, i) => {
                    return (
                        <div
                            key={i}
                            className={` border-gray-300/60 py-4 text-center`}
                        >
                            <div className="text-sm font-medium hidden md:inline">
                                {format(day, 'EEEE d MMMM')}
                            </div>
                            <div className="text-sm font-medium md:hidden flex flex-col gap-1">
                                <span className={"hidden sm:inline"}>
                                {format(day, 'EEEE')}
                                </span>
                                <span className={"sm:hidden inline"}>
                                {format(day, 'EEEEE')}
                                </span>
                                <span>
                                {format(day, 'd')}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div>
                    {timeSlots.map((timeStep, index) => (
                        <div
                            key={index}
                            className={`h-8 sm:h-10 border border-gray-300/60 p-1 text-sm text-center`}>
                            {timeStep.display}
                        </div>
                    ))}
                </div>
                {daysOfWeek.map((day) => {
                        const isToday = isSameDay(day, today);
                        return (
                            <div key={day.toISOString()} className="border-l border-gray-300/60 relative">
                                {timeSlots.map((timeStep, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            console.log(day, timeStep)
                                        }}
                                        className={`h-8 sm:h-10 border-y border-gray-300/60 ${isToday && "bg-blue-100"}`}/>
                                ))}
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}
export default WeekDisplay;