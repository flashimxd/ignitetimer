import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  HomeContainer,
  FormContainer,
  CountDownContainer,
  Separator,
  StartCountdownButton,
  MinutesAmountInput,
  TaskInput,
  StopCountdownButton,
} from './styles'

import { differenceInSeconds } from 'date-fns'

const STATUS = {
  doing: 'doing',
  done: 'done',
  cancelled: 'cancelled',
} as const

interface NewCycleFormData {
  task: string
  minutesAmount: number
  status: keyof typeof STATUS
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  status: keyof typeof STATUS
  startedDate: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.status === 'doing') || null
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    if (!activeCycle) return

    const interval = setInterval(() => {
      // passed time in seconds
      const diffInSeconds = differenceInSeconds(
        new Date(),
        activeCycle?.startedDate,
      )

      // that means we did it ;D
      if (diffInSeconds > totalSeconds) {
        setCycles((state) =>
          state.map((cycle) => {
            if (cycle.id === activeCycle?.id) {
              return { ...cycle, status: 'done', finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
        )

        clearInterval(interval)
      } else {
        setAmountSecondsPassed(diffInSeconds)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [activeCycle, totalSeconds])

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const { task, minutesAmount } = data
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task,
      minutesAmount,
      status: 'doing',
      startedDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setAmountSecondsPassed(0)
    reset()
  }

  const handleInterruptCycle = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycle?.id) {
          return { ...cycle, status: 'cancelled', finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task

  console.log({ cycles })
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
            disabled={!!activeCycle}
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
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        {activeCycle ? (
          <StopCountdownButton
            type="button"
            onClick={() => handleInterruptCycle()}
          >
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
