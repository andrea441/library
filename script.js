const myLibrary = [];

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

function displayBooks() {
  for (const book of myLibrary) {
    const title = document.createElement("h2");
    title.textContent = book.title;
  }
}
