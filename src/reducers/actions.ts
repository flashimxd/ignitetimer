import { Cycle } from './cycles/reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  MARK_AS_FINISHED = 'MARK_AS_FINISHED',
}

export const addNewCycleAction = (newCycle: Cycle) => ({
  type: ActionTypes.ADD_NEW_CYCLE,
  payload: {
    newCycle,
  },
})

export const markCurrentCycleAsFinishedAction = () => ({
  type: ActionTypes.MARK_AS_FINISHED,
})

export const interruptCurrentCycleAction = () => ({
  type: ActionTypes.INTERRUPT_CYCLE,
})
