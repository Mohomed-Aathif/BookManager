import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.html'
})
export class BookForm {

  @Input() selectedBook: Book | null = null;

  message = '';

  book: Book = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publicationDate: ''
  };

  constructor(private bookService: BookService) {}

  ngOnChanges() {
    if (this.selectedBook) {
      this.book = { ...this.selectedBook };
    }
  }

  saveBook() {

    if (this.book.id === 0) {

      this.bookService.addBook(this.book).subscribe(() => {
        this.message = "Book added successfully";
        this.resetForm();
        window.location.reload();
      });

    } else {

      this.bookService.updateBook(this.book.id, this.book).subscribe(() => {
        this.message = "Book updated successfully";
        this.resetForm();
        window.location.reload();
      });

    }

  }

  resetForm() {
    this.book = {
      id: 0,
      title: '',
      author: '',
      isbn: '',
      publicationDate: ''
    };
  }

}