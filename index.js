const bookContainer = document.querySelector('.book-container');

const form = document.querySelector('#book-form');
// form elements
const inputs = [...document.querySelectorAll('input')];
const [bookTitle, author, pageCount, readStatus] = inputs;
const addBookBtn = document.querySelector('#add-book-btn');

// actual code begins

const library = [];
let bookIdCounter = 0;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bookId = ++bookIdCounter;
}

Book.prototype.info = function () {
  let info = `${this.title} by ${this.author}, ${this.pages} pages`;
  info += this.read ? ', read' : ', not read yet';

  return info;
};

let b1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);

addBookBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (form.checkValidity()) {
    addBookToLibrary();
  } else {
    form.reportValidity();
  }
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

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', function () {
    console.log('deleted the bookElement', bookEle);
    bookEle.classList.add('fade-out');
    setTimeout(() => {
      bookEle.remove();
    }, 500);
    removeBookById(book.bookId);
  });

  bookEle.append(bookInfoEle, deleteBtn);

  return bookEle;
}

function removeBookById(bookId) {
  const pos = library.findIndex((book) => {
    return book.bookId === bookId;
  });
  console.log(pos);
  console.log('book removed from array', library[pos]);
  library.splice(pos, 1);
}
