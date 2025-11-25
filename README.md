# Sistema de Plano de Ação - OMD SOLUÇÕES

## 🎯 Sobre o Projeto

Sistema completo de gestão de planos de ação que permite criar, visualizar, editar e cancelar planos, além de gerenciar ações individuais com seus status e prazos. O status do plano é calculado automaticamente com base no status das ações associadas.

## 📸 Screenshots


### Página Inicial
<img width="1876" height="943" alt="image" src="https://github.com/user-attachments/assets/5dc077a4-1c5a-4643-b9f9-9ef05dda6ce9" />

### Detalhes do Plano
<img width="1875" height="941" alt="image" src="https://github.com/user-attachments/assets/2bec6f82-ebed-4e0f-a22f-5b8d5bf21d74" />

### Formulários
<img width="1838" height="944" alt="image" src="https://github.com/user-attachments/assets/db733771-40da-43e4-aaac-e18d79505845" />
<img width="1874" height="935" alt="image" src="https://github.com/user-attachments/assets/f564afaa-1255-4744-922e-e19aa2e1255d" />
<img width="1868" height="936" alt="image" src="https://github.com/user-attachments/assets/88de376c-94b9-4bd7-b51a-4ab8ebd78704" />
<img width="1877" height="941" alt="image" src="https://github.com/user-attachments/assets/5265fe36-4c10-4dc3-9879-1cf5c02eded5" />

---

## 🛠️ Requisitos Técnicos

### Framework
- **React 18** (Obrigatório) - Biblioteca JavaScript para construção de interfaces de usuário

### Linguagem
- **TypeScript** - Escolhido para tipagem estática, melhor autocomplete, detecção de erros em tempo de desenvolvimento e melhor manutenibilidade do código

### Gerenciador de Pacotes
- **npm** - Gerenciador de pacotes padrão do Node.js

### Build Tool
- **Vite** - Escolhido pela velocidade de desenvolvimento (HMR instantâneo), build otimizado para produção e suporte nativo a TypeScript e ES modules

### Comunicação
- **API REST Simulada** - Implementada com `localStorage` para persistência de dados, simulando chamadas assíncronas com delay realista

### Tecnologias Adicionais

- **Tailwind CSS** - Framework CSS utility-first para estilização rápida e consistente. Utilizado como solução principal de estilização no projeto.

- **Styled Components** - Biblioteca CSS-in-JS utilizada no componente `Button` (`src/components/atoms/Button/Button.styled.ts`) para demonstrar conhecimento em estilização CSS-in-JS. O componente Button utiliza Styled Components para estilos dinâmicos baseados em props (variantes: primary, secondary, danger), enquanto o restante do projeto utiliza Tailwind CSS para estilização utilitária.

- **Zustand** - Biblioteca leve para gerenciamento de estado global
- **React Hook Form** - Biblioteca para gerenciamento eficiente de formulários
- **Zod** - Validação de esquemas TypeScript-first
- **React Router DOM** - Roteamento client-side
- **Vitest** - Framework de testes unitários
- **React Testing Library** - Utilitários para testar componentes React

### Por que essas escolhas?

- **TypeScript**: Aumenta a confiabilidade do código através de tipagem estática, facilitando refatorações e reduzindo bugs em produção
- **Vite**: Oferece uma experiência de desenvolvimento superior ao Webpack/CRA, com servidor de desenvolvimento mais rápido e build otimizado
- **Tailwind CSS + Styled Components**: Abordagem híbrida que combina a produtividade do Tailwind para estilização comum com o poder do CSS-in-JS (Styled Components) para componentes que precisam de lógica de estilo complexa, demonstrando conhecimento em ambas as abordagens. O Tailwind é usado para a maioria dos componentes, enquanto o Styled Components é usado especificamente no Button para mostrar proficiência em CSS-in-JS.

---

## 📁 Arquitetura do Projeto

### Design System - Atomic Design

O projeto segue a metodologia **Atomic Design**, organizando os componentes em uma hierarquia clara e escalável:

- **Atoms**: Componentes básicos (Button, Input, Label, Badge, Loading, ErrorMessage)
- **Molecules**: Combinações simples (Card, FormField, Modal)
- **Organisms**: Componentes complexos (PlanoCard, AcaoCard, PlanoForm, AcaoForm, UpdatePrazoForm)
- **Templates**: Estruturas de página (Layout)

**Benefícios**: Organização clara, reutilização, escalabilidade e facilita colaboração.

### Estrutura de Pastas

```
src/
├── components/         # Componentes (Atomic Design)
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── pages/              # Páginas da aplicação
├── store/              # Estado global (Zustand)
├── utils/              # Utilitários e API mockada
├── types/              # Tipos TypeScript
├── schemas/            # Schemas de validação (Zod)
└── test/               # Configuração de testes
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20.19+ ou 22.12+ (recomendado para Vite 7.2.4+)
- npm

> ⚠️ **Importante**: Este projeto requer Node.js versão 20.19 ou superior (ou 22.12+). Versões anteriores como Node.js 18.x não são compatíveis com Vite 7.x.
>
> ⚠️ **Nota sobre versões intermediárias**: Versões como Node.js 22.6.0 podem funcionar, mas gerarão avisos durante a instalação. Para evitar avisos, use Node.js 20.19+ ou 22.12+.

### Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# A aplicação estará disponível em http://localhost:5173
```

> ✅ **Versões testadas e funcionais**: Node.js 22.6.0+, 22.16+, 20.19+ e 22.12+

#### Limpar e Reinstalar Dependências (se necessário)

**No PowerShell (Windows):**
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

**No Bash/Linux/Mac:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build para Produção

```bash
# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

---

## 🧪 Como Testar

### Executar Testes

```bash
# Executar todos os testes
npm run test

# Testes em modo watch (re-executa ao salvar arquivos)
npm run test:watch

# Cobertura de testes
npm run test:coverage
```

### Testes Implementados

- Testes unitários de componentes (Button, Input, Badge, Card, FormField)
- Testes de utilitários (planoStatusCalculator)
- Testes de integração (PlanoForm)

### Estrutura de Testes

```
tests/
├── unit/
│   ├── components/
│   │   ├── atoms/
│   │   └── molecules/
│   └── utils/
└── integration/
```

---

## 🎨 Funcionalidades

### Planos de Ação

- ✅ Criar novos planos de ação (título e objetivo)
- ✅ Editar planos existentes
- ✅ Deletar planos
- ✅ Visualizar detalhes do plano
- ✅ Status automático baseado nas ações (Não Iniciado, Em Andamento, Concluído)

### Ações

- ✅ Adicionar ações a um plano (descrição e prazo)
- ✅ Deletar ações
- ✅ Atualizar status das ações (A Fazer → Fazendo → Feita)
- ✅ Atualizar prazo das ações
- ✅ Validação robusta de formulários com mensagens de erro

### Interface

- ✅ Design dark tech com tema azul
- ✅ Responsivo
- ✅ Loading states durante operações
- ✅ Tratamento de erros com mensagens amigáveis
- ✅ Persistência local (localStorage) - dados não são perdidos ao recarregar
- ✅ Animações suaves
- ✅ Lazy loading de páginas
- ✅ Otimizações de performance (React.memo, useCallback, useMemo)

---

## 📝 Detalhes Técnicos

### Gerenciamento de Estado

A aplicação utiliza **Zustand** para gerenciamento de estado global:

- Estado centralizado dos planos e ações
- Loading states
- Tratamento de erros
- Ações assíncronas para API mockada

### API Mockada

A aplicação utiliza uma API mockada com persistência em `localStorage`:

- CRUD completo de planos de ação
- CRUD completo de ações
- Cálculo automático de status do plano baseado nas ações
- Persistência entre recarregamentos de página

### Validação de Formulários

Validação implementada com **React Hook Form** + **Zod**:

- Validação em tempo real
- Mensagens de erro personalizadas
- Type-safe validation schemas

### Performance

Otimizações implementadas:

- **Lazy Loading**: Páginas carregadas sob demanda com `React.lazy()` e `Suspense`
- **React.memo**: Aplicado em todos os componentes para evitar re-renderizações desnecessárias
- **useCallback**: Handlers memoizados nas páginas
- **useMemo**: Cálculos pesados memoizados (ordenação, status, progresso)

---
