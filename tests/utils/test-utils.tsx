import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

export const renderWithProviders = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { wrapper: Wrapper, ...renderOptions } = options;

  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <BrowserRouter>
        {Wrapper ? <Wrapper>{children}</Wrapper> : children}
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: TestWrapper, ...renderOptions });
};

export {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
  cleanup,
  act,
  fireEvent,
} from '@testing-library/react';

