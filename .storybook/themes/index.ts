import { ThemeValue } from './types/Theme';

type StorybookTheme = {
  color: string;
  class: string;
  default?: boolean;
  name: string;
};

export const storybookThemes = (): StorybookTheme[] => [
  { class: ThemeValue.Default, name: 'Default', default: true, color: '#fff' },
  { class: ThemeValue.Dark, name: 'Dark', color: '#22272B' },
  { class: ThemeValue.Display, name: 'Display', color: '#002033' },
];
