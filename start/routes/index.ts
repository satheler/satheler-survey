/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/resource.ts
| ├── start/routes/another_resource.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './resource'
| import './another-resource'
|
| OR inside a group
|
| require('resource')
| require('another-resource')
|
*/

import { readdirSync } from 'fs'
import path from 'path'

readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-4) !== '.map'))
  .forEach((file) => {
    const route = path.join(__dirname, file)
    require(route)
  })
