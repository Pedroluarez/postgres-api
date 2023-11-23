"use strict";

const pg = require("pg");
const config = require("../../config");
const pool = new pg.Pool(config.database);

module.exports = {
  getStatus: (req, res) => {
    try {
      if (pool == "undefined") {
        res
          .status(500)
          .json({ status: 500, message: "Database is not-connected" });
      } else {
        pool.connect((err) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.status(200).json({ status: 200, message: "DB is connected" });
          }
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
