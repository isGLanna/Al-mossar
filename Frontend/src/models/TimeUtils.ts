export class TimeUtils {
  private date!: Date

  construct(date: Date = new Date()) {
    this.date = date
  }

  getDay(): number {
    return this.date.getDate()
  }

  getMonth(): number {
    return this.date.getMonth()
  }

  getYear(): number {
    return this.date.getFullYear()
  }

  static getDaysInMonth(year:number, month:number): number{
    return new Date(year, month + 1, 0).getDate();
  }

  static getMonthName(month: number, locale: string = "default"): string {
    return new Date(0, month).toLocaleString(locale, {month: "long" })
  }

  static getFirstDayIndex(year: number, month: number): number {
    return new Date(year, month, 1).getDay()
  }

  static getDaysArray(year: number, month: number): (number | null)[] {
    const daysInMonth = this.getDaysInMonth(year, month)
    const fistDayIndex = this.getFirstDayIndex(year, month)

    return [
      ...Array(fistDayIndex).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
    ]
  }

  // Retorna mês anterior
  static getPrevMonth(year: number, month: number): { year:number, month:number } {
    return month === 0 ? { year: year - 1, month: 11} : { year, month: month - 1}
  }

  static getNextMonth(year: number, month: number): { year:number, month:number } {
    return month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1}
  }


}