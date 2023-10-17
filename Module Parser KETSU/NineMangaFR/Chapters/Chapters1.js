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
function Output( videos, images, text) {
    this.videos = videos;
    this.images = images;
    this.text = text;
}

function getValueFromKey(keys,key) {
    for (var x = 0; x < keys.length; x++) {
        let tKey = keys[x];
        if (tKey.key == key) {
            return tKey.value;
        }
    } return '';
}
    
var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const emptyKeyValue = [new KeyValue('', '')];

const imgsHeaders = [new KeyValue('Referer', parsedJson.request.url)];

var extraInfo = parsedJson.extra.extraInfo;
const count = parseInt(getValueFromKey(extraInfo,'count')) + 1;
var output = [];
if (count > 2) { output = parsedJson.output.images; }

var newRequest = parsedJson.request.url.replace((count -1)+'.html', count+'.html');
extraInfo[0].value = ''+count;

var images = document.querySelectorAll('.pic_box');
for (image of images) {
    let img = image.querySelector('img').src;
    output.push(new ModuleRequest(img, 'get', imgsHeaders, null));
}
if (images.length < 10) { newRequest = ''; }

const chaptersPageObject = new Chapters(new ModuleRequest(newRequest, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], extraInfo), new JavascriptConfig(true, false, ''), new Output(null, output, null));

savedData.innerHTML = JSON.stringify(chaptersPageObject);