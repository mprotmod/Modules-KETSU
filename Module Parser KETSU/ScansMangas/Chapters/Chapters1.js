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
    
var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const emptyKeyValue = [new KeyValue('', '')];
const imgsHeaders = [new KeyValue('Referer', parsedJson.request.url)];

var output = [];
var url = parsedJson.request.url.split('-vf')[0].replace('scan-', 'scans/');
const nbChap = url.split('-').slice(-1)[0];
url = url.replace('-'+nbChap, '/'+nbChap);

for (nbPage in Array.from(document.querySelectorAll('#page-list option'))) {
    let img = `${url}/${parseInt(nbPage)+1}.jpg`;
    output.push(new ModuleRequest(img,'get',imgsHeaders,null));
}

const chaptersPageObject = new Chapters(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(true, false, ''), new Output(null, output, null));

savedData.innerHTML = JSON.stringify(chaptersPageObject);