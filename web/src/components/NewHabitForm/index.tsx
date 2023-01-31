import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from "phosphor-react";
import { FormEvent } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { api } from '../../lib/axios';

export function NewHabitForm() {

  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ]

  const handleCreateNewHabit = async (event: FormEvent) => {
    event.preventDefault()

    if(!title || weekDays.length === 0) {
      return toast.error('Inform um título e um dua da semana.')
    }

    const userData = {
      title,
      weekDays
    }
    
    await api.post('habits', userData)

    setTitle('')
    setWeekDays([])

    toast.success('Hábito criado com sucesso!')
  }

  const handleToggleWeekDay = (weekDay: number) => {
    if(weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)

      setWeekDays(weekDaysWithRemovedOne)
    }else{
      const weekDaysWithAddedOne = [...weekDays, weekDay]

      setWeekDays(weekDaysWithAddedOne)
    }
  }
  
  return (
    <form onSubmit={handleCreateNewHabit} className="w-full flex flex-col mt-6">
      <label 
        htmlFor="title" 
        className="font-semibold leading-tight"
      >
        Qual seu comprometimento?
      </label>
      <input 
        type="text" 
        id="title"
        placeholder="ex:. Exercícios, dormir bem, etc..."
        className="
          p-4 rounded-lg 
          mt-3 
          bg-zinc-800 
          text-white 
          placeholder:text-zinc-400
        "
        value={title}
        onChange={event => setTitle(event.target.value)}
        autoFocus
      />

      <label 
        htmlFor="" 
        className="font-semibold leading-tight mt-4"
      >
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        { availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root 
              key={weekDay}
              checked={weekDays.includes(index)}
              className='flex items-center gap-3 group'
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className='
                  h-8 w-8 
                  rounded-lg 
                  flex 
                  items-center 
                  justify-center
                  bg-zinc-900
                  border-2
                  border-zinc-800
                  group-data-[state=checked]:bg-green-500
                  group-data-[state=checked]:border-green-500
                '
              >
                <Checkbox.Indicator>
                  <Check size={20} 
                    className='text-white' 
                  />
                </Checkbox.Indicator>

              </div>

              <span className='
                  text-white 
                  leading-tight
                '
              >
                {weekDay}
              </span>
            </Checkbox.Root>
          )
        }) }
      </div>


      <button 
        type="submit" 
        className="
          mt-6 
          rounded-lg 
          p-4 
          flex 
          items-center 
          gap-3 
          font-semibold 
          bg-green-600 
          justify-center 
          hover:bg-green-500
          "
        >
        <Check size={20} weight='bold' />
        Confirmar
      </button>
    </form>
  )
}