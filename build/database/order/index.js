"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var OrderSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "users"
  },
  orderDetails: [{
    food: {
      type: _mongoose["default"].Types.ObjectId,
      ref: "foods"
    },
    quantity: {
      type: Number,
      required: true
    },
    paymode: {
      type: String,
      required: true
    },
    status: {
      type: String,
      "default": "Placed"
    },
    paymentDetails: {
      itemTotal: {
        type: Number,
        required: true
      },
      promo: {
        type: Number,
        required: true
      },
      tax: {
        type: Number,
        required: true
      },
      razorpay_payment_id: {
        type: String
      }
    }
  }]
}, {
  timestamps: true
});

var OrderModel = _mongoose["default"].model("orders", OrderSchema);

exports.OrderModel = OrderModel;