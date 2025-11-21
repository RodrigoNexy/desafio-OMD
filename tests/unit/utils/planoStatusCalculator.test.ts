import { describe, it, expect } from 'vitest';
import { calcularStatusPlano } from '../../../src/utils/planoStatusCalculator';
import type { Acao } from '../../../src/types';

describe('calcularStatusPlano', () => {
  it('should return "Não Iniciado" when no actions', () => {
    const acoes: Acao[] = [];
    expect(calcularStatusPlano(acoes)).toBe('Não Iniciado');
  });

  it('should return "Não Iniciado" when all actions are "A Fazer"', () => {
    const acoes: Acao[] = [
      { id: '1', acao: 'Ação 1', status: 'A Fazer', prazo: new Date().toISOString() },
      { id: '2', acao: 'Ação 2', status: 'A Fazer', prazo: new Date().toISOString() },
    ];
    expect(calcularStatusPlano(acoes)).toBe('Não Iniciado');
  });

  it('should return "Em Andamento" when at least one action is "Fazendo"', () => {
    const acoes: Acao[] = [
      { id: '1', acao: 'Ação 1', status: 'A Fazer', prazo: new Date().toISOString() },
      { id: '2', acao: 'Ação 2', status: 'Fazendo', prazo: new Date().toISOString() },
    ];
    expect(calcularStatusPlano(acoes)).toBe('Em Andamento');
  });

  it('should return "Em Andamento" when some actions are done but not all', () => {
    const acoes: Acao[] = [
      { id: '1', acao: 'Ação 1', status: 'Feita', prazo: new Date().toISOString() },
      { id: '2', acao: 'Ação 2', status: 'A Fazer', prazo: new Date().toISOString() },
    ];
    expect(calcularStatusPlano(acoes)).toBe('Em Andamento');
  });

  it('should return "Concluído" when all actions are "Feita"', () => {
    const acoes: Acao[] = [
      { id: '1', acao: 'Ação 1', status: 'Feita', prazo: new Date().toISOString() },
      { id: '2', acao: 'Ação 2', status: 'Feita', prazo: new Date().toISOString() },
    ];
    expect(calcularStatusPlano(acoes)).toBe('Concluído');
  });
});

