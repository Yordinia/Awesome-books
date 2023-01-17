/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */

const book = JSON.parse(localStorage.getItem('our-books')) || [{
  title: 'The Great Gatsby', author: 'F. Scott Fitzgerald',
}, {
  title: 'Jane Eyre', author: 'Charlotte Bronte',
}];

const inputTitle = document.querySelector('#text');
const inputAuthor = document.querySelector('#txt');
const myButton = document.querySelector('.btn-list');
const list = document.getElementById('book-list');
const books = document.querySelector('.books');

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static disp() {
    if (book.length === 0) {
      list.innerText = 'No Books To Display';
      return 0;
    }
    list.innerHTML = '';
    let i = -1;
    book.forEach((item) => {
      const tr = document.createElement('tr');
      tr.setAttribute('class', 'book-row');
      tr.innerHTML = ` <td>"${item.title}" &nbsp by &nbsp ${item.author}</td> 
        <td><button class="delete-btn btn btn-outline-primary" id="${i += 1}">Remove</button></td>
      `;
      list.appendChild(tr);
    });
    const buttonItem = document.querySelectorAll('.delete-btn');
    buttonItem.forEach((item) => {
      item.addEventListener('click', (e) => {
        const delButton = e.target;
        list.deleteRow(delButton.id);
        book.splice(delButton.id, 1);
        localStorage.setItem('our-books', JSON.stringify(book));
        Books.disp();
      });
    });
    return 0;
  }

  static addBook(e) {
    if (inputTitle.value && inputAuthor.value !== '') {
      e.preventDefault();
      const bookData = new Books(inputTitle.value, inputAuthor.value);
      book.push(bookData);
      localStorage.setItem('our-books', JSON.stringify(book));
      Books.disp();
      document.querySelector('form').reset();
    }
  }
}

myButton.addEventListener('click', Books.addBook);

Books.disp();