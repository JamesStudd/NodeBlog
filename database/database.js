require('dotenv').config()
const mongoose = require("mongoose");

mongoose.connect(
	process.env.MONGODB_URI_NODEBLOG,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.error(
				"Database error, check credentials and restart server"
			);
		}
	}
);

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
})

module.exports = mongoose;
