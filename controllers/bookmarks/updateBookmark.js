const asyncWrapper = require('../../middleware/asyncWrapper');
const ErrorResponse = require('../../utils/ErrorResponse');
const Bookmark = require('../../models/Bookmark');

// @desc      Update bookmark
// @route     PUT /api/bookmarks/:id
// @access    Public
const updateBookmark = asyncWrapper(async (req, res, next) => {
  let bookmark = await Bookmark.findOne({
    where: { id: req.params.id },
  });

  if (!bookmark) {
    return next(
      new ErrorResponse(
        `Bookmark with id of ${req.params.id} was not found`,
        404
      )
    );
  }

  let _body = {
    ...req.body,
    categoryId: parseInt(req.body.categoryId),
  };

  if (req.file) {
    _body.icon = req.file.filename;
  }

  bookmark = await bookmark.update(_body);

  res.status(200).json({
    success: true,
    data: bookmark,
  });
});

module.exports = updateBookmark;
