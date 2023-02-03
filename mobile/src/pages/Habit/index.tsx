import { View, ScrollView, Text, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { DayInfoProps, HabitProps as HabitParamsProps } from './types'
import { BackButton } from '../../components/BackButton'
import dayjs from 'dayjs'
import { ProgressBar } from '../../components/ProgressBar'
import { CheckBox } from '../../components/CheckBox'
import { api } from '../../lib/axios'
import { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'
import { generateProgressPercentege } from '../../utils/generate-progress-percentege'
import { HabitsEmpty } from '../../components/HabitsEmpty'
import clsx from 'clsx'

export function Habit() {

  const [isLoading, setIsLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  const habitsProgress = dayInfo?.possibleHabits.length 
  ? generateProgressPercentege(dayInfo.possibleHabits.length, completedHabits.length) 
  : 0
  
  const route = useRoute()
  const { date } = route.params as HabitParamsProps 
  
  const parsedDate = dayjs(date)
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
  
  const dayOfWeek = parsedDate.format('dddd') // extrai o dia da semana escrito por extenso
  const dayOfMonth = parsedDate.format('DD/MM')

  const fetchHabit = async () => {
    try {
      setIsLoading(true)
      
      const { data } = await api.get('/day', { params: { date } })
      setDayInfo(data)
      setCompletedHabits(data.completedHabits)
      
    } catch (error: any) {

      console.error(error.name)
      console.info(error.message)      

      const { alert } = Alert

      alert('Ops', 'Não foi possível carregar as informações dos hábitos.')
    }finally{
      setIsLoading(false)
    }
  }

  const handleToggleHabits = async (habitId: string) => {
    try {
      await api.patch(`/habits/${habitId}/toggle`)
      
      if(completedHabits.includes(habitId)) {
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
      }else{
        setCompletedHabits(prevState => [...prevState, habitId])
      }
      
    } catch (error) {
      console.log(error)  
      const { alert } = Alert
      
      alert('Ops', 'Não foi possivel atualizar o status do hábito.')
      
    }finally{
      console.log('foi')
    }
  }

  useEffect(() => {
    fetchHabit()
  }, [])

  if(isLoading) {
    return <Loading />
  }
  
  return (
    <View className='flex-1 text-white bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom:100 }}
      >
        <BackButton />

        <Text className='mt-6 text-zinc-400 font-semibold lowercase'>
          { dayOfWeek }
        </Text>

        <Text className='text-white font-extrabold text-3xl'>
          { dayOfMonth }
        </Text>

        <ProgressBar  
          progress={habitsProgress}
        />
        
        <View className={clsx('mt-6', {
          ['opacity-50']: isDateInPast
        })}>

          { dayInfo?.possibleHabits ? 
            dayInfo?.possibleHabits.map(habit => {
            return (
              <CheckBox 
                key={habit.id}
                title={habit.title}
                disabled={isDateInPast}
                isChecked={completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabits(habit.id)}
              />
            ) 
          }) : <HabitsEmpty /> }
          
        </View>

        { isDateInPast ? (
          <Text className='text-white mt-10 text-center'>
            Você não pode editar um hábitos de uma data passada
          </Text>
        ) : null }
        
      </ScrollView>
    </View>
  )
}