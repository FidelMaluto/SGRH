
/*
  Definição de tipos e interfaces do sistema SGRH.
*/

export type Pagina = 'painel' | 'recrutamento' | 'funcionarios' | 'folha' | 'entrevistas' | 'desempenho' | 'mensagens' | 'login' | 'registo' | 'carreiras';

// Interface para um Candidato a emprego
export interface Candidato {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  estado: 'Inscrito' | 'Entrevista' | 'Aprovado' | 'Rejeitado';
  data: string;
}

// Interface para um Funcionário ativo no sistema
export interface Funcionario {
  id: string;
  nome: string;
  funcao: string;
  departamento: string;
  salario: number; // Valor em Kwanzas
  desempenho: number; // Escala de 0 a 100
  estado: 'Ativo' | 'Férias' | 'Inativo';
}

// Interface para Mensagens da caixa de entrada
export interface Mensagem {
  id: string;
  remetente: string;
  assunto: string;
  conteudo: string;
  data: string;
  lida: boolean;
}

// Interface para Entrevistas agendadas
export interface Entrevista {
  id: string;
  nomeCandidato: string;
  data: string;
  hora: string;
  tipo: 'Remota' | 'Presencial';
}
