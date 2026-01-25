import { GrFormNext, GrFormPrevious } from "../../style/icons"
import { TimeUtils } from "../../../../../models/TimeUtils"
import { DaysGrid } from "../../../../molecules/days-grid/days-grid"
import { useMemo } from 'react'
import "./_calendar.scss"

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

  const week = [
    { label: "D", id: "sun" },
    { label: "S", id: "mon" },
    { label: "T", id: "tue" },
    { label: "Q", id: "wed" },
    { label: "Q", id: "thu" },
    { label: "S", id: "fri" },
    { label: "S", id: "sat" }
  ]


  const daysArray = useMemo(() => TimeUtils.getDaysArray(currentYear, currentMonth), [currentMonth, currentYear])

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

      <div className="days __week">
        {week.map((day) => (
          <div key={day.id}>{day.label}</div>
        ))}
      </div>

      <DaysGrid
        daysArray={daysArray}
        selectedDay={selectedDay}
        onDaySelect={onDaySelect}
      />
      
    </article>
  )
}
