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
```

# Usage / Использование
```
<script>
    window.addEventListener('DOMContentLoaded',function () {
        var ex1 = new DynamicPanels({
            id:'example1',
            name_key:'details'
        }).init();
        var ex2 = new DynamicPanels({
            id: 'example2',
            name_key: 'dd',
            classes: {
                inner :'.custom_dp_class',
                header : '.custom_dp_class-header',
                title : '.custom_dp_class-title',
                actions : '.custom_dp_class-actions'
            }
        }).init();
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

# HTML structure / Структура HTML кода
Required html attributes  in child element block.
Обязательные атрибуты элементов:
 ```
 <div id="example1"> <!--ID of element-- >
     <div class="dynamic" data-pos="1"> <!-- basic class and data-pos=1 -- >
         <div class="dynamic-header"><!-- basic class -- >
             <div class="dynamic-title"><!-- basic class -- >
                 Position #<span>1</span><!-- span required! -- >
             </div>
             <div class="dynamic-actions"><!-- basic class -- >
                 <span class="btn" data-plus>+</span><!-- data-plus -- >
                 <span class="btn" data-minus>-</span><!-- data-plus -- >
             </div>
         </div>
         <div class="form-group-inner">
             <input type="text" name="details[1][title]"><!-- name like this -- >
         </div>
     </div>
 </div>
 ```
Name structure like name_key - **details**[**1** - basic number][**title** - your subkey]