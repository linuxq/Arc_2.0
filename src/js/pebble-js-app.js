var dateorder = 0;
var lang = 0;
var backlight = 0;

function logVariables() {
	console.log("	dateorder: " + dateorder);
	console.log("	lang: " + lang);
	console.log("	backlight: " + backlight);
}

Pebble.addEventListener("ready", function() {
	console.log("Ready Event");
	
	dateorder = localStorage.getItem("dateorder");
	if (!dateorder) {
		dateorder = 1;
	}

	lang = localStorage.getItem("lang");
	if (!lang) {
		lang = 1;
	}
	
	backlight = localStorage.getItem("backlight");
	if (!backlight) {
		backlight = 0;
	}

	logVariables();
						
	Pebble.sendAppMessage(JSON.parse('{"dateorder":'+dateorder+',"lang":'+lang+',"backlight":'+backlight+'}'));

});

Pebble.addEventListener("showConfiguration", function(e) {
	console.log("showConfiguration Event");

	logVariables();
						
	Pebble.openURL("http://www.famillemattern.com/jnm/pebble/Arc/Arc_1.1.3.php?dateorder=" + dateorder +
				   "&lang=" + lang + "&backlight=" + backlight);
});

Pebble.addEventListener("webviewclosed", function(e) {
	console.log("Configuration window closed");
	console.log(e.type);
	console.log(e.response);

	var configuration = JSON.parse(e.response);
	Pebble.sendAppMessage(configuration);
						
	dateorder = configuration["dateorder"];
	localStorage.setItem("dateorder", dateorder);

	lang = configuration["lang"];
	localStorage.setItem("lang", lang);

	backlight = configuration["backlight"];
	localStorage.setItem("backlight", backlight);
});
