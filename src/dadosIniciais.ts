
import { Candidato, Funcionario, Mensagem, Entrevista } from './tipos';

// Dados iniciais para o sistema SGRH - Feito com mambo do bom!
export const listaCandidatos: Candidato[] = [
  { id: '1', nome: 'Ana Silva', email: 'ana@exemplo.ao', cargo: 'Desenvolvedora Frontend', estado: 'Inscrito', data: '2024-05-20' },
  { id: '2', nome: 'João Pereira', email: 'joao@exemplo.ao', cargo: 'Gerente de Produto', estado: 'Entrevista', data: '2024-05-18' },
  { id: '3', nome: 'Maria Santos', email: 'maria@exemplo.ao', cargo: 'Designer UX', estado: 'Aprovado', data: '2024-05-15' },
];

export const listaFuncionarios: Funcionario[] = [
  { id: '101', nome: 'Carlos Sousa', funcao: 'Engenheiro de Software Principal', departamento: 'Engenharia', salario: 850000, desempenho: 92, estado: 'Ativo' },
  { id: '102', nome: 'Beatriz Lima', funcao: 'Gerente de RH', departamento: 'Recursos Humanos', salario: 650000, desempenho: 88, estado: 'Ativo' },
  { id: '103', nome: 'Ricardo Dias', funcao: 'Analista de Qualidade', departamento: 'QA', salario: 450000, desempenho: 75, estado: 'Férias' },
];

export const listaMensagens: Mensagem[] = [
  { id: 'e1', remetente: 'Candidato: Pedro Rocha', assunto: 'Dúvida sobre a vaga', conteudo: 'Boa tarde, gostaria de saber se a vaga aceita trabalho remoto em Luanda...', data: '10:30', lida: false },
  { id: 'e2', remetente: 'Finanças', assunto: 'Relatório Trimestral', conteudo: 'O relatório de gastos com pessoal em Kwanzas está pronto.', data: 'Ontem', lida: true },
];

export const listaEntrevistas: Entrevista[] = [
  { id: 'i1', nomeCandidato: 'João Pereira', data: '22/05/2024', hora: '14:00', tipo: 'Remota' },
  { id: 'i2', nomeCandidato: 'Lucas Lima', data: '23/05/2024', hora: '10:00', tipo: 'Presencial' },
];
