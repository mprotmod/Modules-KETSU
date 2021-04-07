function Resolver(request, extra, javascriptConfig, output) {
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

function Output(video) {
    this.video = video;
}

function Video(videoQuality, videoLink) {
    this.videoQuality = videoQuality;
    this.videoLink = videoLink;
}

function getNext(match, array) {
    for (var x = 0; x < array.length; x++) {
        let mMatch = array[x];
        if (mMatch.includes(match)) {
            return array[x + 1];
        }
    }
}
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var emptyKeyValue = [new KeyValue('X-Requested-With', 'XMLHttpRequest')];
var videos = [];

var vidlinkstart = document.querySelector('body').innerHTML.indexOf('/inc/embed/getvidlink.php?v=');
var vidlinkend = document.querySelector('body').innerHTML.indexOf(', function(response)') - 1;
var rlink = 'https://wcostream.com' + document.querySelector('body').innerHTML.substring(vidlinkstart, vidlinkend);
rlink = rlink.trim();
videos.push(new Video('Normal', new ModuleRequest('dummy', 'get', emptyKeyValue, null)));

let emptyExtra = new Extra([new Commands('',emptyKeyValue)],emptyKeyValue);
var chaptersObject = new Resolver(new ModuleRequest(rlink,'get',emptyKeyValue,null),emptyExtra,new JavascriptConfig(false,false,''), new Output(videos));
var finalJson = JSON.stringify(chaptersObject);savedData.innerHTML = finalJson;