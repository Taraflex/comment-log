# comment-log

Логирование js выражений на основе комментариев в nodejs

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/Taraflex/comment-log/blob/master/LICENSE)

## Установка
```sh
npm install comment-log --save
```

## Использование

Устанавливаем NODE_ENV=development

Подключаем в главном модуле раньше всех остальных модулей
```js
require('comment-log');
```
В модулях за исключением модуля, где подключали ```require('comment-log')```, используем комментарий вида
```js
const a = [1, 2, 3, 4] /* 
-> a.filter(v => v % 2)
-> process.argv 
-> <любое валидное js выражение>
*/
module.exports = { a }
```
Либо в одну строку 
```js
const a = [1, 2, 3, 4] /*-> a.filter(v => v % 2) -> process.argv*/
```