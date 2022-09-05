import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryList, HistoryContainer, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

const STATUS = {
  doing: 'doing',
  done: 'done',
  cancelled: 'cancelled',
} as const
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  status: keyof typeof STATUS
  startedDate: Date
  finishedDate?: Date
}

export function History() {
  const { cycles } = useContext(CyclesContext)

  const getCyclesStatus = (cycle: Cycle) => {
    const CycleTypes = {
      doing: () => <Status color="yellow">Em andamento</Status>,
      interrupted: () => <Status color="red">Interrompido</Status>,
      finished: () => <Status color="green">Concluído</Status>,
    }

    if (cycle.finishedDate && cycle.status === 'done') {
      return CycleTypes.finished()
    }

    if (cycle.status === 'cancelled') {
      return CycleTypes.interrupted()
    }

    if (!cycle.finishedDate && cycle.status === 'doing') {
      return CycleTypes.doing()
    }
  }

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startedDate, {
                      addSuffix: true,
                      locale: ptBr,
                    })}
                  </td>
                  <td>{getCyclesStatus(cycle)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
