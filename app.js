ClassicEditor.create(document.querySelector("#myeditor"), {
  removePlugins: ["Heading"],
  toolbar: ["italic", "link", "bold"], // Include 'bold' in the toolbar configuration
})
.then((newEditor) => {
  editor = newEditor;
})
.catch((error) => {
  console.log(error);
});

// Функция для выполнения GET-запроса и заполнения данных в select
function getOptions() {
  const selectOption = document.getElementById("selectOption");
  const apiUrl = "https://gazoblok-bukhara.uz/groups"; // URL вашего API

  fetch(apiUrl, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Очищаем список перед добавлением новых данных
      selectOption.innerHTML = "";

      // Добавляем элементы option на основе полученных данных
      data.forEach((group) => {
        const option = document.createElement("option");
        option.value = group.id; // Предполагается, что в ответе API есть поле 'id'
        option.textContent = group.name; // Предполагается, что в ответе API есть поле 'name'
        selectOption.appendChild(option);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// Вызываем функцию getOptions() для получения данных перед отображением списка
getOptions();

// Обработчик события при нажатии на кнопку "Отправить"
// ... (предыдущий код)

// Обработчик события при нажатии на кнопку "Отправить"
function submitData() {
  const form = document.querySelector("#dataForm");
  const emailInputValue = document.getElementById("emailInput").value;
  const myeditorValue = textByRegex(editor.getData());
  const selectOptionValue = document.getElementById("selectOption").value;
  const messageElement = document.getElementById("message");
  
  // Формируем объект с данными для отправки на сервер
  const formData = {
    question: emailInputValue,
    answer: myeditorValue, // Use the sanitized value here
    group_id: parseInt(selectOptionValue), // Преобразуем значение в число
  };

  // Выполняем POST-запрос к API
  const apiUrl = "https://gazoblok-bukhara.uz/question";
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Преобразуем объект в JSON-строку для отправки
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Ответ сервера:", data); // Выводим ответ сервера в консоль

      // Выводим сообщение об успешной отправке ниже формы
      messageElement.textContent = "Данные успешно отправлены!";

      // Очищаем значения элементов формы после успешной отправки данных
      form.reset();
      editor.setData(""); // Очищаем содержимое редактора

      // Очищаем список данных в selectOption
      const selectOption = document.getElementById("selectOption");
      selectOption.innerHTML = "";

      // Вызываем функцию getOptions() для обновления данных в selectOption
      getOptions();

      // Очищаем сообщение об успешной отправке через некоторое время (например, 5 секунд)
      setTimeout(() => {
        messageElement.textContent = "";
      }, 5000);
    })
    .catch((error) => console.error("Error:", error));
}


function textByRegex(str) {
  // Заменяем &nbsp; на перенос строки
  const stringWithLineBreaks = str.replace(/&nbsp;/g, '\n');
  
  // Удаляем все теги кроме разрешенных
  const sanitizedValue = stringWithLineBreaks.replace(/<(?!\/?(a|strong|i|b)\b)[^>]*>/gi, "");
  
  return sanitizedValue;
}
