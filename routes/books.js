const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const { Op } = require('sequelize');

// Handler function to wrap each route for error handling.
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

// GET the full list of books with pagination.
router.get('/', asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page
    const limit = 10; // Books per page
    const offset = (page - 1) * limit;

    const { count, rows } = await Book.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["author", "ASC"]]
    });

    const totalPages = Math.ceil(count / limit);

    res.render('index', { books: rows, title: 'Books', currentPage: page, totalPages: totalPages });
}));

// Search books
router.get('/search', asyncHandler(async (req, res) => {
    const { query } = req.query;
    const books = await Book.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${query}%` } },
                { author: { [Op.like]: `%${query}%` } },
                { genre: { [Op.like]: `%${query}%` } },
                { year: { [Op.like]: `%${query}%` } }
            ]
        },
        order: [["author", "ASC"]]
    });
    res.render('index', { books, title: 'Search Results', query });
}));

// GET the form for creating a new book.
router.get('/new', asyncHandler(async (req, res) => {
    res.render('new-book', { book: {}, title: 'New Book' });
}));

// POST new book to database.
router.post('/new', asyncHandler(async (req, res) => {
    try {
        await Book.create(req.body);
        res.redirect('/books');
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const book = Book.build(req.body);
            res.render('new-book', { book, errors: error.errors, title: 'New Book' });
        } else {
            throw error;
        }
    }
}));

// GET book details.
router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.render('update-book', { book, title: book.title }); 
    } else {
        const err = new Error('Book Not Found');
        err.status = 404;
        throw err;
    }
}));

// POST updated book details to database.
router.post('/:id', asyncHandler(async (req, res) => {
    let book = await Book.findByPk(req.params.id);
    if (book) {
        try {
            await book.update(req.body);
            res.redirect('/books');
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                res.render('update-book', { book, errors: error.errors, title: 'Update Book' });
            } else {
                throw error;
            }
        }
    } else {
        const err = new Error('Book Not Found');
        err.status = 404;
        res.status(404).render('page-not-found', { err });
    }
}));

// POST deletion of a book.
router.post('/:id/delete', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.redirect('/books');
    } else {
        const err = new Error('Book Not Found');
        err.status = 404;
        throw err;
    }
}));

module.exports = router;
