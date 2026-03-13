import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { BookForm} from '../book-form/book-form';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookForm],
  templateUrl: './book-list.component.html'
})
export class BookList implements OnInit {

  books: Book[] = [];
  selectedBook: Book | null = null;

  constructor(private bookService: BookService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.cd.detectChanges();
    });
  }

  deleteBook(id: number) {
    if (confirm("Are you sure you want to delete this book?")) {

    this.bookService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });

  }
  }

  editBook(book: Book) {
    this.selectedBook = book;
  }
}