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
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var extraInfo = parsedJson.extra.extraInfo;
var emptyKeyValue = [new KeyValue('X-Requested-With', 'XMLHttpRequest')];
var output = [];
const script = document.querySelector('script').innerHTML.replace('/*', '').replace('*/', '');
const data = JSON.parse(script);
const html = data.html;
const htmlObject = document.createElement('div');
htmlObject.innerHTML = html;
document.body.appendChild(htmlObject);
var extraInfo = [new KeyValue('count', '0')];
var links = document.querySelectorAll('.item.server-item');
for (var x = 0; x < links.length; x++) {
    var link = links[x];
    var id = link.dataset.id;
    var lang = link.dataset.type;
    var url = 'https://zoro.to/ajax/v2/episode/sources?id=' + id + '?lang=' + lang;
    if (x == 0) {
        var nextRequest = url
    } else {
        extraInfo.push(new KeyValue(`${x}`, `${url}`));
    }
    console.log(url);
}
let emptyExtra = new Extra([new Commands('', emptyKeyValue)], extraInfo);
var chaptersObject = new Chapters(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, false, ''), new Output(new Videos([], []), null, null));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;