 
 [
        {
          id: 1,
          title: "O Caminho da Sabedoria",
          author: "João Silva",
          cover:
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
          description:
            "Uma jornada inspiradora para quem busca conhecer as verdades profundas da vida e do pensamento.",
          rating: 5,
        },
        {
          id: 2,
          title: "Tecnologia e Futuro",
          author: "Maria Fernandes",
          cover:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
          description:
            "Explore as tendências tecnológicas que moldarão nosso amanhã e o impacto no cotidiano.",
          rating: 4,
        },
        {
          id: 3,
          title: "Cozinhando com Amor",
          author: "Carla Dias",
          cover:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
          description:
            "Receitas simples, deliciosas e que aquecem o coração para toda a família.",
          rating: 4,
        },
        {
          id: 4,
          title: "Histórias para Dormir",
          author: "Pedro Alves",
          cover:
            "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
          description:
            "Contos mágicos que acompanham os pequenos até o mundo dos sonhos toda noite.",
          rating: 3,
        },
      ];

      const navButtons = document.querySelectorAll(".nav-btn");
      const sections = {
        home: document.getElementById("home"),
        catalog: document.getElementById("catalog"),
        details: document.getElementById("details"),
      };
      const navDetailsBtn = document.getElementById("nav-details-btn");

      // Inicial setup
      function setActiveSection(sectionKey) {
        Object.entries(sections).forEach(([key, el]) => {
          el.classList.toggle("hidden", key !== sectionKey);
        });
        navButtons.forEach((btn) => {
          btn.setAttribute(
            "aria-current",
            btn.dataset.link === sectionKey ? "page" : "false"
          );
          btn.classList.toggle(
            "text-yellow-400",
            btn.dataset.link === sectionKey
          );
        });
        if (sectionKey === "details") {
          navDetailsBtn.classList.remove("invisible");
          navDetailsBtn.setAttribute("aria-disabled", "false");
        } else {
          navDetailsBtn.classList.add("invisible");
          navDetailsBtn.setAttribute("aria-disabled", "true");
        }
      }
      setActiveSection("home");

      // Navegação SPA
      navButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (
            btn.dataset.link === "details" &&
            navDetailsBtn.getAttribute("aria-disabled") === "true"
          )
            return;
          setActiveSection(btn.dataset.link);
        });
      });
      document
        .getElementById("logo")
        .addEventListener("click", () => setActiveSection("home"));

      // Renderiza cards na página do catálogo
      const booksGrid = document.getElementById("booksGrid");
      function renderBooksList(books) {
        booksGrid.innerHTML = "";
        if (books.length === 0) {
          booksGrid.innerHTML =
            '<p class="col-span-full text-center text-yellow-700 font-semibold">Nenhum livro encontrado.</p>';
          return;
        }
        books.forEach((book) => {
          const card = document.createElement("article");
          card.className =
            "bg-white rounded-lg shadow-md flex flex-col overflow-hidden border border-yellow-300 hover:border-yellow-500 transition cursor-pointer select-none";
          card.setAttribute("tabindex", "0");
          card.setAttribute(
            "aria-label",
            `Livro: ${book.title}, autor ${book.author}`
          );

          card.innerHTML = `
          <img src="${book.cover}" alt="Capa do livro ${
            book.title
          }" class="w-full h-52 object-cover" />
          <div class="p-4 flex flex-col flex-grow">
            <h3 class="font-semibold text-lg text-yellow-900">${book.title}</h3>
            <p class="text-yellow-700 italic mb-2">${book.author}</p>
            <div class="flex mb-3">${renderStars(book.rating)}</div>
            <button class="mt-auto bg-yellow-700 text-yellow-100 rounded-md py-1.5 px-4 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Ver mais sobre ${
              book.title
            }">
              Ver mais
            </button>
          </div>
        `;
          // Ao clicar no card ou no botão, vai para detalhes
          card
            .querySelector("button")
            .addEventListener("click", () => showBookDetails(book.id));
          card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              showBookDetails(book.id);
            }
          });
          booksGrid.appendChild(card);
        });
      }

      // Renderiza estrelas amarelas e cinzas para avaliação
      function renderStars(rating) {
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
            starsHTML +=
              '<svg aria-hidden="true" class="star-filled w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><title>Estrela cheia</title><path d="M9.049 2.927C9.349 2.168 10.651 2.168 10.951 2.927l1.172 3.614a1 1 0 0 0 .95.69h3.78c.81 0 1.144 1.038.49 1.448l-3.06 2.22a1 1 0 0 0-.364 1.118l1.172 3.614c.3.76-.7 1.39-1.39 1.08l-3.06-2.22a1 1 0 0 0-1.176 0l-3.06 2.22c-.69.31-1.69-.32-1.39-1.08l1.172-3.614a1 1 0 0 0-.364-1.118L2.64 8.68c-.65-.41-.32-1.45.49-1.45h3.78a1 1 0 0 0 .95-.69l1.172-3.614z" /></svg>';
          } else {
            starsHTML +=
              '<svg aria-hidden="true" class="star-empty w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><title>Estrela vazia</title><path d="M9.049 2.927C9.349 2.168 10.651 2.168 10.951 2.927l1.172 3.614a1 1 0 0 0 .95.69h3.78c.81 0 1.144 1.038.49 1.448l-3.06 2.22a1 1 0 0 0-.364 1.118l1.172 3.614c.3.76-.7 1.39-1.39 1.08l-3.06-2.22a1 1 0 0 0-1.176 0l-3.06 2.22c-.69.31-1.69-.32-1.39-1.08l1.172-3.614a1 1 0 0 0-.364-1.118L2.64 8.68c-.65-.41-.32-1.45.49-1.45h3.78a1 1 0 0 0 .95-.69l1.172-3.614z" /></svg>';
          }
        }
        return starsHTML;
      }

      // Exibe página detalhes com dados do livro selecionado
      const detailsSection = sections.details;
      function showBookDetails(id) {
        const book = booksData.find((b) => b.id === id);
        if (!book) return alert("Livro não encontrado.");
        // Preenche dados
        document.getElementById("detailsTitle").textContent = book.title;
        document.getElementById("detailsAuthor").textContent =
          "Por " + book.author;
        document.getElementById("detailsCover").src = book.cover;
        document.getElementById("detailsCover").alt =
          "Capa do livro " + book.title;
        document.getElementById("detailsDescription").textContent =
          book.description;
        document.getElementById("detailsStars").innerHTML = renderStars(
          book.rating
        );
        // Mostrar detalhes e atualizar navegação
        setActiveSection("details");
      }
      document
        .getElementById("backToCatalog")
        .addEventListener("click", () => setActiveSection("catalog"));

      // Inicial render para catálogo
      renderBooksList(booksData);

      // Busca simples no catálogo
      document
        .getElementById("searchBooksInput")
        .addEventListener("input", (e) => {
          const query = e.target.value.trim().toLowerCase();
          const filteredBooks = booksData.filter(
            (b) =>
              b.title.toLowerCase().includes(query) ||
              b.author.toLowerCase().includes(query)
          );
          renderBooksList(filteredBooks);
        });

      // Carrossel funcional
      (function () {
        const carousel = document.querySelector("#carousel > div");
        const totalSlides = 3;
        let currentIndex = 0;
        const prevBtn = document.getElementById("prevSlide");
        const nextBtn = document.getElementById("nextSlide");

        function updateCarousel() {
          carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        prevBtn.addEventListener("click", () => {
          currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
          updateCarousel();
        });
        nextBtn.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % totalSlides;
          updateCarousel();
        });
        // Auto slide every 6 seconds
        setInterval(() => {
          currentIndex = (currentIndex + 1) % totalSlides;
          updateCarousel();
        }, 6000);
      })();
