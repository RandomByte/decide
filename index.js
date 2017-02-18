var Alexa = require("alexa-sdk");

var handlers = {
	"LaunchRequest": function() {
		console.log("Launch request");
		this.emit(":ask", this.t("WELCOME"), this.t("HELP_MESSAGE"));
	},

	"DecisionIntent": function() {
		console.log("DecisionIntent");
		this.emit("YesNoIntent");
	},

	"YesNoIntent": function() {
		console.log("YesNoIntent");
		this.emit(":tell", decideYesNo(this));
	},

	"ColorIntent": function() {
		console.log("ColorIntent");
		this.emit(":tell", decideColor(this));
	},

	"DirectionIntent": function() {
		console.log("DirectionIntent");
		this.emit(":tell", decideDirection(this));
	},

	"AMAZON.HelpIntent": function() {
		console.log("HelpIntent");
		this.emit(":ask", this.t("HELP_MESSAGE"), this.t("WELCOME"));
	},

	"AMAZON.StopIntent": function() {
		console.log("StopIntent");
		this.emit("SessionEndedRequest");
	},

	"AMAZON.CancelIntent": function() {
		console.log("CancelIntent");
		this.emit("SessionEndedRequest");
	},

	"SessionEndedRequest": function() {
		console.log("Session end");
		this.emit(":tell", this.t("SESSION_END"));
	},

	"Unhandled": function() {
		console.log("Unhandled intent");
		this.emit(":ask", this.t("UNHANDLED"), this.t("WELCOME"));
	}
};

function decideYesNo(context) {
	var answer;
	if (getRandomInt(0, 1) === 0) {
		answer = context.t("YES");
	} else {
		answer = context.t("NO");
	}
	console.log("Yes No decision: " + answer);
	return decision(context, answer);
}

function decideDirection(context) {
	var answer;
	var i = getRandomInt(0, 2);

	switch (i) {
	case 0:
		answer = context.t("LEFT");
		break;
	case 1:
		answer = context.t("RIGHT");
		break;
	case 2:
		answer = context.t("STRAIGHT");
		break;
	default:
		console.log("Unexpected number for direction: " + i);
		break;
	}
	console.log("Direction decision: " + answer);
	return decision(context, answer);
}

function decideColor(context) {
	var colorCount = context.t("COLORS").length;
	var answer;

	var idx = getRandomInt(0, colorCount - 1);
	answer = context.t("COLORS." + idx);

	console.log("Color decision: " + answer);
	return decision(context, answer);
}

function decision(context, answer) {
	var answerCount = context.t("ANSWERS").length;
	var idx = getRandomInt(0, answerCount - 1);
	return context.t("ANSWERS." + idx, answer);
}

function getRandomInt(min, max) {
	var low = Math.ceil(min);
	var high = Math.floor(max);
	return Math.floor(Math.random() * (high - low + 1)) + low;
}

var languageStrings = {
	"en-US": {
		translation: {
			SKILL_NAME: "Decider",
			WELCOME: "This is Decider. Try asking for yes or no.",
			UNHANDLED: "Sorry, I did not get that. Try yes or no.",
			HELP_MESSAGE: "You can ask me for yes or no, a direction or a color.",
			SESSION_END: "Goodbye!",
			YES: "yes",
			NO: "no",
			LEFT: "left",
			RIGHT: "right",
			STRAIGHT: "straight",
			COLORS: [
				"black",
				"white",
				"blue",
				"red",
				"green",
				"yellow",
				"orange",
				"violet",
				"purple",
				"pink"
			],
			ANSWERS: [
				"%s",
				"Obviously %s",
				"Clearly %s",
				"The answer is %s"
			]
		}
	},
	"de-DE": {
		translation: {
			SKILL_NAME: "Entscheider",
			WELCOME: "Das ist Entscheider. Frage mich nach ja oder nein, einer Richtung, oder einer Farbe.",
			UNHANDLED: "Das habe ich leider nicht verstanden. Versuche es mit ja oder nein.",
			HELP_MESSAGE: "Du kannst mich nach ja oder nein, einer Richtung, oder einer Farbe fragen.",
			SESSION_END: "Bis bald!",
			YES: "ja",
			NO: "nein",
			LEFT: "links",
			RIGHT: "rechts",
			STRAIGHT: "geradeaus",
			COLORS: [
				"schwarz",
				"weiß",
				"blau",
				"rot",
				"grün",
				"gelb",
				"orange",
				"violett",
				"lila",
				"rosa"
			],
			ANSWERS: [
				"%s",
				"Natürlich %s",
				"Das kann nur %s sein",
				"Die Antwort lautet %s",
				"Ein ganz klares %s",
				"Leider ist die Antwort %s",
				"Zum Glück ist die Antwort %s"
			]
		}
	}
};

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.appId = process.env.API_KEY;
	alexa.resources = languageStrings;
	alexa.registerHandlers(handlers);
	alexa.execute();
};
