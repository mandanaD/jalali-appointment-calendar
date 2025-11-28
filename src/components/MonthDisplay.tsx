import {eachDayOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek} from "date-fns-jalali";
import {gregorianMonths, WEEK_DAYS} from "../constans/calender.ts";

const MonthDisplay = ({currentDate, today}: {
    currentDate: Date;
    today: Date;
}) => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);

    const monthStartWeek = startOfWeek(start, {weekStartsOn: 6}); // Saturday = 6

    const monthEndWeek = endOfWeek(end, {weekStartsOn: 6});

    const gridDays = eachDayOfInterval({
        start: monthStartWeek,
        end: monthEndWeek,
    });


    return (
        <div className="grid grid-cols-7 border border-gray-300/60 rounded-xl overflow-hidden">
            {WEEK_DAYS.map(d => (
                <div key={d.key} className="py-3 text-center text-base">{d.name}</div>
            ))}
            {gridDays.map((day) => {
                const isCurrentMonth =
                    format(day, "MM") === format(currentDate, "MM");
                const isCurrentDay =
                    format(day, "dd") === format(today, "dd");

                return (
                    <div
                        key={day.toISOString()}
                        className={`
          h-24 border border-gray-300/60 p-1 text-sm flex justify-between
          ${isCurrentMonth ? "" : "bg-gray-100 text-gray-400"}
          ${(today.toISOString().slice(0, 10)===currentDate.toISOString().slice(0, 10))&&isCurrentDay ? "!bg-blue-100 !text-blue-400" : ""}
        `}>
                        <span>
                        {format(day, "dd")}
                        </span>
                        <span>
                        {day.getDate()}
                            {gregorianMonths[day.getMonth()]}
                        </span>
                    </div>
                );
            })}
        </div>
    )
}
export default MonthDisplay;