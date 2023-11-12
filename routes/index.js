const express = require('express');
const router = express.Router();

// Redirect from the home page to the books list.
router.get('/', (req, res) => {
    res.redirect('/books');
});

module.exports = router;

