const fs = require("fs");

fs.readdir("data", (err, files) => {
	let total = 0;
	const participants = {};
	const years = {};

	files.forEach((file) => {
		const data = JSON.parse(fs.readFileSync("data/" + file, "utf8"));
		data.messages.forEach((message) => {
			const sender = utf8Decode(message.sender_name);
			const year = new Date(message.timestamp_ms).getFullYear();

			if (participants[sender]) {
				participants[sender]++;
			} else {
				participants[sender] = 1;
			}
			if (years[year]) {
				years[year]++;
			} else {
				years[year] = 1;
			}
			total++;
		});
	});

	printLine();
	console.log("Total: " + formatNumber(total));
	printLine();

	Object.keys(participants)
		.sort((a, b) => {
			return participants[b] - participants[a];
		})
		.map((key) => {
			console.log(key + ": " + formatNumber(participants[key]));
		});
	printLine();

	Object.keys(years)
		.sort((a, b) => {
			return a - b;
		})
		.map((key) => {
			console.log(key + ": " + formatNumber(years[key]));
		});
	printLine();
});

function printLine() {
	console.log("-----------------------------------");
}

function formatNumber(number) {
	return number.toLocaleString("de-DE").replace(",", ".");
}

function utf8Decode(utf8String) {
	if (typeof utf8String != "string")
		throw new TypeError("parameter ‘utf8String’ is not a string");
	const unicodeString = utf8String
		.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (c) {
			var cc =
				((c.charCodeAt(0) & 0x0f) << 12) |
				((c.charCodeAt(1) & 0x3f) << 6) |
				(c.charCodeAt(2) & 0x3f);
			return String.fromCharCode(cc);
		})
		.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) {
			var cc = ((c.charCodeAt(0) & 0x1f) << 6) | (c.charCodeAt(1) & 0x3f);
			return String.fromCharCode(cc);
		});
	return unicodeString;
}
