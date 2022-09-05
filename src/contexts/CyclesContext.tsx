import { createContext, ReactNode, useState } from 'react'
import { STATUS } from '../pages/Home'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  status: keyof typeof STATUS
  startedDate: Date
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CycleContextType)

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle =
    cycles.find((cycle) => cycle.status === 'doing') || undefined

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const markCurrentCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycle?.id) {
          return { ...cycle, status: 'done', finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  const createNewCycle = (data: CreateCycleData) => {
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
  }

  const interruptCycle = () => {
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

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
