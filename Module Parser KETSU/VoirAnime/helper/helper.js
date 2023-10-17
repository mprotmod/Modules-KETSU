function Info(request, extra, javascriptConfig) {
    this.request = request;
    this.extra = extra;
    this.javascriptConfig = javascriptConfig;
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
const savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];
const data = document.querySelector('.chapter-video-frame').querySelector('p iframe').src;
const commands = [new Commands('variable', [new KeyValue('data', data), new KeyValue('current', parsedJson.request.url)])];
const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra(commands, emptyKeyValue), new JavascriptConfig(false, false, ''));
const finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;