import { View, ScrollView, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { HabitProps as HabitParamsProps } from './types'
import { BackButton } from '../../components/BackButton'
import dayjs from 'dayjs'
import { ProgressBar } from '../../components/ProgressBar'
import { CheckBox } from '../../components/CheckBox'

export function Habit() {

  const route = useRoute()
  const { date } = route.params as HabitParamsProps 

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd') // extrai o dia da semana escrito por extenso
  const dayOfMonth = parsedDate.format('DD/MM')
  
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
          progress={Math.round(Math.random() * 100)}
        />
        
        <View className='mt-6'>
          <CheckBox 
            title='Beber 2L de Água'
          />

          <CheckBox 
            title='Estudar mais JS'
            isChecked
          />

          <CheckBox 
            title='Estudar React Native, ReactJS e NodeJS'
          />

          <CheckBox 
            title='Conseguir um emprego'
          />
        </View>
        
      </ScrollView>
    </View>
  )
}