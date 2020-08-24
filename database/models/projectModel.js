const mongoose = require("./../database");

let Project = undefined;
if (
	(mongoose.connection && mongoose.connection.readyState == 1) ||
	mongoose.connection.readyState == 2
) {
	let projectSchema = mongoose.Schema({
		title: {
			type: String,
			required: true,
		},
		link: {
			type: String,
		},
		categories: {
			type: [String],
			default: [],
		},
		priority: {
			type: [String],
			enum: ["low", "medium", "high"],
			default: "low",
		},
		shortDescription: {
			type: String,
			required: false,
		},
		longDescription: {
			type: String,
			required: true,
		},
		parsedHtml: {
			type: String,
			required: false,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		image: {
			type: String,
			required: false,
		},
	});

	Project = mongoose.model("Project", projectSchema);
}

module.exports = Project;
