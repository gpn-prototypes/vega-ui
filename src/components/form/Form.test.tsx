import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Form, FormProps } from './Form';
import { FormFieldProps } from './FormField';
import { FormFieldsetProps } from './FormFieldset';
import { FormLabelProps } from './FormLabel';
import { FormLegendProps } from './FormLegend';
import { FormRowProps } from './FormRow';

describe('Form', () => {
  describe('Form', () => {
    type Props = Partial<FormProps>;

    const renderForm = (props: Props = {}): RenderResult => render(<Form {...props} />);

    it('рендерится без ошибок', () => {
      expect(renderForm).not.toThrow();
    });
  });

  describe('Field', () => {
    type Props = Partial<FormFieldProps>;

    const renderField = (props: Props = {}): RenderResult => render(<Form.Field {...props} />);

    it('рендерится без ошибок', () => {
      expect(renderField).not.toThrow();
    });
  });

  describe('Fieldset', () => {
    type Props = Partial<FormFieldsetProps>;

    const renderFieldset = (props: Props = {}): RenderResult =>
      render(<Form.Fieldset {...props} />);

    it('рендерится без ошибок', () => {
      expect(renderFieldset).not.toThrow();
    });
  });

  describe('Row', () => {
    type Props = Partial<FormRowProps>;

    const renderRow = (props: Props = {}): RenderResult => render(<Form.Row {...props} />);

    it('рендерится без ошибок', () => {
      expect(renderRow).not.toThrow();
    });
  });

  describe('Label', () => {
    type Props = Partial<FormLabelProps>;

    const renderLabel = (props: Props = {}): RenderResult => render(<Form.Label {...props} />);

    it('рендерится без ошибок', () => {
      expect(renderLabel).not.toThrow();
    });
  });

  describe('Legend', () => {
    type Props = Partial<FormLegendProps>;

    const renderLabel = (props: Props = {}): RenderResult => render(<Form.Legend {...props} />);

    it('рендерится без ошибок', () => {
      expect(renderLabel).not.toThrow();
    });
  });
});
