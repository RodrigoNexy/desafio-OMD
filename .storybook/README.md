# Storybook Configuration

Este projeto utiliza o Storybook para documentar e testar componentes isoladamente.

## Como usar

### Iniciar o Storybook

```bash
npm run storybook
```

O Storybook será iniciado em `http://localhost:6006`

### Build do Storybook

```bash
npm run build-storybook
```

## Estrutura

As stories estão organizadas seguindo a estrutura de Atomic Design:

- **Atoms**: Componentes básicos (Button, Badge, Input, Label)
- **Molecules**: Combinações simples (Card, FormField, Modal)
- **Organisms**: Componentes complexos (PlanoCard, AcaoCard)

## Stories disponíveis

### Atoms
- `Button` - Botões com variantes (primary, secondary, danger)
- `Badge` - Badges de status (success, warning, info, danger, secondary)
- `Input` - Campos de entrada (text, email, date, textarea)

### Molecules
- `Card` - Cards reutilizáveis
- `FormField` - Campos de formulário com validação
- `Modal` - Modais para diálogos

## Configuração

O Storybook está configurado para:
- ✅ React 19
- ✅ TypeScript
- ✅ Vite
- ✅ Tailwind CSS
- ✅ Styled Components
- ✅ Tema dark por padrão

Arquivos de configuração:
- `.storybook/main.ts` - Configuração principal
- `.storybook/preview.ts` - Configuração de preview e decorators

