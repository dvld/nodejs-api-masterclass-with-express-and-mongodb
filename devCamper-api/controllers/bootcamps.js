const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all bootcamps
// @route   Get /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      success: true,
      data: bootcamps
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get a single bootcamp
// @route   Get /api/v1/bootcamps
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    // if bootcamp does not exist
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        msg: 'id does not exist'
      });
    }

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamp
    });
  } catch (error) {
    // catches incorrect formatting
    // res.status(400).json({ success: false });
    next(new ErrorResponse(
      `Bootcamp not found with id: ${req.params.id}`,
      404
    ));
  }
};

// @desc    Create a new bootcamp
// @route   Post /api/v1/bootcamps/:id
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const newBootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: newBootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
  
};

// @desc    Update an existing bootcamp
// @route   Put /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body, {
        new: true,
        runValidators: true
      }
    );

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete a bootcamp
// @route   Delete /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
