class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="" class="delete">x</a></td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add class name
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get Form
    const form = document.querySelector('#book-form');
    // Insert Alert
    container.insertBefore(div, form);

    // Timeout after 3 secon
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 2000);
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Event Listeners for Add Book
document.getElementById('book-form').addEventListener('submit', function(e) {
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instatiate a book details
  const book = new Book(title, author, isbn);

  // Instatiate the UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error Alert
    ui.showAlert('Please fill in all the fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Clear the Fields once submitted
    ui.clearFields();
    
    // Success Adding the book 
    ui.showAlert('Successfully added the book', 'success')
    console.log(book);
  }
  
  e.preventDefault();
});

// Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function(e) {
  ui = new UI();

  ui.deleteBook(e.target);

  // Show alert
  ui.showAlert('Book removed', 'success');

  e.preventDefault();
});