import { useState } from 'react'
import { 
  View, 
  ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { BackButton } from '../../components/BackButton'
import { CheckBox } from '../../components/CheckBox'
import colors from 'tailwindcss/colors'
import { api } from '../../lib/axios'

export function New() {

  const [weekDays, setWeekDays] = useState<number[]>([])
  const [title, setTitle] = useState('')

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if(weekDays.includes(weekDayIndex)) {
      setWeekDays(
        prevState => prevState.filter(weekDay => weekDay !== weekDayIndex
      ))
    }else{
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  const handleCreateNewHabits = async () => {
    try {
      if(!title.trim() || weekDays.length === 0) {
        Alert.alert('Novo hábito', "Informe o nome do hábito e escolha a periodicidade.")
      }

      const userData = {
        title,
        weekDays
      }
      
      await api.post('/habits', { userData })
      
      setTitle('')
      setWeekDays([])

      Alert.alert('Hábito', 'Novo hábito criado com sucesso!')
      
    } catch (error: any) {
      console.error(error.message)
      Alert.alert('Ops', 'Não foi possível')
    }
  }
  
  const availableWeekDays = [
    'Domingo', 
    'Segunda-feira', 
    'Terça-feira', 
    'Quarta-feira', 
    'Quinta-feira', 
    'Sexta-feira', 
    'Sábado'
  ]
  
  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className='mt-6 text-white font-extrabold text-3xl'>
          Criar hábito
        </Text>

        <Text 
          className='
            mt-6 
            text-white 
            font-semibold 
            text-base
          '
        >
          Qual o seu comprometimento?
        </Text>

        <TextInput 
          className='
            h-12 
            pl-4 rounded-lg 
            mt-3 
            bg-zinc-900 
            text-white 
            border-2 
            border-zinc-800
            focus:border-green-600
          '
          onChangeText={text => setTitle(text)}
          value={title}
          placeholder='ex:. Exercicío, dormir bem, etc...'
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className='font-semibold mt-4 mb-3 text-white text-base'>
          Qual a recorrência?
        </Text>

        { availableWeekDays.map((weekDay, index) => {
          return (
            <CheckBox 
              key={weekDay}
              title={weekDay} 
              isChecked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />

          )
        }) }

        <TouchableOpacity 
          className='
            text-white
            w-full
            h-14
            flex-row
            items-center
            justify-center
            bg-green-600
            rounded-md 
            mt-6
          '
          activeOpacity={.7}
          onPress={handleCreateNewHabits}
        >
          <Feather 
            size={20} 
            color={colors.white}
            name='check'
          />
          <Text className='font-semibold text-base text-white ml-2'>
            Confirmar
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}