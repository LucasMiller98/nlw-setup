import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, ScrollView, Alert } from "react-native";
import { DAY_SIZE, HabitDay } from "../../components/HabitDay";
import { Header } from "../../components/Header";
import { api } from '../../lib/axios'
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning";
import { Loading } from '../../components/Loading'
import { useState, useCallback } from "react";
import { SummaryProps } from './types'
import dayjs from "dayjs";

export function Home() {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [summary, setSummary] = useState<SummaryProps | null>(null)

  const { navigate } = useNavigation()

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const dateFromYearStart = generateDatesFromYearBeginning()

  const minimumSummaryDatesSizes = 18 * 5
  const amountOfDaysToFill = minimumSummaryDatesSizes - dateFromYearStart.length

  async function fetchData() {
    try {

      setIsLoading(true)

      const response = await api.get('/summary') 

      console.log(response.data)

      setSummary(response.data)

    } catch (error: any) {
      
      Alert.alert('Ops! Não foi possível carregar a tabela de hábitos')
      
      console.error(error.name)

    }finally{
      setIsLoading(false)
    }
  }
  
  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))
  
  if(isLoading) {
    return <Loading />
  }
  
  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <Header />

      <View className="flex-row mt-6 mb-2">
        { weekDays.map((weekDay, index) => {
          
          return (
            <Text 
              key={`${weekDay} - ${index}`}
              className='text-zinc-400 text-xl font-bold text-center mx-1'
              style={{ width: DAY_SIZE }}
            >
              { weekDay }
            </Text>
          )
        }) }
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        { summary &&

          <View className="flex-row flex-wrap">
            { dateFromYearStart.map((date, index) => { 
              
              const dayWithHabits = summary.find(day => {
                return dayjs(date).isSame(day.date, 'day')
              })
              
              return (
                <HabitDay 
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  key={date.toISOString()}
                  onPress={() => navigate('habit', { date: date.toISOString() })}
                />
              )
            }) }

            { amountOfDaysToFill > 0 ? Array
              .from({ length: amountOfDaysToFill }) 
              .map((_, index) => {
                return (
                  <View 
                    key={index}
                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40" 
                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  />
                )
            }) : null }
          </View>
        } 
        
      </ScrollView>

    </View>
  )
}