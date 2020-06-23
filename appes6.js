class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
};

class UI {
  addBookToList(book) {
    // console.log(book);

    // Create a variable set to the book list. <tbody> has an #book-list
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // console.log(row);

    // Insert columns
    // Take this <tr> and append html into it. Which will be the actual columns, the <td>
    // We are able to get this because we passed the book into the prototype method
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

    // Append to the list
    list.appendChild(row);
  };

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(message));

    // Insert it into the DOM but first
    // Get parent
    // And we're going to use the container
    const container = document.querySelector('.container');

    // Get the form
    // Because we want to put it before the form
    const form = document.querySelector('#book-form');

    // Insert Alert
    // Takes in 23 things:
    // - 1st - what we want to insert - the div, the alert
    // - 2nd - what we want to insert it before - which is the form
    container.insertBefore(div, form);

    // Dissapear after 3 seconds
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  };

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    };
  };

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  };
};

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    };
    return books;
    // So now whenever we want to get whatever is in localStorage we can just use this getBooks()
  };

  static displayBooks() {
    // Get the Books
    const books = Store.getBooks();

    // Loop throught Books
    // Inside forEach we put our call back function
    books.forEach(function (book) {
      // After we get the books we need to put it in the UI
      // We have a class called UI that has a method called addBookToList()
      // So we can simply instantiate that class
      const ui = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  };


  static addBook(book) {
    // Get the Books
    const books = Store.getBooks();
    // We're using the actual Class name(Store) because it is a static method, we don't need to instantiate it

    books.push(book);

    // Set Local Storage
    localStorage.setItem('books', JSON.stringify(books));
  };

  static removeBook(isbn) {
    // console.log(isbn);

    // Get the Books from Local Storage
    const books = Store.getBooks();

    // Loop throught Books
    // Inside forEach we put our call back function
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      };
    });

    // Set Local Storage
    localStorage.setItem('books', JSON.stringify(books));
  };
};


// Event Listener on the DOM Load Event
// We created the display books but it's not being called
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners for Add Book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // console.log('test');

  // Get form values
  // What do we want to happen when we submit? First thing would be to get title, author, isbn fields
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  // console.log(title, author, isbn);

  // Instantiate book
  // Once we submit the form values we want to instantiate the book constructor
  const book = new Book(title, author, isbn);
  // console.log(book);

  // Instantiate UI
  // We want to add a book in out table/ UI objects it's going to take care of that
  const ui = new UI();
  // console.log(ui);

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // alert('Failed');
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to Local Storage
    // We don't need to instatiate it since it's going to be a static method
    Store.addBook(book);

    // Show success
    ui.showAlert('Book Added!', 'success');

    // Clear Fields
    ui.clearFields();
  };

  e.preventDefault();
});


// Event Listener for Delete
// We need to use a parent #book-list, not the delete class
document.getElementById('book-list').addEventListener('click', function (e) {
  // console.log(1323);
  // Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Remove from Local Storage
  // e.target is the icon that we're clicking when deleting, the a tag
  // e.target.parentElement is the tr tag
  // we want to use the isbn which is the sibling of e.target.parentElement
  // we don't want just the element itself but we want what's inside of it
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show message
  // Once we delete let's show an alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});