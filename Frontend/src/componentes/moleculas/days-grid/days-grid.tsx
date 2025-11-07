import "./days-grid.scss"


interface DaysGridProps {
  daysArray: (number | null) []
  selectedDay: number
  onDaySelect: (day: number) => void
}

export function DaysGrid ({ daysArray, selectedDay, onDaySelect}: DaysGridProps) {
  return (
    <div className="days">
      {daysArray.map((day, index) =>
        day ? (
          <button
            key={day}
            className={selectedDay === day ? "selected" : ""}
            onClick={() => onDaySelect(day)}>
            {day}
          </button>) : (
            <div key={`empty-${index}`}className="empty"></div>
          )
        )}
    </div>
  )
}