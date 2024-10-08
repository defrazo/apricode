# ApriTask

ApriTask - это веб-приложение для управления задачами, созданное с использованием React и Vite.

## Установка

**1. Клонируйте репозиторий:**
   git clone https://github.com/defrazo/apricode.git
   
**2. Перейдите в директорию проекта:**
  cd apricode/client
  
**3. Установите зависимости. Убедитесь, что у вас установлены Node.js и npm. Затем выполните:**
npm install

**4. Чтобы запустить проект в режиме разработки, используйте следующую команду:**
npm run dev

**5. Чтобы собрать и запустить проект, используйте следующие команды:**
npm run build
npm run preview


**Примечание по работе приложения:**
Задачи сохраняются в localStorage, поэтому при первом запуске у Вас не будет списка задач. 
Чтобы он появился, необходимо добавить задачу с помощью диалогового окна в правой части экрана.

Кнопка "Новая задача" добавит родительскую задачу. При этом задача добавится как с пустыми полями, так и со значениями. 
Зависит от того, будут ли введены "Название" и "Описание" до момента нажатия кнопки "Добавить задачу". То же самое с подзадачами.

Чтобы отредактировать задачу, необходимо активировать ее нажатием в центр плашки (там где название), она загорится зеленоватым выделением 
и окно в правой части экрана изменится. Появятся кнопки "Сохранить", "Добавить подзадачу", "Удалить".

Сохранение введенных значений осуществляется тремя способами:
- нажатием кнопки "Сохранить";
- нажатием клавиши "Enter";
- кликом вне списка задач и диалогового окна задачи (в пустые поля). Также данное действие снимет выделение с активной задачи.

Поиск осуществляется только по заголовкам родительских задач.

В правом нижнем углу экрана присутствует кнопка смены цветовой темы (темная / светлая). Значение сохраняется в localStorage и будет доступно после перезагрузки.
Да, мне тоже не нравятся цвета в светлой теме.
