# Guia de Testes

Este documento descreve a estrutura de testes do projeto e como executá-los.

## 🧪 Ferramentas Utilizadas

### **Vitest** (Alternativa moderna ao Jest)
- ✅ Framework de testes rápido e moderno
- ✅ Compatível com Vite (mesma configuração)
- ✅ Suporte a TypeScript nativo
- ✅ API similar ao Jest para facilitar migração

### **React Testing Library**
- ✅ Biblioteca recomendada para testes de componentes React
- ✅ Foco em testes baseados em comportamento do usuário
- ✅ Acessibilidade integrada

### **@testing-library/jest-dom**
- ✅ Matchers adicionais para DOM
- ✅ Facilitar assertions (toBeInTheDocument, toHaveClass, etc)

### **@testing-library/user-event**
- ✅ Simulação de interações do usuário
- ✅ Mais realista que fireEvent

### **jsdom**
- ✅ Ambiente DOM simulado para testes
- ✅ Permite testar componentes React sem navegador real

## 📁 Estrutura de Testes

```
tests/
├── unit/                      # Testes unitários
│   ├── components/
│   │   ├── atoms/            # Testes de componentes básicos
│   │   ├── molecules/        # Testes de componentes compostos
│   │   └── organisms/        # Testes de componentes complexos
│   └── utils/                # Testes de utilitários
│       ├── formatDate.test.ts
│       └── planoStatusCalculator.test.ts
├── integration/              # Testes de integração
│   └── PlanoForm.integration.test.tsx
└── utils/                    # Utilitários para testes
    ├── test-utils.tsx        # Helpers e providers
    └── mocks.ts              # Dados mockados
```

## 🚀 Como Executar Testes

### Executar todos os testes
```bash
npm run test
```

### Executar em modo watch (desenvolvimento)
```bash
npm run test:watch
```

### Executar com UI interativa
```bash
npm run test:ui
```

### Gerar relatório de cobertura
```bash
npm run test:coverage
```

## 📝 Tipos de Testes

### Testes Unitários

Testam componentes e funções isoladamente:

**Exemplo - Teste de Componente:**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../../../../src/components/atoms/Button/Button';

describe('Button Component', () => {
  it('should render button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

**Exemplo - Teste de Utilitário:**
```typescript
import { describe, it, expect } from 'vitest';
import { calcularStatusPlano } from '../../../../src/utils/planoStatusCalculator';

describe('calcularStatusPlano', () => {
  it('should return "Não Iniciado" when no actions', () => {
    expect(calcularStatusPlano([])).toBe('Não Iniciado');
  });
});
```

### Testes de Integração

Testam a integração entre múltiplos componentes:

**Exemplo:**
```typescript
describe('PlanoForm Integration Tests', () => {
  it('should submit form with valid data', async () => {
    const mockOnSubmit = vi.fn();
    render(<PlanoForm onSubmit={mockOnSubmit} onCancel={vi.fn()} />);

    // Preencher formulário
    await user.type(screen.getByLabelText(/Título/), 'Plano Teste');
    await user.click(screen.getByText('Salvar'));

    // Verificar submissão
    expect(mockOnSubmit).toHaveBeenCalledWith({
      titulo: 'Plano Teste',
      objetivo: 'Objetivo do plano teste',
    });
  });
});
```

## 🎯 O que Testar?

### Componentes Atoms
- ✅ Renderização correta
- ✅ Props e variantes
- ✅ Estados (disabled, error, etc)
- ✅ Interações (clicks, input)

### Componentes Molecules
- ✅ Composição de atoms
- ✅ Lógica de formulários
- ✅ Validação visual

### Componentes Organisms
- ✅ Fluxos completos
- ✅ Integração com store
- ✅ Validação de formulários

### Utilitários
- ✅ Funções puras
- ✅ Transformações de dados
- ✅ Cálculos

## 📊 Cobertura de Testes

A meta é manter pelo menos **70% de cobertura** nos principais componentes:

- ✅ Componentes críticos (Forms, Cards)
- ✅ Utilitários importantes
- ✅ Lógica de negócio

## 🔧 Configuração

A configuração dos testes está em:
- `vitest.config.ts` - Configuração do Vitest
- `src/test/setup.ts` - Setup global dos testes
- `tests/utils/test-utils.tsx` - Utilitários e helpers

## 💡 Boas Práticas

1. **Teste comportamento, não implementação**: Foque no que o usuário vê e faz
2. **Use queries acessíveis**: Prefira `getByRole`, `getByLabelText` sobre `getByTestId`
3. **Mocks apenas quando necessário**: Evite mocks excessivos
4. **Testes isolados**: Cada teste deve ser independente
5. **Nomes descritivos**: Use `describe` e `it` para documentar o teste

## 📚 Recursos

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

