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
const time = document.querySelector('.time');

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

// Full app with the navigation area
const sec1 = document.querySelector('.section1');
const sec2 = document.querySelector('.section2');
const sec3 = document.querySelector('.section3');
const listBtn = document.getElementById('books-lists');
const addbookBtn = document.getElementById('addNewbook');
const contactBtn = document.getElementById('contact');

// Single page App functions
const listbookShow = () => {
  sec1.classList.remove('no-display');
  sec2.classList.add('no-display');
  sec3.classList.add('no-display');
  listBtn.classList.add('active-btn');
  addbookBtn.classList.remove('active-btn');
  contactBtn.classList.remove('active-btn');
};

const addNewBookShow = () => {
  sec2.classList.remove('no-display');
  sec1.classList.add('no-display');
  sec3.classList.add('no-display');
  addbookBtn.classList.add('active-btn');
  listBtn.classList.remove('active-btn');
  contactBtn.classList.remove('active-btn');
};
const showContact = () => {
  sec3.classList.remove('no-display');
  sec1.classList.add('no-display');
  sec2.classList.add('no-display');
  contactBtn.classList.add('active-btn');
  addbookBtn.classList.remove('active-btn');
  listBtn.classList.remove('active-btn');
};
contactBtn.addEventListener('click', showContact);
listBtn.addEventListener('click', listbookShow);
addbookBtn.addEventListener('click', addNewBookShow);

// TIme function

const setTime = () => {
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDate();
  let minutes = date.getMinutes();
  const hours = date.getHours();
  let seconds = date.getSeconds();

  if (seconds.toString().length < 2) {
    seconds = `0${seconds}`;
  }
  if (minutes.toString().length < 2) {
    minutes = `0${minutes}`;
  }

  const currentTime = `${month} ${day}th ${year}, ${hours}:${minutes}:${seconds}`;
  time.textContent = '';
  time.textContent = `${currentTime}`;
};
setTime();
