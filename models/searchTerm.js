//require mongooose and schrma

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//model

var searchTermSchema = new Schema(
  {
      searchVal: String,
      searchDate: Date
    },
  {
    timestamps: true

  }
);

//connect model and collection

var ModelClass = mongoose.model('searchTerm', searchTermSchema);

module.exports = ModelClass;
