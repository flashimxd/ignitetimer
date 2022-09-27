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

  const renderCycleStatus = (cycle: Cycle) => {
    const CycleTypes = {
      doing: () => <Status color="yellow">Em andamento</Status>,
      cancelled: () => <Status color="red">Interrompido</Status>,
      done: () => <Status color="green">Concluído</Status>,
    }

    if (cycle.finishedDate && cycle.status === 'done') {
      return CycleTypes.done()
    }

    return CycleTypes[cycle.status]() || CycleTypes.doing()
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
                    {formatDistanceToNow(new Date(cycle.startedDate), {
                      addSuffix: true,
                      locale: ptBr,
                    })}
                  </td>
                  <td>{renderCycleStatus(cycle)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
