import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const newRequire = (path) => require(path)
export const readJSON = (path) => require(path)
