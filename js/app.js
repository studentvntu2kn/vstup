

function loadContent(page) {
  const contentDiv = document.getElementById('content');

  if (!contentDiv) {
    console.error("Елемент #content не знайдено.");
    return;
  }

  // Завантаження HTML файлу для вибраної вкладки
  fetch(`pages/${page}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Не вдалося завантажити сторінку ${page}.html. Статус: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      contentDiv.innerHTML = html;
    })
    .catch(error => {
      contentDiv.innerHTML = '<p>Сторінка не знайдена.</p>';
      console.error(error);
    });
}

// Завантаження "Головної" сторінки при запуску
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const content = document.getElementById("content");

  // Завантаження сторінки при першому запуску
  loadPage("home");

  // Додавання подій до всіх кнопок навігації
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      loadPage(page);
    });
  });

  // Функція для завантаження HTML-контенту
  function loadPage(page) {
    // Анімація зникнення контенту
    content.classList.remove("visible");

    setTimeout(() => {
      // Завантаження HTML-контенту для вибраної вкладки
      fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
          content.innerHTML = data;

          // Додавання класу видимості для плавного переходу
          setTimeout(() => content.classList.add("visible"), 50);
        })
        .catch(error => console.error("Помилка завантаження сторінки:", error));
    }, 500); // Час відповідає transition у CSS
  }
});
