const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken");
const { $where } = require('../models/User');

// Register
router.post("/user/register",
		// Do validation
	    body("email").isEmail().normalizeEmail().escape(),					// Email
	    body("password").isLength({min: 8})									// Password length
	    .matches('[a-z]').withMessage('Must contain a lowercase letter')	// Password contains lowercase letter
	    .matches('[A-Z]').withMessage('Must contain a uppercase letter')	// Password contains uppercase letter
	    .matches('[0-9]').withMessage('Must contain a number')				// Password contains number
	    .matches('[~`!@#$%^&*()-_+={}[]|\;:"<>,./?]')						// Password contains special character
	    .withMessage('Must contain a special character'),
	    (req, res, next) => {
		// Password validation result, return possible errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		    return res.status(400).json({errors: errors.array()});
		}
		// Check if email already in use
		User.findOne({email: req.body.email}, (err, users) => {
		    if (err) {
			throw err;
		    }
		    if (users) {
			return res.status(403).json({email: "Email already in use."});
		    } else {
			// Generate password hash and store new user
			bcrypt.genSalt(10, (err, salt) => {
			    bcrypt.hash(req.body.password, salt, (err, hash) => {
				if (err) throw err;
				User.create({
				    email: req.body.email,
				    password: hash
				}, (err, users) => {
				    if (err) throw err;
				    return res.status(200).json({email: users.email});
				});
			    });
			});
		    }
		});
	    });

// Login
router.post("/user/login",
	// Normalize and escape email, same as in registeration
	body("email").isEmail().normalizeEmail().escape(),
	body("password"),
	(req, res, next) => {
		// Find user by email
		User.findOne({email: req.body.email}, (err, users) => {
		    if (err) throw err;
		    if (!users) {
			return res.status(403).json({message: "Login failed :("});
		    } else {
			// User found, compare password hashes
			bcrypt.compare(req.body.password, users.password, (err, isMatch) => {
			    if (err) throw err;
			    if (isMatch) {
				// Create jsonwebtoken by using users id and email
				const jwtPayload = {
				    id: users._id,
				    email: users.email
				}
				// Sign token with secret, set expiration
				jwt.sign(jwtPayload,
					 process.env.SECRET,
					 {
					     expiresIn: 240
					 },
					 // Return token on success
					 (err, token) => {
					     if (err) throw err;
					     return res.status(200).json({success: true, token});
					 });
			    } else {
				return res.status(403).json({message: "Login failed :("});
			    }
			});
		    }
		});
	});
	
// Posts
// Get all posts
router.get("/post", (req, res, next) => {
	Post.find({}, (err, post) => {
		if (err) throw err;
		if (!post) {
			return res.status(404).json({message: "Posts not found"});
		} else {
			return res.status(200).json({post});
		}
	})
})

// Get one post
router.get("/post/:id", (req, res, next) => {
	Post.findOne({_id: req.params.id}, (err, post) => {
		if (err) throw err;
		if (!post) {
			return res.status(404).json({message: "Post not found"});
		} else {
			return res.status(200).json({post});
		}
	})
});

// Post a new post
router.post("/post", validateToken, (req, res, next) => {
	Post.create({
		user: req.user.id,
		post: req.body.post,
		timestamp: Date.now()
	}, (err, post) => {
		if (err) throw err;
		return res.status(200).json({post});
	});
});

// Edit an existing post
router.post("/post/:id", validateToken, (req, res, next) => {
	Post.findOne({id: req.params.id}, (err, post) => {
		if (err) {
			if (err.name === "CastError") {
				return res.status(404).send(`Post id ${req.params.id} not found!`);
			}
			return next(err);
		}
		if (post) {
			Post.updateOne({
				_id: post.id
			}, {
				post: req.body.post
			}, (err, post) => {
				if (err) throw err;
				if (post) {
					return res.status(200).json({post});
				}
			})
		} else {
			return res.status(404).send(`Post id ${req.params.id} not found`);
		}
	})
})

// Comments
// Get comment by id
router.get("/comment/:id", (req, res, next) => {
	Comment.findOne({_id: req.params.id}, (err, comment) => {
		if (err) {
			if (err.name === "CastError") {
				return res.status(404).send(`Comment with id ${req.params.id} not found`);
			}
			return next(err);
		}
		if (comment) {
			return res.status(200).json({comment});
		} else {
			return res.status(404).send(`Post id ${req.params.id} not found`);
		}
	})
})

// Post new comment
router.post("/comment/:id", validateToken, (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.json("ID not valid!");
	}
	Comment.create({
		user: req.user.id,
		comment: req.body.comment,
		timestamp: Date.now()
	}, (err, comment) => {
		console.log("New comment!");
		if (err) throw err;
		if (comment) {
			Post.findOneAndUpdate({_id: req.params.id}, {$push: {comments: comment}}, (err, post) => {
				if (err) throw err;
				if (post) {
					return res.status(200).json(comment);
				}
			})
		}
	})
})

// Edit existing comment
router.post("/comment/:id", validateToken, (req, res, next) => {
	Comment.updateOne({_id: req.params.id}, {comment: req.body.comment}, (err, comment) => {
		if (err) throw err;
		if (comment) {
			return res.status(200).json(comment);
		}
	})
})

// Userdata (author)
// Get author's email
router.get("/author/:id", (req, res, next) => {
	User.findOne({_id: req.params.id}, (err, users) => {
		if (err) {
			if (err.name === "CastError") {
				return res.status(404).send(`Post id ${req.params.id} not found`);
			} else {
				throw err;
			}
		}
		if (users) {
			let author = {
				_id: users._id,
				email: users.email
			}
			return res.status(200).json(author);
		}
	})
})

module.exports = router;