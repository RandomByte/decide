var Alexa = require("alexa-sdk");

var handlers = {
	"LaunchRequest": function() {
		this.emit(":ask", this.t("WELCOME"), this.t("WELCOME"));
	},

	"DecisionIntent": function() {
		this.emit("YesNoIntent");
	},

	"YesNoIntent": function() {
		this.emit(":tell", decideYesNo(this));
	},

	"ColorIntent": function() {
		this.emit(":tell", decideColor(this));
	},

	"DirectionIntent": function() {
		this.emit(":tell", decideDirection(this));
	},

	"Unhandled": function() {
		this.emit(":ask", this.t("UNHANDLED"), this.t("WELCOME"));
	},

	"AMAZON.HelpIntent": function() {
		this.emit(":ask", this.t("HELP_MESSAGE"), this.t("WELCOME"));
	},

	"AMAZON.StopIntent": function() {
		this.emit("SessionEndedRequest");
	},

	"AMAZON.CancelIntent": function() {
		this.emit("SessionEndedRequest");
	},

	"SessionEndedRequest": function() {
		this.emit(":tell", this.t("SESSION_END"));
	}
};

function decideYesNo(context) {
	var answer;
	if (getRandomInt(0, 1) === 0) {
		answer = context.t("YES");
	} else {
		answer = context.t("NO");
	}
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

	return decision(context, answer);
}

function decideColor(context) {
	var colorCount = context.t("COLORS").length;
	var answer;

	var idx = getRandomInt(0, colorCount - 1);
	answer = context.t("COLORS." + idx);

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
			UNHANDLED: "Sorry, I didn not get that. Try yes or no.",
			HELP_MESSAGE: "You can ask me for yes or no, a direction or a color.",
			SESSION_END: "Goodbye!",
			YES: "yes",
			NO: "no",
			LEFT: "left",
			RIGHT: "right",
			STRAIGHT: "straight",
			COLORS: [
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
				"Obviously %s",
				"Clearly %s"
			]
		}
	},
	"de-DE": {
		translation: {
			SKILL_NAME: "Entscheider",
			WELCOME: "Das ist der Entscheider. Frage mich nach ja oder nein.",
			UNHANDLED: "Das habe ich leider nicht verstanden. Versuche es mit ja oder nein.",
			HELP_MESSAGE: "Du kannst mich nach ja oder nein, einer Richtung oder einer Farbe fragen.",
			SESSION_END: "Wiedersehn!",
			YES: "ja",
			NO: "nein",
			LEFT: "links",
			RIGHT: "rechts",
			STRAIGHT: "geradeaus",
			COLORS: [
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
