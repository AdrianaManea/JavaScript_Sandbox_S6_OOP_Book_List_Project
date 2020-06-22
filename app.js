// Using Basic ES5 Object Oriented Programming OOP using constructors and prototype methods

// We need two constructors

// Book constructor
// It's going to handle creating the actual book Object
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
};

// UI constructor
// It's going to be a set of prototype methods to do things like:
// - add book to the list
// - delete the book
// - show the alert
// Things that have to do with the UI
// Most of the work will be in the UI constructor
// In the UI function we're not going to pass in anything, it's just going to be a function. Everything else is going to go inside of the prototype
function UI() {}

// Add Book to list
// Create a prototype
UI.prototype.addBookToList = function (book) {
  // console.log(book);

  // Create a variable set to the book list. <tbody> has an #book-list
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // console.log(row);

  // Insert columns
  // Take this <tr> and append html into it. Which will be the actual columns, the <td>
  // We are able to get this because because we passed the book into the prototype method
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  // Append to the list
  list.appendChild(row);
};


// Show Alert
UI.prototype.showAlert = function (message, className) {
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


// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  };
};


// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};


// Event Listeners for add Book
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
    ui.showAlert('Please fill in all filds', 'error')
  } else {
    // Add book to list
    ui.addBookToList(book);

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

  // Show message
  // Once we delete let's show an alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
})