import { Usuario } from './usuario';
import { Priority } from './Priority';
import { Status } from './Status';
export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;

  // Prioridade
  // Prioridade.BAIXA = 'BAIXA';
  // Prioridade.MEDIA = 'MEDIA';
  // Prioridade.ALTA = 'ALTA';
  prioridade: Priority;

  // Status
  // Status.EM_ANDAMENTO = 'EM_ANDAMENTO';
  // Status.CONCLUIDA = 'CONCLUIDA';
  status: Status;

  // Responsável
  responsavel: Usuario;





  // responsavel: Usuario;

}
