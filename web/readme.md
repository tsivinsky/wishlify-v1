# Wishlify Web App

## Tech Stack

### [TypeScript](https://www.typescriptlang.org)

Language for this app

### [React](https://reactjs.org) + [Next.js](https://nextjs.org)

Main UI library and meta-framework for it

### [TailwindCSS](https://tailwindcss.com)

Framework for writing CSS faster and easier

### [React Query](https://tanstack.com/query/latest)

Library for dealing with HTTP requests to api

### [Zustand](https://github.com/pmndrs/zustand)

Library for storing data in stores, lol

### [React Hook Form](https://react-hook-form.com)

Form management library which simplifies a lot of pain when dealing with forms

### [Axios](https://axios-http.com)

Library for making HTTP requests

### [Framer motion](https://www.framer.com/motion)

React animation library

### [Phosphor](https://phosphoricons.com)

Library with pretty icons as React components

## File Structure

```txt
src/
  components/       // React components
    common/         // components created for encapsulating logic
    ui/             // UI Kit
  features/         // each directory inside represent some feature of Wishlify
    api.ts          // file with functions to call API
    ...             // files with queries and mutations which calling `useQuery` and `useMutation` respectively
  layouts/          // React components for page layouts
  lib/              // wrappers for internal dependencies like `axios` and `dayjs`
  pages/            // Next.js directory for app pages
  stores/           // zustand hooks
  types/            // App-wide types
  utils/            // App-wide utility functions
```
