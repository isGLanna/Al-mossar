import { GrFormNext, GrFormPrevious } from "../icons"
import { TimeUtils } from "../../../../models/TimeUtils"

interface CalendarProps {
  currentMonth: number
  currentYear: number
  selectedDay: number
  onMonthChange: (year: number, month: number) => void
  onDaySelect: (day: number) => void
}

export function Calendar({
  currentMonth,
  currentYear,
  selectedDay,
  onMonthChange,
  onDaySelect
}: CalendarProps) {
  const week = ["D", "S", "T", "Q", "Q", "S", "S"]

  const daysArray = TimeUtils.getDaysArray(currentYear, currentMonth)

  const getMonthName = (month: number) => {
    return new Date(0, month).toLocaleString("default", { month: "long" })
  }

  const handlePrevMonth = () => {
    const { year, month } = TimeUtils.getPrevMonth(currentYear, currentMonth)
    onMonthChange(year, month)
  }

  const handleNextMonth = () => {
    const { year, month } = TimeUtils.getNextMonth(currentYear, currentMonth)
    onMonthChange(year, month)
  }

  return (
    <article className="calendar">
      <header className="header">
        <button onClick={handlePrevMonth}>
          <GrFormPrevious size={25} />
        </button>
        <span>
          {getMonthName(currentMonth)} / {currentYear}
        </span>
        <button onClick={handleNextMonth}>
          <GrFormNext size={25} />
        </button>
      </header>

      <div className="week">
        {week.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="days">
        {daysArray.map((day, index) =>
          day ? (
            <button
              key={day}
              className={`day ${day === selectedDay ? "selected" : ""}`}
              onClick={() => onDaySelect(day)}
            >
              {day}
            </button>
          ) : (
            <div key={`empty-${index}`} className="empty" />
          )
        )}
      </div>
    </article>
  )
}
