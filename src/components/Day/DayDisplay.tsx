import {format, isSameDay} from "date-fns-jalali";
import {generateTimeSlot} from "../generateTimeSlots.ts";

const DayDisplay = ({currentDate, today}: {
    currentDate: Date;
    today: Date;
}) => {

    const timeSlots = generateTimeSlot()
    const isToday = isSameDay(currentDate, today)

    return (
        <div className="border border-gray-300/60 rounded-xl overflow-hidden w-full">
            <div className="grid border-b border-gray-300/60"
                 style={{gridTemplateColumns: `80px repeat(1, 1fr)`}}>
                <div className="border-l border-gray-300/60"/>
                <div
                    className={` border-gray-300/60 py-4 text-center`}
                >
                    <div className="text-sm font-medium">
                        {format(currentDate, 'EEEE d MMMM')}
                    </div>
                </div>
                <div>
                    {timeSlots.map((timeStep, index) => (
                        <div
                            key={index}
                            className={`h-10 border border-gray-300/60 p-1 text-sm text-center`}>
                            {timeStep.display}
                        </div>
                    ))}
                </div>
                <div className="border-l border-gray-300/60 relative">
                    {timeSlots.map((timeStep, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                console.log(currentDate, timeStep)
                            }}
                            className={`h-10 border-y border-gray-300/60 ${isToday && "bg-blue-100"}`}/>
                    ))}
                </div>

            </div>
        </div>
    )
}
export default DayDisplay;