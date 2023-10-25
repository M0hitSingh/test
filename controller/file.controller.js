const fs = require('fs');
const readline = require('readline');

const dictionaryFile = 'dic.txt';

const createDictionaryFile = (req,res,next)=>{
    fs.writeFileSync(dictionaryFile, '', 'utf8');
    res.json("file created")
}

const addWordMeaning = (req,res,next)=>{
    const {word, meaning} = req.body;
    if(word==null || meaning ==null) return res.json("Please Input word and meaning").status(301);
    const dictionary = getDictionary();
    console.log(dictionary);
    dictionary[word] = meaning;
    updateDictionaryFile(dictionary);
    res.json(`Added '${word}' to the dictionary.`);
}

const searchMeaning = (req,res,next)=>{
    const word = req.body.word;
    const dictionary = getDictionary();
    const meaning = dictionary[word];
    if (meaning) {
      res.json(`Meaning of '${word}': ${meaning}`);
    } else {
      res.json(`'${word}' not found in the dictionary.`);
    }
}

const removeWordMeaning =(req,res,next)=>{
    const word = req.body.word;
    const dictionary = getDictionary();
    if (dictionary[word]) {
      delete dictionary[word];
      updateDictionaryFile(dictionary);
      res.json(`Removed '${word}' from the dictionary.`);
    } else {
      res.json(`'${word}' not found in the dictionary.`);
    }
}

const getDictionary=()=> {
    if (fs.existsSync(dictionaryFile)) {
      let data = fs.readFileSync(dictionaryFile, 'utf8');
      data = JSON.parse(data)
      return data
    }
}

const updateDictionaryFile = (dictionary)=>{
    const data = JSON.stringify(dictionary, null, 2);
    fs.writeFileSync(dictionaryFile, data, 'utf8');
}
  
  
module.exports = {
    createDictionaryFile,
    addWordMeaning,
    searchMeaning,
    removeWordMeaning,
    getDictionary,
    updateDictionaryFile
}