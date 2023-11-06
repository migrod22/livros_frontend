"use client"
import React, { useState, useEffect } from "react";
import { createBook, getBooks } from "../api/services";
import CreateBookForm from "./forms/CreateBookForm";

interface IBook {
  id: number;
  title: string;
  author: string;
  published_date: string;
}

const BooksList = () => {
  console.log('booklist')
  const [books, setBooks] = useState<IBook[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  const fetchBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);
      console.log('books', books)
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <h1>Lista de Livros</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>Título:</strong> {book.title} | <strong>Autor:</strong>{" "}
            {book.author} | <strong>Publicado em:</strong> {book.published_date}
          </li>
        ))}
      </ul>
      <button
        className="text-gray-700 bg-gray-500 text-white px-3 py-2 rounded-2xl font-medium cursor-pointer mr-2"
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        Add New Book
      </button>
      {showForm && (
        <CreateBookForm
          setShowForm={setShowForm}
          books={books}
          setBooks={setBooks}
        />
      )}
    </>
  );
};

export default BooksList;
