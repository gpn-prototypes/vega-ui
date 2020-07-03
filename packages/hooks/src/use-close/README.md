# useClose

Хук стоит использовать, если вам необходим метод для закрытия элемента (модальное окно, дропдаун и т.д.).

### Пример использования

```ts
const { isOpen, setIsOpen, close } = useClose(true);
```

В хук передается `ts initialOpen: boolean`, который определяет открыт компонент изначально или нет.