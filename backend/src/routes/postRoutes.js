const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', ctrl.getAll);
router.post('/', auth, upload.single('image'), ctrl.create);
router.post('/:id/like', auth, ctrl.toggleLike);

module.exports = router;
