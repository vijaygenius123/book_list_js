// Book Class: Represents A Book
class Book {
    constructor(title, author, isbn) {

        this._title = title;
        this._author = author;
        this._isbn = isbn;
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get isbn() {
        return this._isbn;
    }
}

// UI Class: Handles UI Task
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                isbn: '1',
                title: 'Book 1',
                author: 'This Is The First Book'
            },
            {
                isbn: '2',
                title: 'Book 2',
                author: 'This Is The Second Book'
            }
        ]

        const books = StoredBooks;


        books.forEach(function (book) {
            UI.addBookToList(book)
        });
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list')

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.isbn}</td>
        <td>${book.title}</td>
        <td>${book.author}</td> 
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td> 
        `
        list.appendChild(row);

    }

    static clearFields() {
        document.querySelector('#isbn').value = '';
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2000)

    }
}

//Storage Class: Handles Storage
class Store {

    static getBooks() {
        let books;

        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn == isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)
//Event: Add A Book
document.querySelector('#book-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const isbn = document.querySelector('#isbn').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    if (title === '' || author === '' || isbn === '') {
        console.log("Empty")
        UI.showAlert("Please fill all fields", "danger")
    } else {
        const book = new Book(title, author, isbn);
        UI.addBookToList(book);
        UI.showAlert("Book added", 'success')
        UI.clearFields();
    }

})

//Event: Remove A Book
document.querySelector('#book-list').addEventListener('click', function (e) {
    UI.deleteBook(e.target);
    UI.showAlert("Book removed", 'success')
})
