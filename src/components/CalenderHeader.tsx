import {addDays, addMonths, addWeeks, format, subDays, subMonths, subWeeks} from "date-fns-jalali";
import {ChevronLeft, ChevronRight} from "lucide-react";
import type {ViewMode} from "../types/calendar.types.ts";

const monthsFa = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

const CalenderHeader = ({currentDate, today, setCurrentDate, view, setView}: {
    currentDate: Date,
    setCurrentDate: (date: any) => void,
    today: Date,
    view: ViewMode,
    setView: (view: ViewMode) => void,
}) => {

    const currentYear = Number(format(currentDate, "yyyy"));
    const maxYear = Number(format(today, "yyyy")) + 5;

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
        const newMonth = month !== undefined ? month : Number(format(currentDate, "MM")) - 1;
        const day = Number(format(currentDate, "dd"));
        console.log(new Date(newYear, newMonth, day))
        console.log(month)
        console.log(year)
        console.log(currentDate)

    };

    return (
        <div className="flex items-center gap-4">

            {/* View selector */}
            <div className="tabs tabs-box">
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
            <button className="btn" onClick={() => setCurrentDate(today)}>
                {view === "month" ? "این ماه" : view === "week" ? "این هفته" : "امروز"}
            </button>

            {/* Navigation */}
            <div className="flex items-center gap-3">
                <button className="btn btn-ghost" onClick={goPrev}>
                    <ChevronRight className="h-4 w-4"/>
                </button>

                {/* YEAR INPUT */}
                <input
                    type="number"
                    className="input w-20"
                    min={1400}
                    max={maxYear}
                    value={currentYear}
                    onChange={(e) => {
                        const y = Number(e.target.value);
                        if (!isNaN(y)) goTo({year: Math.min(y, maxYear)});
                    }}
                />

                {/* MONTH SELECT */}
                <select
                    className="select"
                    value={Number(format(currentDate, "MM")) - 1}
                    onChange={(e) => goTo({year: currentDate.getFullYear(), month: Number(e.target.value) - 1})}
                >
                    {monthsFa.map((m, i) => (
                        <option key={i} value={i}>
                            {m}
                        </option>
                    ))}
                </select>

                <button className="btn btn-ghost" onClick={goNext}>
                    <ChevronLeft className="h-4 w-4"/>
                </button>
            </div>
        </div>
    );
};

export default CalenderHeader;
