const express = require("express");
const {createDictionaryFile,addWordMeaning, searchMeaning, removeWordMeaning} = require('../controller/file.controller')
const router = express.Router();

router.get("/create", createDictionaryFile);
router.post("/add", addWordMeaning);
router.post("/search",searchMeaning);
router.post("/remove",removeWordMeaning);


router.use("/v1",(req, res) => {
    res.send("API server is running!!!");
} );

module.exports = router;
