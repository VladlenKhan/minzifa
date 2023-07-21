// Функция для выполнения GET-запроса и заполнения данных в select
function getOptions() {
  const selectOption = document.getElementById("selectOption");

  const apiUrl = "https://gazoblok-bukhara.uz/groups";   

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Очищаем список перед добавлением новых данных
      selectOption.innerHTML = "";

      // Добавляем элементы option на основе полученных данных
      data.forEach(group => {
        const option = document.createElement("option");
        option.value = group.id; // Предполагается, что в ответе API есть поле 'id'
        option.textContent = group.name; // Предполагается, что в ответе API есть поле 'name'
        selectOption.appendChild(option);
      });
    })
    .catch(error => console.error("Error:", error));
}

// Вызываем функцию getOptions() для получения данных перед отображением списка
getOptions();
