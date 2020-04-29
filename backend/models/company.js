const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true
    },
    type: {
      type: String
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      index: true
    },
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true}
);

module.exports = mongoose.model("Company", companySchema);
