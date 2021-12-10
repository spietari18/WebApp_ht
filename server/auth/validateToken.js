const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    let token;
    if (authHeader) {
	token = authHeader.split(" ")[1];
    } else {
	token = null;
    }
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET, (err, user) => {
	if (err) {
        console.log(err);
        return res.sendStatus(401);
    }
	req.user = user;
	next();
    });
}
