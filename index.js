let bookTitle = document.querySelector('#book-title');
let author = document.querySelector('#author');
let pageCount = document.querySelector('#page-count');
let readStatus = document.querySelector('#read-status');

let addBookBtn = document.querySelector('#add-book-btn');

let bookContainer = document.querySelector('.book-container');

addBookBtn.addEventListener('click', (event) => {
  event.preventDefault();
  addBookToLibrary();
});

function createBookElement(book) {
  let bookEle = document.createElement('div');
  bookEle.classList.add('book');

  let bookInfoEle = document.createElement('p');
  bookInfoEle.textContent = book.info();

  bookEle.append(bookInfoEle);
  bookContainer.append(bookEle);
}

function addBookToLibrary() {
  library.push(
    new Book(bookTitle.value, author.value, pageCount.value, readStatus.checked)
  );
  createBookElement(library[library.length - 1]);
}

let library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    let info = `${this.title} by ${this.author}, ${this.pages} pages`;
    info += read ? ', read' : ', not read yet';
    return info;
  };
}

let b1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);

console.log(b1.info());
