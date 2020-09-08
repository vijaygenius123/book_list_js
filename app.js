// Book Class: Represents A Book
class Book {
    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get isbn() {
        return this._isbn;
    }

    constructor(title, author, isbn) {

        this._title = title;
        this._author = author;
        this._isbn = isbn;
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

    static clearFields(){
        document.querySelector('#isbn').value = '';
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
}

//Storage Class: Handles Storage

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)
//Event: Add A Book
document.querySelector('#book-form').addEventListener('submit',function(e){
    e.preventDefault();

    const isbn = document.querySelector('#isbn').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    const book = new Book(title,author,isbn);

    UI.addBookToList(book);
    UI.clearFields();

})

//Event: Remove A Book
document.querySelector('#book-list').addEventListener('click', function (e){
    UI.deleteBook(e.target);
})
