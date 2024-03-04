import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

export * from '@testing-library/react';

type RenderOptions = Parameters<typeof renderComponent>[1];

export const render = (ui: ReactElement, options?: RenderOptions) => {
  const user = userEvent.setup();
  const result = renderComponent(ui, options);

  return { ...result, user };
};
