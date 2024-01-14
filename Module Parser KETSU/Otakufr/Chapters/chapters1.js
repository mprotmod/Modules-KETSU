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

function getValueFromKey(keys, key) {
    for (var x = 0; x < keys.length; x++) {
        let tKey = keys[x];
        if (tKey.key == key) {
            return tKey.value;
        }
    }
}
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var extraInfo = parsedJson.extra.extraInfo;
var emptyKeyValue = [new KeyValue('Referer', parsedJson.request.url), new KeyValue('X-Requested-With', 'XMLHttpRequest')];
<<<<<<< HEAD
var output = parsedJson.output.videos;
var actualCount = '' + (parseInt(getValueFromKey(extraInfo, 'count')));
var nextCount = parseInt(actualCount) + 1;
var nextRequest = getValueFromKey(extraInfo, nextCount);
if (!(output.needsResolver.length >= 1)) {
    output = new Videos([], []);
}
var videoLink = document.querySelector('.ui.embed').getAttribute('data-url');
if (!videoLink.includes('sendvid.com')) {
    if (!videoLink.includes('https')) {
        output.needsResolver.push(new NeedsResolver('', new ModuleRequest('https:' + videoLink, 'get', emptyKeyValue, null)));
    } else if (videoLink.includes('sendvid.net')) {
        output.needsResolver.push(new NeedsResolver('FEMBED', new ModuleRequest(videoLink, 'get', emptyKeyValue, null)));
    } else {
        output.needsResolver.push(new NeedsResolver('', new ModuleRequest(videoLink, 'get', emptyKeyValue, null)));
    }
}
extraInfo[0].value = '' + (nextCount);
=======
var output = parsedJson.output.videos;;
var actualCount = getValueFromKey(extraInfo, 'count');
var nextCount = parseInt(actualCount.match(/\\d+/g)[0]) + 2;
var nextRequest = getValueFromKey(extraInfo, nextCount);
if (actualCount == 0) {
    output = new Videos([], []);
}
var videoLink = document.querySelector('.ui.embed').getAttribute('data-url');
if(videoLink.includes('https')){
    output.needsResolver.push(new NeedsResolver('', new ModuleRequest(videoLink, 'get', emptyKeyValue, null)));
} else {
    output.needsResolver.push(new NeedsResolver('', new ModuleRequest('https:'+videoLink, 'get', emptyKeyValue, null)));
}
extraInfo[0].value = '' + (parseInt(actualCount) + 1);
>>>>>>> 53b1fea (init linux)
if (nextRequest == undefined) {
    nextRequest = '';
}
let emptyExtra = new Extra([new Commands('', emptyKeyValue)], extraInfo);
var chaptersObject = new Chapters(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, true, ''), new Output(output, null, null));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;