"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegisteredUsresModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RegisteredUsresSchema = new _mongoose["default"].Schema({
  restaurant: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "restaurants"
  },
  images: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var RegisteredUsresModel = _mongoose["default"].model("registeredUsers", RegisteredUsresSchema);

exports.RegisteredUsresModel = RegisteredUsresModel;