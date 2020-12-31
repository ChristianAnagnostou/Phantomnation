const wordsRouter = require("express").Router();

module.exports = wordsRouter;

const words = [
  { word: "lamerty", wordId: 1, def: "Keyboard configuration for lame people" },
  { word: "okery", wordId: 2, def: "Idiots trying to use the word okay" },
  {
    word: "planterp",
    wordId: 3,
    def: 'Shorthand for the compound word "plant-terpines" (aka: marijuana)',
  },
];

wordsRouter.get("/", (req, res, next) => {
  res.status(200).send(words);
});

wordsRouter.post("/", (req, res, next) => {
  const wordIndex = words.findIndex((word) => req.body.newWordData.word === word.word);
  if (wordIndex === -1) {
    words.push(req.body.newWordData);
    res.status(201).send(words[wordIndex]);
  } else {
    res.status(400).send();
  }
});
