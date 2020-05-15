# @gpn-prototypes/vega-page-banner

Компонент "Баннер страницы"

<img src="docs/page-banner.jpg" />

### Установка

```
yarn add @gpn-prototypes/vega-page-banner
```

### Примеры использования

```jsx
import { PageBanner } from '@gpn-prototypes/vega-page-banner';
export const MyComponent = () => {
  return <PageBanner className="footer" title="Заголовок" description="Описание" />;
};
```

### API

```ts
type PageBannerProps = {
  className?: string;
  title?: string;
  description?: string;
};
```