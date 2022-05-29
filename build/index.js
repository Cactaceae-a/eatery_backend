"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _express = _interopRequireWildcard(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _passport = _interopRequireDefault(require("passport"));

var _connection = _interopRequireDefault(require("./database/connection"));

var _google = _interopRequireDefault(require("./config/google.config"));

var _route = _interopRequireDefault(require("./config/route.config"));

var _Auth = _interopRequireDefault(require("./API/Auth"));

var _Restaurants = _interopRequireDefault(require("./API/Restaurants"));

var _Food = _interopRequireDefault(require("./API/Food"));

var _Menu = _interopRequireDefault(require("./API/Menu"));

var _Image = _interopRequireDefault(require("./API/Image"));

var _Orders = _interopRequireDefault(require("./API/Orders"));

var _Reviews = _interopRequireDefault(require("./API/Reviews"));

var _user = _interopRequireDefault(require("./API/user"));

var _registeredUsers = _interopRequireDefault(require("./API/registeredUsers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// MAIN BACKEND FILE
require('dotenv').config();

//passport config
(0, _google["default"])(_passport["default"]);
(0, _route["default"])(_passport["default"]);
var eatery = (0, _express["default"])();
eatery.use((0, _cors["default"])());
eatery.use(_express["default"].json());
eatery.use((0, _helmet["default"])());

var _require = require("express"),
    json = _require.json;

var _require2 = require('express'),
    Route = _require2.Route;

eatery.use(_passport["default"].initialize()); //Application Routes

eatery.use("/auth", _Auth["default"]);
eatery.use("/restaurant", _Restaurants["default"]);
eatery.use("/food", _Food["default"]);
eatery.use("/menu", _Menu["default"]);
eatery.use("/image", _Image["default"]);
eatery.use("/order", _Orders["default"]);
eatery.use("/review", _Reviews["default"]);
eatery.use("/user", _user["default"]);
eatery.use("/registeredusers", _registeredUsers["default"]);
eatery.listen(5000, function () {
  (0, _connection["default"])().then(function () {
    console.log("server is running");
  })["catch"](function (error) {
    console.log("server is running but database connection failed");
    console.log(error);
  });
});