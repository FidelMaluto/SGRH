
/*
  Sistema de Gestão de Recursos Humanos (SGRH)
  Ficheiro: Principal.tsx
  Descrição: Ponto de entrada principal da aplicação com as rotas e estados globais.
  Refactorizado para o contexto Angolano.
*/

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Wallet, 
  Calendar, 
  BarChart3, 
  Mail, 
  MessageSquare,
  Search,
  Bell,
  Menu,
  X,
  Plus,
  ChevronRight,
  LogOut,
  User,
  Settings,
  MoreVertical,
  Briefcase,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Pagina, Candidato, Funcionario, Mensagem, Entrevista } from './tipos';
import { listaCandidatos, listaFuncionarios, listaMensagens, listaEntrevistas } from './dadosIniciais';

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState<Pagina>('login');
  const [menuLateralAberto, setMenuLateralAberto] = useState(true);
  const [utilizador, setUtilizador] = useState<{nome: string, funcao: string} | null>(null);

  // Manipulador de Autenticação
  const lidarComLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUtilizador({ nome: 'Gerente Administrativo', funcao: 'Administrador' });
    setPaginaAtual('painel');
  };

  const lidarComLogout = () => {
    setUtilizador(null);
    setPaginaAtual('login');
  };

  if (paginaAtual === 'login') {
    return <PaginaLogin aoEntrar={lidarComLogin} aoIrParaRegisto={() => setPaginaAtual('registo')} aoIrParaCarreiras={() => setPaginaAtual('carreiras')} />;
  }

  if (paginaAtual === 'registo') {
    return <PaginaRegisto aoRegistar={lidarComLogin} aoIrParaLogin={() => setPaginaAtual('login')} />;
  }

  if (paginaAtual === 'carreiras') {
    return <PaginaCarreiras aoVoltar={() => setPaginaAtual('login')} />;
  }

  return (
    <div className="min-h-screen bg-neutral-bg flex text-sky-950 font-sans relative overflow-x-hidden">
      {/* Overlay para Mobile */}
      <AnimatePresence>
        {menuLateralAberto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuLateralAberto(false)}
            className="fixed inset-0 bg-sky-950/20 backdrop-blur-[2px] z-[45] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Barra Lateral (Menu) */}
      <aside className={`bg-primary text-white transition-all duration-300 flex flex-col fixed h-full z-50 
        ${menuLateralAberto ? 'w-64 lg:translate-x-0 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'}`}>
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${(menuLateralAberto || window.innerWidth < 1024) ? 'flex' : 'hidden'}`}>
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-primary shrink-0">S</div>
            <span className="font-bold text-xl tracking-tight">SGRH</span>
          </div>
          <button onClick={() => setMenuLateralAberto(!menuLateralAberto)} className="hover:bg-white/10 p-2 rounded-xl transition-colors shrink-0">
            {menuLateralAberto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1 overflow-y-auto">
          <ItemNavegacao icon={<LayoutDashboard size={20} />} label="Painel Geral" active={paginaAtual === 'painel'} onClick={() => { setPaginaAtual('painel'); if(window.innerWidth < 1024) setMenuLateralAberto(false); }} colapsado={!menuLateralAberto} />
          <ItemNavegacao icon={<UserPlus size={20} />} label="Recrutamento" active={paginaAtual === 'recrutamento'} onClick={() => { setPaginaAtual('recrutamento'); if(window.innerWidth < 1024) setMenuLateralAberto(false); }} colapsado={!menuLateralAberto} />
          <ItemNavegacao icon={<Users size={20} />} label="Funcionários" active={paginaAtual === 'funcionarios'} onClick={() => { setPaginaAtual('funcionarios'); if(window.innerWidth < 1024) setMenuLateralAberto(false); }} colapsado={!menuLateralAberto} />
          <ItemNavegacao icon={<Wallet size={20} />} label="Folha de Pagamento" active={paginaAtual === 'folha'} onClick={() => { setPaginaAtual('folha'); if(window.innerWidth < 1024) setMenuLateralAberto(false); }} colapsado={!menuLateralAberto} />
          <ItemNavegacao icon={<Calendar size={20} />} label="Entrevistas" active={paginaAtual === 'entrevistas'} onClick={() => { setPaginaAtual('entrevistas'); if(window.innerWidth < 1024) setMenuLateralAberto(false); }} colapsado={!menuLateralAberto} />
          <ItemNavegacao icon={<BarChart3 size={20} />} label="Desempenho" active={paginaAtual === 'desempenho'} onClick={() => { setPaginaAtual('desempenho'); if(window.innerWidth < 1024) setMenuLateralAberto(false); }} colapsado={!menuLateralAberto} />
          <ItemNavegacao icon={<Mail size={20} />} label="Mensagens" active={paginaAtual === 'mensagens'} onClick={() => { setPaginaAtual('mensagens'); if(window.innerWidth < 1024) setMenuLateralAberto(false); }} colapsado={!menuLateralAberto} />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={lidarComLogout}
            className="flex items-center gap-4 px-3 py-3 w-full hover:bg-red-500/20 text-red-100 rounded-lg transition-colors group"
          >
            <LogOut size={20} />
            {(menuLateralAberto || window.innerWidth < 1024) && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className={`flex-1 transition-all duration-300 w-full min-w-0 
        ${menuLateralAberto ? 'lg:ml-64' : 'lg:ml-20 ml-0'}`}>
        
        {/* Cabeçalho Superior */}
        <header className="bg-white border-b border-sky-100 min-h-[5rem] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMenuLateralAberto(!menuLateralAberto)}
              className="lg:hidden p-2 text-sky-600 hover:bg-sky-50 rounded-xl"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-4 bg-sky-50 px-4 py-2 rounded-full w-64 lg:w-96">
              <Search size={18} className="text-sky-300" />
              <input type="text" placeholder="Pesquisar..." className="bg-transparent border-none outline-none text-sm w-full text-sky-900 placeholder:text-sky-300 font-medium" />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <button className="relative text-sky-500 hover:text-primary p-1">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-accent text-sky-900 text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">3</span>
            </button>
            <div className="h-8 w-[1px] bg-sky-100 hidden sm:block"></div>
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none text-sky-950">{utilizador?.nome}</p>
                <p className="text-[10px] text-sky-400 font-medium mt-1 uppercase tracking-wider">{utilizador?.funcao}</p>
              </div>
              <div className="w-9 h-9 lg:w-10 lg:h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold border-2 border-accent shrink-0 text-sm lg:text-base">
                GA
              </div>
            </div>
          </div>
        </header>

        {/* Contentor de Página */}
        <div className="p-4 lg:p-8 pb-12 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={paginaAtual}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {paginaAtual === 'painel' && <VisaoPainel />}
              {paginaAtual === 'recrutamento' && <VisaoRecrutamento />}
              {paginaAtual === 'funcionarios' && <VisaoFuncionarios />}
              {paginaAtual === 'folha' && <VisaoFolha />}
              {paginaAtual === 'entrevistas' && <VisaoEntrevistas />}
              {paginaAtual === 'desempenho' && <VisaoDesempenho />}
              {paginaAtual === 'mensagens' && <VisaoMensagens />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTES E ELEMENTOS AUXILIARES ---

function ItemNavegacao({ icon, label, active, onClick, colapsado }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void, colapsado?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-4 px-3 py-3 w-full rounded-lg transition-all duration-200 group relative
        ${active ? 'bg-white text-primary font-bold shadow-lg' : 'hover:bg-white/10 text-white hover:text-white'}`}
    >
      <div className={`${active ? 'text-primary' : 'text-white/80 group-hover:text-white'}`}>
        {icon}
      </div>
      {!colapsado && <span className="tracking-tight">{label}</span>}
      {colapsado && active && <div className="absolute right-0 w-1.5 h-6 bg-accent rounded-l-full"></div>}
    </button>
  );
}

function Cartao({ children, title, acao }: { children: React.ReactNode, title?: string, acao?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-md shadow-sky-900/5 border border-sky-50 overflow-hidden w-full">
      {title && (
        <div className="px-4 lg:px-6 py-4 border-b border-sky-50 flex items-center justify-between gap-2 bg-sky-50/30">
          <h3 className="font-black text-sky-950 text-sm lg:text-base truncate">{title}</h3>
          <div className="shrink-0 leading-none">
            {acao}
          </div>
        </div>
      )}
      <div className="p-4 lg:p-6 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

function CartaoEstatistico({ label, valor, tendencia, icon, color }: { label: string, valor: string, tendencia: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-white p-4 lg:p-6 rounded-2xl border border-sky-50 shadow-md shadow-sky-900/5 hover:shadow-lg hover:shadow-sky-900/10 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 lg:p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <span className="text-[10px] lg:text-xs font-black text-white bg-sky-400 px-3 py-1 rounded-full flex items-center gap-1">
          <TrendingUp size={12} /> {tendencia}
        </span>
      </div>
      <p className="text-sky-400 text-[10px] lg:text-xs font-bold uppercase tracking-wider">{label}</p>
      <h2 className="text-2xl lg:text-4xl font-black mt-1 text-sky-900">{valor}</h2>
    </div>
  );
}

// --- VISTAS DO SISTEMA (MÓDULOS) ---

function PaginaLogin({ aoEntrar, aoIrParaRegisto, aoIrParaCarreiras }: { aoEntrar: (e: React.FormEvent) => void, aoIrParaRegisto: () => void, aoIrParaCarreiras: () => void }) {
  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-in border border-sky-100">
        <div className="bg-primary p-10 text-center text-white">
          <div className="w-16 h-16 bg-accent rounded-2xl mx-auto flex items-center justify-center font-bold text-2xl text-primary mb-4 shadow-xl">S</div>
          <h1 className="text-3xl font-black tracking-tight text-white">SGRH</h1>
          <p className="text-sky-100 text-sm mt-2 font-medium">Gestão Integrada de Recursos Humanos</p>
        </div>
        <form onSubmit={aoEntrar} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-sky-400 ml-1">E-mail Corporativo</label>
            <input 
              required
              type="email" 
              placeholder="seu@nome.com" 
              className="w-full px-4 py-3 rounded-xl border border-sky-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-sky-50/30 text-sky-900 font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-sky-400 ml-1">Senha</label>
            <input 
              required
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-sky-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-sky-50/30 text-sky-900 font-medium"
            />
          </div>
          <button className="w-full bg-primary hover:bg-sky-700 text-white font-black py-4 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] uppercase tracking-widest text-sm">
            Entrar no Portal
          </button>
          <div className="flex flex-col gap-3 items-center">
            <p className="text-center text-sky-300 text-xs font-bold">
              Esqueceu sua senha? <a href="#" className="text-primary hover:underline font-black">Recuperar acesso</a>
            </p>
            <p className="text-center text-sky-300 text-xs font-bold uppercase tracking-tight">
              Não tem conta? <button type="button" onClick={aoIrParaRegisto} className="text-primary hover:underline font-black">Cadastre-se</button>
            </p>
            <div className="w-full h-[1px] bg-sky-50 my-2"></div>
            <p className="text-center text-sky-400 text-xs font-bold">
              É um candidato? <button type="button" onClick={aoIrParaCarreiras} className="text-primary hover:underline font-black uppercase tracking-tighter">Ver Vagas Abertas</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function PaginaRegisto({ aoRegistar, aoIrParaLogin }: { aoRegistar: (e: React.FormEvent) => void, aoIrParaLogin: () => void }) {
  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-in border border-sky-100">
        <div className="bg-primary p-8 text-center text-white">
          <div className="w-14 h-14 bg-accent rounded-2xl mx-auto flex items-center justify-center font-bold text-2xl text-primary mb-4 shadow-xl">S</div>
          <h1 className="text-2xl font-black tracking-tight text-white">Criar Nova Conta</h1>
          <p className="text-sky-100 text-xs mt-2 font-medium">Junte-se à revolução na gestão de pessoas</p>
        </div>
        <form onSubmit={aoRegistar} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-sky-400 ml-1">Nome Completo</label>
            <input required type="text" placeholder="Nome Sobrenome" className="w-full px-4 py-2.5 rounded-xl border border-sky-100 focus:ring-2 focus:ring-primary/20 bg-sky-50/30 text-sky-900 text-sm font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-sky-400 ml-1">E-mail Corporativo</label>
            <input required type="email" placeholder="email@empresa.com" className="w-full px-4 py-2.5 rounded-xl border border-sky-100 focus:ring-2 focus:ring-primary/20 bg-sky-50/30 text-sky-900 text-sm font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-sky-400 ml-1">Senha</label>
            <input required type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-sky-100 focus:ring-2 focus:ring-primary/20 bg-sky-50/30 text-sky-900 text-sm font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-sky-400 ml-1">Confirmar Senha</label>
            <input required type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-sky-100 focus:ring-2 focus:ring-primary/20 bg-sky-50/30 text-sky-900 text-sm font-medium" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-sky-400 ml-1">Cargo / Função</label>
            <input required type="text" placeholder="Ex: Diretor de RH" className="w-full px-4 py-2.5 rounded-xl border border-sky-100 focus:ring-2 focus:ring-primary/20 bg-sky-50/30 text-sky-900 text-sm font-medium" />
          </div>
          <div className="md:col-span-2 space-y-4">
            <button className="w-full bg-primary hover:bg-sky-700 text-white font-black py-4 rounded-xl shadow-lg shadow-primary/30 transition-all uppercase tracking-widest text-sm">
              Criar minha conta
            </button>
            <p className="text-center text-sky-300 text-xs font-bold uppercase tracking-tight">
              Já tem uma conta? <button type="button" onClick={aoIrParaLogin} className="text-primary hover:underline font-black">Entrar agora</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function VisaoPainel() {
  return (
    <div className="space-y-6 lg:space-y-8 animate-slide-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-sky-950 tracking-tight">Painel Executivo</h1>
          <p className="text-sky-600 mt-1 font-medium text-sm lg:text-base">Bem-vindo de volta! Aqui está o resumo de hoje.</p>
        </div>
        <button className="bg-primary text-white flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-sky-500 transition-all w-full sm:w-auto">
          <Plus size={20} /> Novo Funcionário
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CartaoEstatistico label="Total Colaboradores" valor="154" tendencia="+4.5%" icon={<Users className="text-primary" />} color="bg-blue-50" />
        <CartaoEstatistico label="Vagas Abertas" valor="12" tendencia="+2" icon={<Briefcase className="text-amber-600" />} color="bg-amber-50" />
        <CartaoEstatistico label="Satisfação (eNPS)" valor="78" tendencia="+1.2%" icon={<MessageSquare className="text-primary" />} color="bg-blue-50" />
        <CartaoEstatistico label="Investimento Salarial" valor="Kz 5.485k" tendencia="-2.1%" icon={<Wallet className="text-green-600" />} color="bg-green-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Cartao title="Candidatos Recentes" acao={<button className="text-primary text-xs font-bold hover:underline">Ver todos</button>}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-sky-400 border-b border-sky-50">
                    <th className="pb-4 font-black tracking-widest">Candidato</th>
                    <th className="pb-4 font-black tracking-widest">Vaga</th>
                    <th className="pb-4 font-black tracking-widest">Estado</th>
                    <th className="pb-4 font-black tracking-widest">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-50">
                  {listaCandidatos.map(c => (
                    <tr key={c.id} className="hover:bg-sky-50 transition-colors">
                      <td className="py-4 font-bold text-sm text-sky-900">{c.nome}</td>
                      <td className="py-4 text-sm text-sky-600 font-medium">{c.cargo}</td>
                      <td className="py-4">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full 
                          ${c.estado === 'Aprovado' ? 'bg-green-100 text-green-700' : 'bg-sky-100 text-sky-700'}`}>
                          {c.estado}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-sky-400 font-bold">{c.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Cartao>
        </div>

        <div className="space-y-8">
          <Cartao title="Próximas Entrevistas">
            <div className="space-y-6">
              {listaEntrevistas.map(i => (
                <div key={i.id} className="flex gap-4 group">
                  <div className="w-12 h-12 bg-sky-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-sky-100 group-hover:border-primary transition-colors">
                    <span className="text-[10px] font-black text-sky-300 uppercase leading-none">{i.data.split('/')[1]}</span>
                    <span className="text-lg font-black text-primary leading-none mt-0.5">{i.data.split('/')[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sky-900 text-sm">{i.nomeCandidato}</p>
                    <p className="text-xs text-sky-500 font-bold tracking-tight">Entrevista {i.tipo} • {i.hora}</p>
                  </div>
                </div>
              ))}
              <button className="w-full text-center py-3 bg-sky-50 rounded-xl text-sky-600 text-xs font-black uppercase tracking-widest hover:bg-sky-100 transition-colors border border-sky-100">
                Agendar Nova Entrevista
              </button>
            </div>
          </Cartao>

          <Cartao title="Feedback Recentes">
             <div className="space-y-4">
                <div className="p-3 bg-sky-50 border-l-4 border-primary rounded-r-xl">
                  <p className="text-xs italic text-sky-900 font-medium tracking-tight">"Ótimo ambiente de trabalho, me sinto valorizado pela gestão."</p>
                  <p className="text-[10px] font-black uppercase mt-2 text-primary tracking-widest">Anónimo • Engenharia</p>
                </div>
                <div className="p-3 bg-amber-50 border-l-4 border-accent rounded-r-xl">
                  <p className="text-xs italic text-amber-950 font-medium tracking-tight">"Precisamos de cadeiras mais ergonómicas no andar 3."</p>
                  <p className="text-[10px] font-black uppercase mt-2 text-accent tracking-widest">Anónimo • Operação</p>
                </div>
             </div>
          </Cartao>
        </div>
      </div>
    </div>
  );
}

function VisaoRecrutamento() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
    <div className="space-y-8 animate-slide-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-sky-950 tracking-tight">Recrutamento & Seleção</h1>
          <p className="text-sky-600 mt-1 font-medium">Gerencie suas vagas e acompanhe novos talentos.</p>
        </div>
        <button onClick={() => setMostrarFormulario(!mostrarFormulario)} className="bg-accent text-sky-900 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg shadow-accent/20 hover:brightness-95 transition-all w-full sm:w-auto">
          <UserPlus size={20} /> {mostrarFormulario ? 'Fechar Cadastro' : 'Novo Candidato'}
        </button>
      </div>

      {mostrarFormulario && (
        <Cartao title="Cadastro de Candidato">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-sky-300">Nome Completo</label>
              <input type="text" className="w-full p-3 bg-sky-50 rounded-xl border border-sky-100 outline-none focus:border-primary text-sky-900" placeholder="Ex: Maria das Neves" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-sky-300">E-mail</label>
              <input type="email" className="w-full p-3 bg-sky-50 rounded-xl border border-sky-100 outline-none focus:border-primary text-sky-900" placeholder="maria@email.ao" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-sky-300">Vaga Alvo</label>
              <select className="w-full p-3 bg-sky-50 rounded-xl border border-sky-100 outline-none focus:border-primary text-sky-900 font-bold">
                <option>Desenvolvedor Frontend</option>
                <option>Desenvolvedor Backend</option>
                <option>Analista Fiscal</option>
              </select>
            </div>
            <div className="lg:col-span-3 flex justify-end">
              <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20">Salvar Candidato</button>
            </div>
          </div>
        </Cartao>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Cartao title="Pipeline de Talentos">
            <div className="space-y-4">
              {listaCandidatos.map(c => (
                <div key={c.id} className="flex items-center justify-between p-4 border border-sky-100 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-black text-primary">{c.nome.charAt(0)}</div>
                    <div>
                      <h4 className="font-bold text-sky-950">{c.nome}</h4>
                      <p className="text-xs text-sky-600 font-bold tracking-tight">{c.cargo} • {c.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full 
                        ${c.estado === 'Aprovado' ? 'bg-green-100 text-green-700' : 'bg-sky-100 text-sky-600'}`}>
                        {c.estado}
                    </span>
                    <button className="text-sky-200 hover:text-primary transition-colors"><ChevronRight size={20} /></button>
                  </div>
                </div>
              ))}
            </div>
          </Cartao>
        </div>
        <Cartao title="Estatísticas de Vagas">
           <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                   <span className="text-sky-900">Ativas</span>
                   <span className="text-primary font-black">8</span>
                </div>
                <div className="h-2 bg-sky-50 rounded-full overflow-hidden">
                   <div className="h-full bg-primary w-[70%]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                   <span className="text-sky-900">Encerradas</span>
                   <span className="text-sky-300">14</span>
                </div>
                <div className="h-2 bg-sky-50 rounded-full overflow-hidden">
                   <div className="h-full bg-sky-100 w-[100%]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                   <span className="text-sky-900">Pausadas</span>
                   <span className="text-accent">2</span>
                </div>
                <div className="h-2 bg-sky-50 rounded-full overflow-hidden">
                   <div className="h-full bg-accent w-[30%]"></div>
                </div>
              </div>
           </div>
        </Cartao>
      </div>
    </div>
  );
}

function VisaoFuncionarios() {
  return (
    <div className="space-y-8 animate-slide-in">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-sky-950 tracking-tight">Gestão de Funcionários</h1>
          <p className="text-sky-600 mt-1 font-medium">Visualização completa do seu capital humano.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none justify-center bg-white text-sky-700 border border-sky-100 flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-sky-50 transition-all">
             Exportar CSV
          </button>
          <button className="flex-1 sm:flex-none justify-center bg-primary text-white flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-sky-500 transition-all">
            <Plus size={20} /> Cadastrar
          </button>
        </div>
      </div>

      <Cartao>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-sky-300 border-b border-sky-50">
                <th className="pb-4 font-black tracking-widest">Funcionário</th>
                <th className="pb-4 font-black tracking-widest">Setor</th>
                <th className="pb-4 font-black tracking-widest">Estado</th>
                <th className="pb-4 font-black tracking-widest">Desempenho</th>
                <th className="pb-4 font-black tracking-widest text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-50">
              {listaFuncionarios.map(e => (
                <tr key={e.id} className="hover:bg-sky-50 transition-colors">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary">{e.nome.charAt(0)}</div>
                      <div>
                        <p className="font-bold text-sky-900 leading-none">{e.nome}</p>
                        <p className="text-[11px] text-sky-400 font-bold mt-1 uppercase tracking-tighter">{e.funcao}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 text-sm font-bold text-sky-700">{e.departamento}</td>
                  <td className="py-5">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full 
                      ${e.estado === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-sky-100 text-sky-500'}`}>
                      {e.estado}
                    </span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-2">
                       <div className="w-24 h-2 bg-sky-50 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${e.desempenho > 85 ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${e.desempenho}%` }}></div>
                       </div>
                       <span className="text-xs font-black text-sky-900">{e.desempenho}%</span>
                    </div>
                  </td>
                  <td className="py-5 text-right">
                    <button className="text-sky-300 hover:text-primary"><MoreVertical size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Cartao>
    </div>
  );
}

function VisaoFolha() {
  return (
    <div className="space-y-8 animate-slide-in">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-sky-950 tracking-tight">Folha de Pagamento</h1>
          <p className="text-sky-600 mt-1 font-medium">Controle de salários, benefícios e bónus.</p>
        </div>
        <button className="bg-primary text-white flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-sky-500 transition-all w-full sm:w-auto justify-center">
          <TrendingUp size={20} /> Processar Folha
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <CartaoEstatistico label="Total Líquido" valor="Kz 1.342.100" tendencia="-0.5%" icon={<Wallet className="text-primary" />} color="bg-sky-50" />
        <CartaoEstatistico label="Impostos e Encargos" valor="Kz 542.900" tendencia="+1.2%" icon={<Briefcase className="text-sky-600" />} color="bg-sky-50" />
        <CartaoEstatistico label="Bónus Atribuídos" valor="Kz 112.000" tendencia="+10%" icon={<TrendingUp className="text-accent" />} color="bg-amber-50" />
        <CartaoEstatistico label="Funcionários Pagos" valor="152/154" tendencia="98%" icon={<Users className="text-green-600" />} color="bg-green-50" />
      </div>

      <Cartao title="Histórico de Pagamentos">
         <div className="space-y-4">
            {listaFuncionarios.map(e => (
               <div key={e.id} className="flex items-center justify-between p-4 border-b border-sky-50 last:border-0 hover:bg-sky-50/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center font-bold text-primary">{e.nome.charAt(0)}</div>
                     <div>
                        <p className="font-bold text-sky-900">{e.nome}</p>
                        <p className="text-xs text-sky-500 font-bold uppercase tracking-tight">{e.funcao}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="font-black text-sky-900">Kz {e.salario.toLocaleString('pt-PT')}</p>
                     <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">Processado</p>
                  </div>
               </div>
            ))}
         </div>
      </Cartao>
    </div>
  );
}

function VisaoEntrevistas() {
  return (
    <div className="space-y-8 animate-slide-in">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-sky-950 tracking-tight">Agenda de Entrevistas</h1>
          <p className="text-sky-600 mt-1 font-medium">Organize o tempo com seus futuros talentos.</p>
        </div>
        <button className="bg-primary text-white flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-sky-500 transition-all w-full sm:w-auto justify-center">
          <Calendar size={20} /> Agendar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Cartao title="Calendário Semanal">
            <div className="grid grid-cols-7 gap-2">
               {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, idx) => <div key={`${d}-${idx}`} className="text-center text-[10px] font-black text-sky-300 mb-2">{d}</div>)}
               {Array.from({ length: 31 }).map((_, i) => (
                  <button key={i} className={`h-10 rounded-lg text-xs font-black flex items-center justify-center transition-all
                    ${i + 1 === 22 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-sky-50 text-sky-800 hover:bg-sky-200'}`}>
                     {i + 1}
                  </button>
               ))}
            </div>
         </Cartao>
         <Cartao title="Entrevistas do Dia">
            <div className="space-y-6">
               {listaEntrevistas.map(i => (
                  <div key={i.id} className="relative pl-6 border-l-2 border-accent">
                     <div className="absolute -left-[5px] top-0 w-2 h-2 bg-accent rounded-full"></div>
                     <div className="flex justify-between items-start">
                        <div>
                           <p className="text-xs font-black text-primary uppercase tracking-widest">{i.hora}</p>
                           <p className="font-bold text-sky-900 mt-1">{i.nomeCandidato}</p>
                           <p className="text-xs text-sky-500 font-bold">{i.tipo}</p>
                        </div>
                        <button className="bg-sky-50 text-sky-600 p-2 rounded-lg hover:bg-sky-100 border border-sky-100">
                           <MoreVertical size={16} />
                        </button>
                     </div>
                  </div>
               ))}
               <div className="p-4 bg-sky-50/50 rounded-2xl border border-dashed border-sky-200 text-center">
                  <p className="text-xs font-black text-sky-300 uppercase tracking-widest">Sem mais compromissos hoje</p>
               </div>
            </div>
         </Cartao>
      </div>
    </div>
  );
}

function VisaoDesempenho() {
  return (
    <div className="space-y-8 animate-slide-in">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-sky-950 tracking-tight">Relatórios de Desempenho</h1>
          <p className="text-sky-600 mt-1 font-medium">Análise qualitativa e quantitativa da equipa.</p>
        </div>
        <button className="bg-white border border-sky-100 text-sky-800 flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-sky-50 transition-all w-full sm:w-auto justify-center">
          <BarChart3 size={20} /> Gerar Relatório Anual
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Cartao title="Principais Talentos (Destaques)">
            <div className="space-y-6">
               {[...listaFuncionarios].sort((a,b) => b.desempenho - a.desempenho).map(e => (
                  <div key={e.id} className="flex items-center justify-between p-2 hover:bg-sky-50 rounded-2xl transition-colors">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center font-black text-sky-950 shadow-sm shadow-accent/20">{e.desempenho}%</div>
                        <div>
                           <p className="font-bold text-sky-900">{e.nome}</p>
                           <p className="text-xs text-sky-500 font-bold uppercase tracking-tight">{e.departamento}</p>
                        </div>
                     </div>
                     <button className="text-primary hover:bg-blue-50 p-2 rounded-lg transition-colors"><ChevronRight size={18} /></button>
                  </div>
               ))}
            </div>
         </Cartao>

         <Cartao title="Satisfação Organizacional">
            <div className="flex flex-col items-center py-4">
               <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                     <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-sky-50" />
                     <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="110" className="text-primary" />
                  </svg>
                  <div className="absolute text-center">
                     <p className="text-3xl font-black text-sky-900">78</p>
                     <p className="text-[10px] font-black text-sky-300 uppercase tracking-widest mt-1">NPS</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-8 w-full mt-8">
                  <div className="text-center">
                     <p className="text-[10px] font-black text-sky-300 uppercase">Promotores</p>
                     <p className="text-xl font-black text-primary">62%</p>
                  </div>
                  <div className="text-center">
                     <p className="text-[10px] font-black text-sky-300 uppercase">Detratores</p>
                     <p className="text-xl font-black text-sky-900">8%</p>
                  </div>
               </div>
            </div>
         </Cartao>
      </div>
    </div>
  );
}

function VisaoMensagens() {
  const [mensagemSelecionada, setMensagemSelecionada] = useState<Mensagem | null>(null);

  return (
    <div className="space-y-8 animate-slide-in">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-sky-950 tracking-tight">Caixa de Entrada</h1>
          <p className="text-sky-600 mt-1 font-medium text-sm lg:text-base">Recepção de currículos, dúvidas e avisos.</p>
        </div>
        <div className="flex gap-2 p-1 bg-sky-50 rounded-xl self-start sm:self-auto border border-sky-100">
           <button className="px-4 py-2 bg-white rounded-lg shadow-sm font-black text-xs text-primary uppercase tracking-widest">Todos</button>
           <button className="px-4 py-2 hover:bg-white/50 rounded-lg font-black text-xs text-sky-400 uppercase tracking-widest">Não Lidas</button>
        </div>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-md shadow-sky-950/5 flex flex-col lg:flex-row min-h-[500px] lg:min-h-[600px]">
         <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-sky-100 bg-sky-50/20 lg:h-[600px] overflow-y-auto">
            {listaMensagens.map(e => (
               <div 
                  key={e.id} 
                  onClick={() => setMensagemSelecionada(e)}
                  className={`p-4 lg:p-6 border-b border-sky-50 flex flex-col gap-1 lg:gap-2 cursor-pointer transition-colors relative
                  ${mensagemSelecionada?.id === e.id ? 'bg-white shadow-xl z-10 border-l-4 border-primary' : 'hover:bg-white/50'}
                  ${!e.lida && mensagemSelecionada?.id !== e.id ? 'bg-sky-50 border-l-4 border-sky-300' : ''}`}>
                  <div className="flex justify-between items-start">
                     <p className={`text-sm ${!e.lida ? 'font-black text-primary' : 'font-bold text-sky-700'}`}>{e.remetente.split(':')[0]}</p>
                     <span className="text-[10px] font-black text-sky-300 uppercase">{e.data}</span>
                  </div>
                  <p className="text-xs font-black text-sky-900 truncate tracking-tight">{e.assunto}</p>
                  <p className="text-xs text-sky-400 truncate font-medium">{e.conteudo}</p>
               </div>
            ))}
         </div>
         <div className="flex-1 p-6 lg:p-10 flex flex-col bg-white">
            {mensagemSelecionada ? (
              <div className="w-full space-y-8 animate-slide-in">
                 <div className="flex justify-between items-center border-b border-sky-50 pb-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {mensagemSelecionada.remetente[0]}
                       </div>
                       <div>
                          <h2 className="font-black text-sky-950">{mensagemSelecionada.remetente}</h2>
                          <p className="text-xs text-sky-400 font-bold uppercase tracking-widest">{mensagemSelecionada.assunto}</p>
                       </div>
                    </div>
                    <span className="text-xs font-black text-sky-300 bg-sky-50 px-4 py-2 rounded-full uppercase tracking-tighter">{mensagemSelecionada.data}</span>
                 </div>
                 <div className="text-sky-950 font-medium leading-relaxed bg-sky-50/30 p-6 rounded-2xl border border-sky-50 min-h-[300px]">
                    <p className="whitespace-pre-line">{mensagemSelecionada.conteudo}</p>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button className="flex-1 bg-primary text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Responder</button>
                    <button className="flex-1 border-2 border-sky-100 text-sky-400 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-sky-50 hover:text-sky-600 transition-all">Encaminhar</button>
                 </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                 <div className="w-16 h-16 lg:w-20 lg:h-20 bg-sky-50 rounded-full flex items-center justify-center shadow-inner">
                    <Mail size={32} className="text-sky-200" />
                  </div>
                 <h3 className="text-lg lg:text-xl font-black text-sky-300 uppercase tracking-widest">Selecione uma mensagem</h3>
                 <p className="text-xs lg:text-sm text-sky-200 max-w-xs font-black uppercase tracking-tighter">Fique em dia com as comunicações da sua equipa e candidatos.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

function PaginaCarreiras({ aoVoltar }: { aoVoltar: () => void }) {
  const [submetido, setSubmetido] = useState(false);

  if (submetido) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl text-center space-y-6 border border-sky-100"
        >
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl shadow-green-100">
            <Plus size={48} className="text-green-500 rotate-45 scale-[1.2]" />
          </div>
          <h1 className="text-3xl font-black text-sky-950 tracking-tight">Mambo enviado com sucesso!</h1>
          <p className="text-sky-600 font-medium">A tua candidatura já está no nosso sistema. Fica atento ao teu e-mail, vamos falar contigo em breve!</p>
          <button 
            onClick={aoVoltar}
            className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20"
          >
            Voltar ao Início
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center py-10 px-4 font-sans">
       <button onClick={aoVoltar} className="absolute top-6 left-6 flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest hover:translate-x-1 transition-transform bg-white px-4 py-2 rounded-full shadow-md">
          <ChevronRight className="rotate-180" size={16} /> Voltar
       </button>

       <div className="w-full max-w-4xl space-y-10">
          <div className="text-center space-y-4">
             <div className="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center font-bold text-2xl text-white shadow-xl">S</div>
             <h1 className="text-4xl font-black text-sky-950 tracking-tighter">Trabalhe Connosco - SGRH</h1>
             <p className="text-sky-600 font-medium max-w-xl mx-auto italic">Nós não apenas gerimos pessoas, nós impulsionamos futuros. Junta-te a nós!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <div className="bg-white p-8 rounded-3xl shadow-xl border border-sky-100 space-y-8 order-2 md:order-1">
                <h2 className="text-xl font-black text-sky-950 uppercase tracking-tight flex items-center gap-3">
                   <UserPlus size={24} className="text-primary" /> Mete o teu currículo!
                </h2>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmetido(true); }}>
                   <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-sky-300 ml-1">Nome Completo</label>
                      <input required type="text" placeholder="Teu nome completo" className="w-full p-4 rounded-xl border border-sky-50 bg-sky-50/30 text-sky-900 outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-sky-300 ml-1">E-mail para Contacto</label>
                      <input required type="email" placeholder="exemplo@gmail.com" className="w-full p-4 rounded-xl border border-sky-50 bg-sky-50/30 text-sky-900 outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-sky-300 ml-1">Vaga Desejada</label>
                      <select required className="w-full p-4 rounded-xl border border-sky-50 bg-sky-50/30 text-sky-900 outline-none focus:ring-2 focus:ring-primary/20 font-medium font-bold appearance-none">
                         <option>Desenvolvedor Frontend</option>
                         <option>Gerente de Projetos</option>
                         <option>Analista de RH</option>
                      </select>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-sky-300 ml-1">Currículo (PDF)</label>
                      <div className="border-2 border-dashed border-sky-100 rounded-xl p-8 text-center bg-sky-50/20 hover:border-primary transition-colors cursor-pointer group relative">
                         <input type="file" required className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf" />
                         <Plus size={24} className="mx-auto text-sky-200 group-hover:text-primary transition-colors" />
                         <p className="text-xs font-black text-sky-300 uppercase mt-2">Clica ou arrasta o teu CV</p>
                      </div>
                   </div>
                   <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-[0.98] transition-all">
                      Enviar Candidatura agora!
                   </button>
                </form>
             </div>

             <div className="space-y-6 order-1 md:order-2">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-sky-100 space-y-4">
                   <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary font-black">1</div>
                   <h3 className="font-black text-sky-950 uppercase">Vaga em Destaque</h3>
                   <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
                      <p className="font-black text-primary text-lg tracking-tight">Desenvolvedor Frontend Senior</p>
                      <p className="text-xs font-bold text-sky-400 mt-1 uppercase tracking-widest">Remoto • Salário Competitivo</p>
                      <p className="text-sm text-sky-900 mt-4 leading-relaxed line-clamp-3">Buscamos talentos com domínio em React, Tailwind e mentes inquietas que queiram construir o futuro do RH em Angola.</p>
                   </div>
                </div>
                <div className="bg-primary p-8 rounded-3xl shadow-xl space-y-4 text-white">
                   <h3 className="font-black uppercase tracking-widest text-accent italic">Porquê nós?</h3>
                   <ul className="space-y-3 text-sm font-medium">
                      <li className="flex gap-2 items-center"><ChevronRight size={14} className="text-accent" /> Cultura de inovação constante</li>
                      <li className="flex gap-2 items-center"><ChevronRight size={14} className="text-accent" /> Horários flexíveis</li>
                      <li className="flex gap-2 items-center"><ChevronRight size={14} className="text-accent" /> Plano de carreira acelerado</li>
                   </ul>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
