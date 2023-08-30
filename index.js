const bookContainer = document.querySelector('.book-container');

const modal = document.getElementById('modal');
const modalBtn = document.getElementById('modalBtn');

const form = document.querySelector('#book-form');
// form elements
const inputs = [...document.querySelectorAll('input')];
const [bookTitle, author, pageCount, readStatus] = inputs;
const addBookBtn = document.querySelector('#add-book-btn');
const cancelBtn = document.querySelector('#cancel-btn');

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

modalBtn.addEventListener('click', () => modal.showModal());
cancelBtn.addEventListener('click', (event) => {
  event.preventDefault();
  modal.close();
});

addBookBtn.addEventListener('click', (event) => {
  // event.preventDefault();
  if (form.checkValidity()) {
    addBookToLibrary();
    // TODO
    form.reset();
    modal.close();
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

function makeElement(tag, classes, content) {
  const element = document.createElement(tag);
  element.classList = classes.join(' ');
  element.textContent = content;

  return element;
}

// creates a book-element on the dom using the
// book parameter
function createBookElement(book) {
  const bookEle = makeElement('div', ['book'], '');

  const children = [
    makeElement('p', ['title'], book.title),
    makeElement('p', ['author'], book.author),
    makeElement('p', ['page-count'], book.pages + ' pages'),
    makeElement(
      'p',
      [book.read ? 'read' : 'not-read'],
      book.read ? 'Read' : '! Read'
    ),
    makeElement('button', ['deleteBtn'], 'Delete'),
  ];
  console.log(children);

  const [, , , readBtn, deleteBtn] = children;

  readBtn.addEventListener('click', function () {
    if (this.textContent === 'Read') {
      this.textContent = '! Read';
      this.classList = 'not-read';
      book.read = false;
    } else {
      this.textContent = 'Read';
      this.classList = 'read';
      book.read = true;
    }
  });

  deleteBtn.addEventListener('click', function () {
    console.log('deleted the bookElement', bookEle);
    bookEle.classList.add('fade-out');
    setTimeout(() => {
      bookEle.remove();
    }, 500);
    removeBookById(book.bookId);
  });

  bookEle.append(...children);

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
