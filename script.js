const myLibrary = [];

// Query Selectors
const books = document.querySelector(".books");

const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#add-book");
const closeButton = document.querySelector("#close-modal");

class Book {
  id = crypto.randomUUID();

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    let readText = this.read ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${pages} pages, ${readText}.`;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);

  return newBook;
}

function removeBookFromLibrary(bookId) {
  const index = myLibrary.findIndex((book) => book.id === bookId);

  if (index > -1) {
    myLibrary.splice(index, 1);
  }
}

function toggleBookReadStatus(bookId) {
  const index = myLibrary.findIndex((book) => book.id === bookId);

  if (index > -1) {
    myLibrary[index].toggleRead();
  }
}

function createBookInfo(type, value) {
  const p = document.createElement("p");
  const legend = document.createElement("strong");
  legend.textContent = `${type}:`;
  p.append(legend, ` ${value}`);

  return p;
}

function createBookDisplay(book) {
  const card = document.createElement("div");
  card.classList.add("book");
  card.setAttribute("data-id", book.id);

  const title = document.createElement("h2");
  title.textContent = book.title;

  const bookDetails = document.createElement("div");
  bookDetails.classList.add("book-details");

  readText = book.read ? "Yes" : "No";

  bookDetails.append(
    createBookInfo("Author", book.author),
    createBookInfo("Pages", book.pages),
    createBookInfo("Read", readText),
  );

  const cardButtons = document.createElement("div");
  cardButtons.classList.add("book-buttons");

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-btn");
  removeButton.textContent = "Remove Book";

  const readButton = document.createElement("button");
  readButton.classList.add("read-btn");
  readButton.textContent = "Mark As Read";

  cardButtons.append(removeButton, readButton);

  card.append(title, bookDetails, cardButtons);

  return card;
}

function getInputData() {
  return {
    title: titleInput.value,
    author: authorInput.value,
    pages: Number(pagesInput.value),
    read: readInput.checked,
  };
}

function displayBooks() {
  books.replaceChildren();
  for (const book of myLibrary) {
    const card = createBookDisplay(book);
    books.append(card);
  }
}

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const { title, author, pages, read } = getInputData();

  addBookToLibrary(title, author, pages, read);

  displayBooks();

  form.reset();
  dialog.close();
});

books.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const card = e.target.closest(".book");

    removeBookFromLibrary(card.dataset.id);

    displayBooks();
  } else if (e.target.classList.contains("read-btn")) {
    const card = e.target.closest(".book");

    toggleBookReadStatus(card.dataset.id);

    displayBooks();
  }
});

displayBooks();
