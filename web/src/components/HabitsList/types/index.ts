export interface HabitsListProps {
  date: Date
  onCompletedChanged: (completed: number) => void
}

export interface HabitsInfo {
  possibleHabits: Array<{
    id: string,
    title: string,
    created_at: string,
  }>,
  completedHabits: string[]
}