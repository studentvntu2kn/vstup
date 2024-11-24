

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

  // Завантаження "Головної" сторінки при запуску
  loadPage("home");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      loadPage(page);
    });
  });

  function loadPage(page) {
    // Додати клас для зникнення контенту
    content.classList.remove("visible");
    content.classList.add("hidden");

    setTimeout(() => {
      // Завантажити новий контент
      fetch(`pages/${page}.html`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Не вдалося завантажити сторінку ${page}.html. Статус: ${response.status}`);
            }
            return response.text();
          })
          .then(data => {
            content.innerHTML = data;

            // Додати клас для появи нового контенту
            content.classList.remove("hidden");
            content.classList.add("visible");
          })
          .catch(error => {
            content.innerHTML = '<p>Сторінка не знайдена.</p>';
            console.error(error);
          });
    }, 500); // Час відповідає тривалості анімації
  }
});



