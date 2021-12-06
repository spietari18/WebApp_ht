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

// Register
router.get("/user/register", (req, res, next) => {
    res.render("register");
});

router.post("/user/register",
	    body("email").isEmail().normalizeEmail().escape(),
	    body("password").isLength({min: 8})
	    .matches('[a-z]').withMessage('Must contain a lowercase letter')
	    .matches('[A-Z]').withMessage('Must contain a uppercase letter')
	    .matches('[0-9]').withMessage('Must contain a number')
	    .matches('[~`!@#$%^&*()-_+={}[]|\;:"<>,./?]')
	    .withMessage('Must contain a special character'),
	    (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		    return res.status(400).json({errors: errors.array()});
		}
		User.findOne({email: req.body.email}, (err, user) => {
		    if (err) {
			console.log(err);
			throw err;
		    }
		    if (user) {
			return res.status(403).json({email: "Email already in use."});
		    } else {
			bcrypt.genSalt(10, (err, salt) => {
			    bcrypt.hash(req.body.password, salt, (err, hash) => {
				if (err) throw err;
				User.create({
				    email: req.body.email,
				    password: hash
				}, (err, ok) => {
				    if (err) throw err;
				    return res.redirect("/api/user/login");
				});
			    });
			});
		    }
		});
	    });

// Login
router.get("/user/login", (req, res, next) => {
    res.render("login");
});

router.post("/user/login",
	body("email").isEmail().normalizeEmail().escape(),
	body("password"),
	(req, res, next) => {
		User.findOne({email: req.body.email}, (err, user) => {
		    if (err) throw err;
		    if (!user) {
			return res.status(403).json({message: "Login failed :("});
		    } else {
			bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
			    if (err) throw err;
			    if (isMatch) {
				const jwtPayload = {
				    id: user._id,
				    email: user.email
				}
				jwt.sign(jwtPayload,
					 process.env.SECRET,
					 {
					     expiresIn: 240
					 },
					 (err, token) => {
					     if (err) throw err;
					     return res.json({success: true, token});
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
			return res.json({post});
		}
	})
	// return all posts
})

// Post new post
router.post("/post", validateToken, (req, res, next) => {
	// return post id, success
})

// Edit existing post
router.post("/post/:id", validateToken, (req, res, next) => {
	// return post id, success
})

// Comments
// Get comment by id
router.get("/comment/:id", (req, res, next) => {
	// return comment
})

// Post new comment
router.post("/comment", validateToken, (req, res, next) => {
	// return comment id
})

// Edit existing comment
router.post("/comment/:id", validateToken, (req, res, next) => {
	// return comment id, success
})

// Old endpoints, just for example!
// Todos
router.post("/todos", validateToken, (req, res, next) => {
    User.findOne({email: req.user.email}, (err, user) => {
	if (err) throw err;
	if (!user) {
	    return res.status(404).json({message: "User not found"});
	} else {
	    Todo.findOne({user: user._id}, (err, todo) => {
		if (err) throw err;
		if (!todo) {
		    console.log("Todos not found, creating...");
		    console.log(req.body.items);
		    Todo.create({
			user: user._id,
			items: req.body.items
		    }, (err, ok) => {
			if (err) throw err;
			return res.status(200).json({ok});
		    });
		} else {
		    console.log("Todos found, appending...");
		    console.log(req.body.items);
		    let list = todo.items;
		    for (let i = 0; i < req.body.items.length; i++) {
			list.push(req.body.items[i]);
		    }
		    // list.push(req.body.items);
		    console.log(list);
		    Todo.update({
			user: user._id
		    }, {
			items: list
		    }, (err, ok) => {
			if (err) throw err;
			return res.status(200).json({ok});
		    });
		}
	    });
	}
    });
});

router.get("/todos", validateToken, (req, res, next) => {
    Todo.findOne({user: req.user._id}, (err, todo) => {
	if (err) throw err;
	if (!todo) {
	    return res.status(404).json({message: "Todos not found"});
	} else {
	    res.json({todo});
	}
    });
});

module.exports = router;