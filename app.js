// Book Class: Represents A Book
class Book{
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

//Storage Class: Handles Storage

//Event: Display Books

//Event: Add A Book

//Event: Remove A Book
