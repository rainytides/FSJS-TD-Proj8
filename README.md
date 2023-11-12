# FSJS-TD-Proj8
# Treehouse FSJS Eighth Project: SQL Library Manager

## Description

This SQL library manager is a full-stack web application built with Node.js, Express, Sequelize ORM, and Pug templating engine. It provides a platform to manage a collection of books, allowing users to view, search, add, update, and delete books. The application features a paginated display of books and a search functionality for efficient navigation.

## Technical Details

- **Node.js & Express**: Used for creating the server-side application.
- **Sequelize ORM**: Provides a way to interact with the SQLite database using models.
- **Pug Templating Engine**: Used for generating HTML based on server-side data.
- **Pagination**: Implemented to navigate through large numbers of book entries.
- **Search Functionality**: Allows users to search for books based on various attributes.

## Installation

To get the project up and running on your local machine, follow these steps:

1. **Clone or Download a Copy**
    Clone the repository or download a copy to your local machine.

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Initialize the Database**
    ```bash
    npx sequelize-cli db:migrate
    ```

4. **Start the Application**
    ```bash
    npm start
    ```
    The application will be running on `http://localhost:3000`.

## Features

- **View Books**: Displays a list of all books with details.
- **Add a New Book**: Allows users to add new books to the library.
- **Update Book Information**: Users can update details of existing books.
- **Delete Books**: Provides the functionality to remove books from the library.
- **Search**: Users can search for books by title, author, genre, or year.
- **Pagination**: Paginate the list of books for easier navigation.

## Usage

Navigate through the application to manage your book library:

- Use the "Add New Book" button to add new books.
- Click on a book's title to view more details and edit or delete the book.
- Use the search bar to find books.
- Navigate between pages using the pagination controls at the bottom of the list.
