import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning"
import { HabitDay } from "../HabitDay"
import { Summary } from './types'

export function SummaryTable() {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get('summary').then(result => {
      setSummary(result.data)
    })
  }, [])

  const summaryDates = generateDatesFromYearBeginning()

  const minimumSummaryDatesSize = 18 * 7
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length 

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">

        { weekDays.map((weekDay, index) => {
          return (
            <div key={`${weekDay} - ${index}`} className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">
              { weekDay }
            </div>
          )
        }) }
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        
        { summary.length > 0 ? summaryDates.map(date => {

          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })
          
          return (
            <HabitDay 
              key={date.toString()} 
              date={date}
              amount={dayInSummary?.amount} 
              defaultCompleted={dayInSummary?.completed} 
            />
          )
        }) : null}
        
        { amountOfDaysToFill > 0 ? Array.from({ length: amountOfDaysToFill }).map((_, index) => {
          return (
            <div 
              key={index} 
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          )
        }) : null }
      </div>
    </div>
  )
}