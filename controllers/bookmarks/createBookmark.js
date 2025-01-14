const asyncWrapper = require('../../middleware/asyncWrapper');
const Bookmark = require('../../models/Bookmark');

// @desc      Create new bookmark
// @route     POST /api/bookmarks
// @access    Public
const createBookmark = asyncWrapper(async (req, res, next) => {
  let bookmark;

  let _body = {
    ...req.body,
    categoryId: parseInt(req.body.categoryId),
  };

  if (req.file) {
    _body.icon = req.file.filename;
  }

  bookmark = await Bookmark.create(_body);

  res.status(201).json({
    success: true,
    data: bookmark,
  });
});

module.exports = createBookmark;
