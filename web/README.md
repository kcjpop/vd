### Project structure

All [pages](https://nextjs.org/docs/basic-features/pages) are in `/pages`. We should treat them as entry points and keep them as small as possible. Logic and implementation details should be in `/lib`.

The `/lib` is structured as follows (as of 2022-04-03):

```
lib/
├── api/
├── components/
├── domain-logic/
├── i18n/
├── api.js
├── config.js
└── storage.js
```

- `api/`: All logic to be used in `/pages/api`
- `components/`: JSX components to be used in frontend. Files here should have UpperCamelCase names.
- `domain-logic/`: Backend business logic. Files here should have kebab-case names.
- `i18n/`: All Translation messages
- `api.js`: contains endpoints of all requests made from frontend.
- `config.js`: More or less a bunch of constants
- `storage.js`: For interactions with localStorage

Feel free to create more files/ folders if needed, but remember to write it here.
