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
<<<<<<< HEAD
var nextRequest = '';
var extraInfo = parsedJson.extra.extraInfo;
var videos = new Videos([], []);
var extraInfo = [new KeyValue('count', '1')];
var emptyKeyValue = [new KeyValue('Referer', parsedJson.request.url), new KeyValue('X-Requested-With', 'XMLHttpRequest')];
var links = document.querySelectorAll('iframe');
for (var x = 0; x < links.length; x++) {
    var link = links[x];
    if (link.src.includes('https:')) {
        output.push(new NeedsResolver('', new ModuleRequest(link.src, 'get', emptyKeyValue, null)));
        videos = new Videos(output, null);
    }
}
var count = 1;
for (var y = 0; y < links.length; y++) {
    var link = links[y];
    if (link.src.includes('parisanime.com')) {
        var url = 'https:' + link.src;
        if (x == 0) {
            nextRequest = url;
        } else {
            extraInfo.push(new KeyValue(`${count}`, `${url}`));
            count++;
        }
        console.log(url);
    }
}
if (extraInfo.length >= 2) {
    nextRequest = extraInfo[1].value;
}
let emptyExtra = new Extra([new Commands('', emptyKeyValue)], extraInfo);
var chaptersObject = new Chapters(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, true, ''), new Output(videos, null, null));
=======
var extraInfo = parsedJson.extra.extraInfo;
var extraInfo = [new KeyValue('count', '0')];
var emptyKeyValue = [new KeyValue('Referer', parsedJson.request.url), new KeyValue('X-Requested-With', 'XMLHttpRequest')];
var links = document.querySelectorAll('iframe');
for (var x = 1; x < links.length; x++) {
    var link = links[x];
    var id = link.dataset.id;
    var lang = link.dataset.type;
    var url = 'https:' + link.src;
    if (x == 1) {
        var nextRequest = url;
    } else {
        extraInfo.push(new KeyValue(`${x}`, `${url}`));
    }
    console.log(url);
}
let emptyExtra = new Extra([new Commands('', emptyKeyValue)], extraInfo);
var chaptersObject = new Chapters(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, true, ''), new Output(new Videos([], []), null, null));
>>>>>>> 53b1fea (init linux)
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;