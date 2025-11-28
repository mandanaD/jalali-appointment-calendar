import {useState} from "react";
import MonthDisplay from "./MonthDisplay.tsx";
import CalenderHeader from "./CalenderHeader.tsx";


const Calender = () => {
    const today = new Date();

    const [currentDate, setCurrentDate] = useState(today);

    return (
        <div className={"w-full space-y-4"}>
            <CalenderHeader today={today} currentDate={currentDate} setCurrentDate={setCurrentDate}/>
            <MonthDisplay today={today} currentDate={currentDate}/>
        </div>
    )
}
export default Calender;
