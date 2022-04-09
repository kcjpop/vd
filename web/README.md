## Table of Content

- [Project structure](#project-structure)
- [Hooks](#hooks)
  - [`useDropdown`](#-usedropdown-)

## Project structure

All [pages](https://nextjs.org/docs/basic-features/pages) are in `/pages`. We should treat them as entry points and keep them as small as possible. Logic and implementation details should be in `/lib`.

The `/lib` is structured as follows (as of 2022-04-09):

```
lib/
├── components/
├── context/
├── domain-logic/
├── i18n/
├── api.js
├── config.js
└── storage.js
```

- `components/`: JSX components to be used in frontend. Files here should have UpperCamelCase names.
- `context/`: React Context
- `domain-logic/`: Backend business logic. Files here should have kebab-case names.
- `i18n/`: All Translation messages
- `api.js`: contains endpoints of all requests made from frontend.
- `config.js`: More or less a bunch of constants
- `storage.js`: For interactions with localStorage

Feel free to create more files/ folders if needed, but remember to write it here.

## Hooks

### `useDropdown`

Located in `lib/components/useDropdown.js`.

Based on `@floating-ui` and composed as a single hook 👉 [Read tutorial](https://floating-ui.com/docs/tutorial).

**Basic usage:**

```jsx
import { useDropdown } from '../useDropdown'

const {
  isOpen,
  referenceProps,
  doOpenDropdown,
  doCloseDropdown,
  floatingProps,
} = useDropdown()

// This is a `reference` in @floating-ui terminology
<button
    {...referenceProps()}
    onClick={doOpenDropdown}
    onBlur={doCloseDropdown}
  />
  Show
</div>

// And this is `floating`
{isOpen && (
  <div
    className="w-40"
    {...floatingProps()}>
    Hello from here
  </div>
)}
```

`useDropdown()` can accept some configurations, e.g. `useDropdown({ placement: 'bottom-end', offset: 2 })`. Check `lib/components/useDropdown.js` for the latest settings. We can also pass in @floating-ui's middlewares here.

```jsx
// size is a re-exported middleware
import { useDropdown, size } from '../useDropdown'

const [sizeData, setSizeData] = useState()
const {
  ...
} = useDropdown({
  middleware: [size({ apply: setSizeData, padding: 10 })],
})
```
