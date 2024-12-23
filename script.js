'use strict';

// Создание уникального символа для свойства `birthday`
// Символ гарантирует уникальность свойства и предотвращает его случайное изменение или перебивание
const birthday = Symbol('birthday');

const user = {
    name: 'Alex',
    surname: 'Smith',
    [birthday]: '20/04/2003', // Использование символа в качестве ключа свойства, скрытое от обычного перечисления
    showMyPublicData: function() {
        console.log(`${this.name}${this.surname}`);
    }
};

// `Object.getOwnPropertyDescriptor` возвращает описание свойства объекта:

console.log(Object.getOwnPropertyDescriptor(user, birthday));

// Меняем свойство `showMyPublicData`, делая его неперечисляемым (`enumerable: false`)
// Это значит, что оно больше не будет появляться в циклах, например, for...in
Object.defineProperty(user, 'showMyPublicData', {enumerable: false });

for (let key in user) console.log(key); //  Цикл for...in выводит только перечисляемые свойства объекта

Object.defineProperties(user, {
    name: { writable: false },
    surname: { writable: false }
}); // Устанавливаем флаги для свойств `name` и `surname`, делая их неизменяемыми (`writable: false`)

/*
Флаги свойств объекта:
1. writable: 
   - true: значение свойства можно изменять.
   - false: попытки изменения будут игнорироваться в строгом режиме (будет ошибка).

2. enumerable:
   - true: свойство будет видно в циклах (например, for...in) и методах типа Object.keys().
   - false: свойство не будет перечисляться в циклах и других операциях, связанных с перечислением.

3. configurable:
   - true: свойство можно удалять или изменять его атрибуты (кроме самого configurable).
   - false: любые попытки удалить или изменить флаги свойства (кроме `writable`) вызовут ошибку.
*/
