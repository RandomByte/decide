var Alexa = require("alexa-sdk");

var handlers = {
	LaunchRequest: function() {
		this.emit(":ask", this.t("WELCOME"));
	},

	DecisionIntent: function() {
		this.emit(":tell", decide(this, getRandomInt(0, 1) === 0 ? this.t("YES") : this.t("NO")));
	},

	Unhandled: function() {
		this.emit(":ask", this.t("UNHANDLED"), this.t("WELCOME"));
	}
};

function decide(context, answer) {
	var answeres = context.t("ANSWERES");
	var idx = getRandomInt(0, answeres.length - 1);
	return context.t("ANSWERES." + idx, answer);
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
			UNHANDLED: "Sorry, I didn't get that. Try yes or no.",
			YES: "Yes",
			NO: "No",
			ANSWERES: [
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
			YES: "Ja",
			NO: "Nein",
			ANSWERES: [
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
