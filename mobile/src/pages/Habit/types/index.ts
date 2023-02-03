export interface HabitProps {
  date: string
}

export interface DayInfoProps {
  completedHabits: string[]
  possibleHabits: Array<{
    id: string
    title: string
  }>
}