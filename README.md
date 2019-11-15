# Dynamic Panels
Pure JavaScript addon for dynamically adding and removing html blocks with form elements and preparing for the subsequent sending of structured data to the server

Дополнение на чистом JavaScript для возможности добавления динамических элементов форм на странице. Без зависимостей.
# Installation / Установка
```composer require sazanof/dynamic-panels```

Or you can just download the repo using Git
# Initialization / Инициализация
```
<script src="path/to/polyfills.js"></script>
<script src="path/to/dynamic-panels.js"></script>
<!-- or just
<script src="path/to/dynamic-panels-w-pollyfill.js"></script>
-->
```

# Usage / Использование
```
<script>
    window.addEventListener('DOMContentLoaded',function () {
        DynamicPanels.init('example1','details');
        DynamicPanels.init('example2','dd');
    })
</script>
```
# Dependences
No dependences

# Polyfills
Some Browsers like IE did not understand such methods like **forEach** or **closest** and **match**.
If you want to use it, just include the **pollyfills.js** in you project, or use **dynamic-panels-w-polyfill.js**

Некоторые браузеры (например Internet Explorer) не понимают **forEach**, **closest**, **match**.
Можете использовать **pollyfills.js** в проекте или же просто подключить **dynamic-panels-w-polyfill.js**

#HTML structure / Структура HTML кода
Required html attributes  in child element block