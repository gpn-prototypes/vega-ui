# Правила оформления коммитов

## Именование коммитов

Коммиты пишутся на русском языке по спецификации [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Коммиты следует оформлять по шаблону:

    тип_коммита(область изменения): краткое описание изменений

    Подробное описание (опционально)

В проекте используется [commitizen](http://commitizen.github.io/cz-cli/), который позволяет автоматизировать форматирование имен коммитов. Запускается при вызове `git commit`.

## Тип коммита

Позволяет указать тип коммита для автоматического повышения версии библиотеки с помощью `lerna`. [Подробнее о работе lerna](lerna.md).

Возможные типы:

- `fix` – исправление багов, опечаток. Повышает `patch` у версии пакета, если не указаны `BREAKING CHANGE`
- `feat` – добавление новой функциональности. Повышает `minor` у версии пакета, если не указаны `BREAKING CHANGE`
- `test` – добавление и измениение тестов
- `refactor` – рефакторинг кода
- `docs` – добавление и изменине документации
- `chore` – добавление/обновление/настройка инструментов и библиотек

Если в начале подробного описания есть текст `BREAKING CHANGE`, то независимо от типа коммита повышается `major` у версии.

## Область изменения (scope)

Позволяет указать, в какой области репозитория произошло изменение.
Можно выбирать из небольшого предзаданного списка скоупов, но желательно выбирать `custom` и вводить свой.

**Примеры `custom` скоупов:**

    # имена пакетов
    select
    button
    text
    hooks

    # разделы инфраструктуры
    deps
    build
    storybook

    # конкретные файлы
    package.json
    CODEOWNERS

Также можно выбрать `empty` для именования коммита без скоупа.

## Краткое описание изменений

Позволяет кратко указать действие, сделанное в этом коммите.

Шаблон:

    действие (с маленькой буквы) + для какой сущности + (опционально подробности)

Примеры:

> feat(hooks): добавить хук useSelect
> test(select): протестировать очистку
> fix(modal): исправить позиционирование на экранах &lt;500px

## Подробное описание (опционально)

Позволяет указать Breaking change и описание, которое не может уместиться в строку заголовка.

### BREAKING CHANGE

Описание изменений, ломающих обратную совместимость. Breaking change может произойти в коммитах любого типа.

Что относится к ломающим изменениям:

- удаление существующего свойства API компонента
- изменение в работе существующего свойства API

> Пример: пропс `title` отвечал за рендер нативного тултипа через атрибут `title`, а теперь отвечает за вывод видимого текста внутри компонента

- удаление компонента
- отказ от поддержки браузера, который до этого поддерживался
- переименование API/пропсов компонента

> Пример: переименование `autofocus` на `autoFocus`

- изменения в дизайне компонента

> Пример: кнопка была по умолчанию синего цвета, а теперь стала белого

Что не относится к ломающим изменениям:

- рефакторинг компонента, т.е. внутренние изменения, не влияющие на API
- добавление нового API в существующий компонент (например, добавление новых пропсов)

Пример оформления коммита с Breaking change:

> chore(rollup):
> BREAKING CHANGE:
> изменена сборка стилей