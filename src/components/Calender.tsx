import {useState} from "react";
import MonthDisplay from "./Month/MonthDisplay.tsx";
import CalenderHeader from "./CalenderHeader.tsx";
import type {ViewMode} from "../types/calendar.types.ts";
import WeekDisplay from "./Week/WeekDisplay.tsx";


const Calender = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [view, setView] = useState<ViewMode>("month");

    return (
        <div className={"w-full space-y-4"}>
            <CalenderHeader setView={setView} view={view} today={today} currentDate={currentDate}
                            setCurrentDate={setCurrentDate}/>
            {
                view === "month" ? (
                    <MonthDisplay today={today} currentDate={currentDate}/>
                ) : (
                    view === "week" && (
                        <WeekDisplay today={today} currentDate={currentDate}/>
                    )
                )
            }
        </div>
    )
}
export default Calender;
