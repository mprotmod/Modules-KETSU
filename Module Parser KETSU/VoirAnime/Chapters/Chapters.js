function Chapters(request, extra, javascriptConfig, output) {
	this.request = request;
	this.extra = extra;
	this.javascriptConfig = javascriptConfig;
	this.output = output;
}

function ModuleRequest(url, method, headers, httpBody) {
	this.url = url;
	this.method = method;
	this.headers = headers;
	this.httpBody = httpBody;
}

function Extra(commands, extraInfo) {
	this.commands = commands;
	this.extraInfo = extraInfo;
}

function Commands(commandName, params) {
	this.commandName = commandName;
	this.params = params;
}

function JavascriptConfig(removeJavascript, loadInWebView, javaScript) {
	this.removeJavascript = removeJavascript;
	this.loadInWebView = loadInWebView;
	this.javaScript = javaScript;
}

function KeyValue(key, value) {
	this.key = key;
	this.value = value;
}

function Output(videos, images, text) {
	this.videos = videos;
	this.images = images;
	this.text = text;
}

function Videos(needsResolver, rawVideo) {
	this.needsResolver = needsResolver;
	this.rawVideo = rawVideo;
}

function NeedsResolver(resolverIdentifier, link) {
	this.resolverIdentifier = resolverIdentifier;
	this.link = link;
}

function RawVideo(video) {
	this.video = video;
}

function Video(videoQuality, videoLink) {
	this.videoQuality = videoQuality;
	this.videoLink = videoLink;
}

function Text(text) {
	this.text = text;
}
var output = [];
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var emptyKeyValue = [new KeyValue('', '')];
let newRequest = new ModuleRequest(parsedJson.request.url, 'get', emptyKeyValue, null);
var commands = [new Commands('helperFunction', [new KeyValue('isCustomRequest', 'true'), new KeyValue('name', 'example')])];
for (const data of parsedJson.global.variables) {
	const link = data.value;
	if (link.includes('streamtape.com')) {
		var fixedLink = link.replace('https://streamtape.com/', 'https://streamta.pe/');
		output.push(new NeedsResolver('', new ModuleRequest(fixedLink, 'get', emptyKeyValue, null)));
	}
	if (link.includes('videovard.sx') || link.includes('video.sibnet.ru/') || link.includes('yourupload.com') || link.includes('voe') ) {
		output.push(new NeedsResolver('', new ModuleRequest(link, 'get', emptyKeyValue, null)));
	}else if(link.includes('sbfull') || link.includes('watchsb')) {
		output.push(new NeedsResolver('WATCHSB', new ModuleRequest(link, 'get', emptyKeyValue, null)));
	} else {
		output.push(new NeedsResolver('UNSUPPORTED', new ModuleRequest(link, 'get', emptyKeyValue, null)));
	}
}
let emptyExtra = new Extra(commands, emptyKeyValue);
var chaptersObject = new Chapters(newRequest, emptyExtra, new JavascriptConfig(false, false, ''), new Output(new Videos(output, null), null, null), new Extra('', emptyKeyValue));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;