import {addDays, addMonths, addWeeks, format, subDays, subMonths, subWeeks, newDate} from "date-fns-jalali";
import {ChevronLeft, ChevronRight} from "lucide-react";
import type {ViewMode} from "../types/calendar.types.ts";
import type {Dispatch, SetStateAction} from "react";
import {JALALI_MONTH} from "../constans/calender.ts";


const CalenderHeader = ({currentDate, today, setCurrentDate, view, setView}: {
    currentDate: Date,
    setCurrentDate: Dispatch<SetStateAction<Date>>,
    today: Date,
    view: ViewMode,
    setView: (view: ViewMode) => void,
}) => {

    const currentYear = Number(format(today, "yyyy"));

    const jalaliYears = Array.from({length: 12}, (_, i) => ({
        value: (currentYear + i).toString(),
        label: (currentYear + i).toString(),
    }))

    const goNext = () =>
        setCurrentDate(prev =>
            view === "month" ? addMonths(prev, 1)
                : view === "week" ? addWeeks(prev, 1)
                    : addDays(prev, 1)
        );

    const goPrev = () =>
        setCurrentDate(prev =>
            view === "month" ? subMonths(prev, 1)
                : view === "week" ? subWeeks(prev, 1)
                    : subDays(prev, 1)
        );

    const goTo = ({year, month}: { year?: number, month?: number }) => {
        const newYear = year ?? Number(format(currentDate, "yyyy"));
        const newMonth = month !== undefined ? month - 1 : Number(format(currentDate, "M"));
        const day = Number(format(currentDate, "dd"));
        const newVal = newDate(newYear, newMonth, day);
        console.log(newYear, newMonth, day);
        console.log(newVal);
        setCurrentDate(newVal)
    };

    return (
        <div className={"flex flex-col sm:flex-row sm:justify-between flex-wrap gap-4 sm:items-center"}>
            <div className={"sm:inline flex justify-between  gap-4"}>
                <h1 className={"text-lg font-semibold"}>
                    تقویم
                </h1>
                <select
                    className="select inline sm:hidden max-w-20"
                    value={view}
                    onChange={(e) => setView(e.target.value as ViewMode)}
                >
                    <option value={"day"}>
                        روز
                    </option>
                    <option value={"week"}>
                        هفته
                    </option>
                    <option value={"month"}>
                        ماه
                    </option>
                </select>
            </div>
            <div className="flex items-center sm:gap-4">
                {/* View selector */}
                <div className=" sm:inline hidden tabs tabs-box">
                    <input
                        type="radio"
                        name="view"
                        className="tab"
                        aria-label="ماه"
                        checked={view === "month"}
                        onChange={() => setView("month")}
                    />
                    <input
                        type="radio"
                        name="view"
                        className="tab"
                        aria-label="هفته"
                        checked={view === "week"}
                        onChange={() => setView("week")}
                    />
                    <input
                        type="radio"
                        name="view"
                        className="tab"
                        aria-label="روز"
                        checked={view === "day"}
                        onChange={() => setView("day")}
                    />
                </div>

                {/* Today buttons */}
                <button className="btn " onClick={() => setCurrentDate(today)}>
                    {view === "month" ? "این ماه" : view === "week" ? "این هفته" : "امروز"}
                </button>

                {/* Navigation */}
                <div className="flex items-center gap-1 sm:gap-3">
                    <button className="btn btn-ghost  sm:btn-md btn-sm" onClick={goPrev}>
                        <ChevronRight className="h-4 w-4"/>
                    </button>

                    {/* YEAR SELECT */}
                    <select
                        className="select"
                        value={Number(format(currentDate, "yyyy"))}
                        onChange={(e) => goTo({year: Number(e.target.value)})}
                    >
                        {jalaliYears.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.label}
                            </option>
                        ))}
                    </select>

                    {/* MONTH SELECT */}
                    <select
                        className="select"
                        value={Number(format(currentDate, "M"))}
                        onChange={(e) => goTo({month: Number(e.target.value)})}
                    >
                        {JALALI_MONTH.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-ghost sm:btn-md btn-sm" onClick={goNext}>
                        <ChevronLeft className="h-4 w-4"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalenderHeader;
