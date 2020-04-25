const express = require("express");

const router = express.Router();
const Item = require("../models/ItemSchema");
const auth = require("../middleware/auth");

// @Path        : /items
// @description : Get the items (get request)
// @Access      : PUBLIC
router.get("/", (req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json({ msg: "Error Loading data" }));
});

// @Path        : /items
// @description : Add the items (post request)
// @Access      : PRIVATE
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ msg: "Failed to add Item" }));
});

// @Path        : /items/:id
// @description : Remove items (delete request)
// @Access      : PRIVATE
router.delete("/:id", auth, (req, res) => {
  Item.deleteOne({ _id: req.params.id })
    .then(response => res.json({ msg: "Deleted" }))
    .catch(err => res.status(400).json({ msg: "Delete Action failed", err }));
});

module.exports = router;
