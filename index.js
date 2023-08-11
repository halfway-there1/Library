// form elements
const bookTitle = document.querySelector('#book-title');
const author = document.querySelector('#author');
const pageCount = document.querySelector('#page-count');
const readStatus = document.querySelector('#read-status');
const addBookBtn = document.querySelector('#add-book-btn');

const bookContainer = document.querySelector('.book-container');

// actual code begins

const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  let info = `${this.title} by ${this.author}, ${this.pages} pages`;
  info += this.read ? ', read' : ', not read yet';

  return info;
};

let b1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
console.log(b1.info());

addBookBtn.addEventListener('click', (event) => {
  event.preventDefault();
  addBookToLibrary();
});

function addBookToLibrary() {
  library.push(
    new Book(bookTitle.value, author.value, pageCount.value, readStatus.checked)
  );

  const bookEle = createBookElement(library[library.length - 1]);
  bookContainer.append(bookEle);
}

// creates a book-element on the dom using the
// book parameter
function createBookElement(book) {
  const bookEle = document.createElement('div');
  bookEle.classList.add('book');

  const bookInfoEle = document.createElement('p');
  bookInfoEle.textContent = book.info();

  bookEle.append(bookInfoEle);

  return bookEle;
}
