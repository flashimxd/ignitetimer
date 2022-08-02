import { HistoryList, HistoryContainer, Status } from './styles'

export function History() {
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
            <tr>
              <td>Task</td>
              <td>20 minutos</td>
              <td>há 2 meses</td>
              <td>
                <Status color="green">Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Task 2</td>
              <td>20 minutos</td>
              <td>há 2 meses</td>
              <td>
                <Status color="green">Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Task 3</td>
              <td>20 minutos</td>
              <td>há 2 meses</td>
              <td>
                <Status color="green">Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Task 4</td>
              <td>20 minutos</td>
              <td>há 2 meses</td>
              <td>
                <Status color="red">Interrompido</Status>
              </td>
            </tr>

            <tr>
              <td>Task 5</td>
              <td>20 minutos</td>
              <td>há 2 meses</td>
              <td>
                <Status color="yellow">Em andamento</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
