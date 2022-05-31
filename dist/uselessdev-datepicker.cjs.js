'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./uselessdev-datepicker.cjs.prod.js");
} else {
  module.exports = require("./uselessdev-datepicker.cjs.dev.js");
}
