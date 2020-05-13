const express = require('express');
const router = express.Router();
const Tweet = require("../db/models").Tweet;
const {check, validationResult} = require('express-validator');

const validateTweet = [
    check('message').exists({checkFalsy: true})
    .withMessage('Must include content.')
    .isLength({max: 280})
    .withMessage('Tweets must be 280 characters or less.')
];

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
       const errors = validationErrors.array().map(error => error.message);
       const err = new Error('Bad Request');

       err.errors = errors;
       err.status = 400;
       err.message = 'Bad request';

       next(err);
  }

  next()
}

 

const asyncHandler = handler => (req,res,next) =>handler(req,res,next).catch(next);

router.get("/", asyncHandler(async(req, res) => {
    const tweets = await Tweet.findAll();
    res.json({tweets});
}));

router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    const tweetId = parseInt(req.params.id,10);
    const tweet = await Tweet.findByPk(tweetId);
    res.json({
        tweet
    });
}));

router.post("/", validateTweet, handleValidationErrors, asyncHandler(async (req, res) => {
    const newTweet = await Tweet.create({
        message: req.body.message,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    
    res.json({newTweet});
    // res.redirect('/')
}));

router.put("/:id(\\d+)", 
    validateTweet, 
    handleValidationErrors, 
    asyncHandler(async (req, res) => {
        const tweetId = parseInt(req.params.id, 10);
        const tweet = await Tweet.findByPk(tweetId);

        const updatedTweet = await tweet.update({
            message: req.body.message,
            updatedAt: new Date()
        });
        res.json({updatedTweet})

}));

router.delete("/:id(\\d+)",
    asyncHandler(async (req, res) => {
        const tweetId = parseInt(req.params.id, 10);
        const tweet = await Tweet.findByPk(tweetId);

        const deletedTweet = await tweet.destroy();

        res.json({msg: "wassup ",deletedTweet});
    }));

module.exports = router;