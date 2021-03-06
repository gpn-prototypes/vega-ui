import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { Button } from '../button';

import { FileInput, FileInputProps } from './FileInput';

function renderComponent(props?: Partial<FileInputProps>): RenderResult {
  return render(
    <FileInput id="test-input" {...props}>
      {(buttonProps): React.ReactNode => <Button {...buttonProps} />}
    </FileInput>,
  );
}

describe('FileInput', () => {
  test('рендерится без ошибок', () => {
    renderComponent();
  });

  test('вызывается onChange', () => {
    const onChange = jest.fn();
    const { queryByLabelText } = renderComponent({ onChange });

    const input = queryByLabelText('File input');

    if (input) {
      fireEvent.change(input);
    }

    expect(onChange).toBeCalled();
  });

  test('отрабатывает рендер children', async () => {
    const { findByLabelText } = render(
      <FileInput id="test-input" onChange={jest.fn}>
        <div aria-label="divininput">div</div>
      </FileInput>,
    );

    const div = await findByLabelText('divininput');

    expect(div).toBeInTheDocument();
  });
});
