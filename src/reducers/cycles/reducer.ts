import { STATUS } from '../../pages/Home'
import { ActionTypes } from '../actions'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  status: keyof typeof STATUS
  startedDate: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
}

export function cyclesReducer(state: CyclesState, action: any) {
  const currentCycleIndex = state.cycles.findIndex(
    (cycle) => cycle.status === 'doing',
  )

  const cyclesTypes = {
    [ActionTypes.ADD_NEW_CYCLE]: (
      state: CyclesState,
      { newCycle }: any = {},
    ) => {
      return produce(state, (draft) => {
        draft.cycles.push(newCycle)
      })
    },
    [ActionTypes.INTERRUPT_CYCLE]: (state: CyclesState) => {
      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].status = 'cancelled'
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    },
    [ActionTypes.MARK_AS_FINISHED]: (state: CyclesState) => {
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].status = 'done'
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    },
  }

  return cyclesTypes[action.type](state, action.payload) || state
}

// sequencia de fibonnaci
