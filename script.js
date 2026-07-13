const myLibrary = [];

// test code
const bookTest = new Book("Gideon The Ninth", "Tamsyn Muir", 456, true);
const bookTest2 = new Book("The Stranger", "Albert Camus", 173, false);
const bookTest3 = new Book("The Stranger", "Albert Camus", 173, false);

myLibrary.push(bookTest, bookTest2, bookTest3);

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#add-book");
const closeButton = document.querySelector("#close-modal");

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    let readText = this.read ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${pages} pages, ${readText}.`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);

  return newBook;
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

  card.append(title, bookDetails);

  return card;
}

function displayBooks() {
  const books = document.querySelector(".books");

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

displayBooks();
