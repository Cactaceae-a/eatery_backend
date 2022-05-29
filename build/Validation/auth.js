"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateSignup = exports.ValidateSignin = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//creating to Validate Signup
var ValidateSignup = function ValidateSignup(userData) {
  var Schema = _joi["default"].object({
    fullName: _joi["default"].string().required().min(5),
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(5),
    address: _joi["default"].array().items(_joi["default"].object({
      details: _joi["default"].string(),
      "for": _joi["default"].string()
    })),
    phoneNumber: _joi["default"].number()
  });

  return Schema.validateAsync(userData);
}; //creating to validate SignIn


exports.ValidateSignup = ValidateSignup;

var ValidateSignin = function ValidateSignin(userData) {
  var Schema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().required()
  });

  return Schema.validateAsync(userData);
};

exports.ValidateSignin = ValidateSignin;