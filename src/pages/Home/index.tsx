import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import {
  HomeContainer,
  FormContainer,
  CountDownContainer,
  Separator,
  StartCountdownButton,
  MinutesAmountInput,
  TaskInput,
} from './styles'

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  const handleCreateNewCycle = (data: any) => {
    console.log('submit data', data)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestion"
            placeholder="Dê um nome ao projeto"
            {...register('task')}
          />

          <datalist id="task-suggestion">
            <option value="galo 1" />
            <option value="galo 2" />
            <option value="Limanha de ferro" />
            <option value="Dancing" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
