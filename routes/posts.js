const express = require('express');
const {fetchAll, createPost, fetchPost, deletePost, updatePost} = require("../controllers/postController");
const {authGuard} = require("../middleware/auth");
const router = express.Router();

/* GET home page. */
router.get('/',  fetchAll);
router.post('/', authGuard, createPost);
router.get('/:id', fetchPost);
router.delete('/:id', authGuard, deletePost);
router.put('/:id',authGuard,  updatePost);


module.exports = router;
