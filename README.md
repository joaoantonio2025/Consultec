# Consultec - Sistema de Agendamento Médico

Sistema web completo para agendamento de consultas médicas com frontend e backend integrados.

## 🚀 Funcionalidades

### Frontend
- **Agendamento de Consultas** - Busca e agendamento com profissionais de saúde
- **Cadastro de Usuários** - Sistema diferenciado para pacientes e profissionais
- **Gestão de Horários** - Cadastro e visualização de horários disponíveis
- **Perguntas Frequentes** - Seção de FAQ interativa
- **Design Responsivo** - Compatível com todos os dispositivos

### Backend (API)
- **Cadastro de Usuários** - API REST para registro de pacientes
- **Autenticação** - Sistema de login seguro
- **Gestão de Dados** - Armazenamento e recuperação de informações
- **CORS Configurado** - Comunicação entre frontend e backend

## 🛠 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização e design responsivo
- **Bootstrap 5.3** - Framework CSS para interface moderna
- **Bootstrap Icons** - Ícones para interface
- **JavaScript** - Interatividade e lógica do cliente

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para API REST
- **CORS** - Middleware para comunicação entre domínios

## 📁 Estrutura do Projeto
projeto.consultec/
│
├── 📄 index.html # Página principal
├── 📄 cadastro.html # Página de cadastro
├── 📄 login.html # Página de login
├── 📄 especialidades.html # Página de especialidades
├── 📄 acesso-medico.html # Acesso para médicos
├── 📄 acesso-paciente.html # Acesso para pacientes
│
├── 🔧 server.js # API Backend (Node.js + Express)
├── 📦 package.json # Dependências e configurações
│
└── 📚 README.md # Documentação

## ⚡ Como Executar o Projeto

### 1. Backend (API)
```bash
# Navegar até a pasta do projeto
cd projeto.consultec

# Instalar dependências
npm install express cors

# Executar servidor
node server.js

A API estará disponível em: http://localhost:3000

🔌 Endpoints da API
GET / - Health check da API

POST /usuarios - Cadastrar novo usuário

POST /login - Autenticar usuário

GET /usuarios - Listar usuários (apenas desenvolvimento)

🎯 Fluxo do Sistema
Para Pacientes:
Cadastro → cadastro.html

Login → login.html

Buscar Profissionais → index.html

Agendar Consulta → Formulário na página principal

Para Profissionais:
Cadastro → Modal no login.html

Login → Área profissional

Cadastrar Horários → Formulário na página principal

🔐 Sistema de Autenticação
Pacientes: Email, CPF, RG e senha

Profissionais: CRM, dados pessoais e especialidade

Sessões: Gerenciadas via sessionStorage

💾 Armazenamento de Dados
Backend: Dados em memória (array)

Frontend: sessionStorage para dados de sessão

Próxima Fase: Integração com banco de dados

🎨 Design e Interface
Tema: Azul profissional (#2563eb)

Layout: Cards e componentes Bootstrap

Responsivo: Mobile-first approach

Ícones: Bootstrap Icons integrados


API não conecta:
Verificar se node server.js está rodando

Confirmar porta 3000 livre

Checar configurações CORS

Erro de CORS no frontend:
Verificar se cors() está habilitado no server.js

Checar URLs das requisições fetch

Dados não persistem:
Os dados são em memória (reiniciam com o servidor)

Para persistência, implementar banco de dados

🚀 Próximas Implementações
Integração com banco de dados (MySQL/PostgreSQL)

Sistema de agendamento completo

Painel administrativo

Notificações por email

Pagamentos online

Histórico de consultas

Avaliações de profissionais

👥 Tipos de Usuário
Pacientes - Buscar profissionais e agendar consultas

Profissionais - Gerenciar horários e consultas

Administradores - Gerenciar toda a plataforma

📞 Suporte
Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.
