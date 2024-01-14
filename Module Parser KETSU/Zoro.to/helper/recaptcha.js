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

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
var done = false;
var mCode = '';
try {
    var _0x359c07 = _0x4666;
    var _0x1cbce7 = _0x4666;
    grecaptcha.ready(function () {
        var _0x5c6fe9 = _0x1cbce7;
        grecaptcha.execute(recaptchaSiteKey, {
            'action': _0x5c6fe9(0x3bb)
        })['then'](function (_0x178b6b) {
            if (_0x178b6b != undefined && _0x178b6b != '') {
                localStorage.setItem('ketsu-code', _0x178b6b);
                mCode = _0x178b6b;
                document.body.prepend(createElementFromHTML("<div style='width: 100%;background-color: black;'><h4 style='text-align: center;'>KETSU FINISHED</h4></div>"));
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                done = true;
            }
        });
    });
} catch {}
try {
    var _0x3401d2 = _0x3de586;
    var _0x359c07 = _0x3de586;
    grecaptcha[_0x3401d2(0xcf3)](function () {
        var _0x3bca0e = _0x3401d2;
        grecaptcha['execute'](recaptchaSiteKey, {
            'action': _0x3bca0e(0x35e)
        })[_0x3bca0e(0x3d6)](function (_0x2e4d0a) {
            if (_0x2e4d0a != undefined && _0x2e4d0a != '') {
                localStorage.setItem('ketsu-code', _0x2e4d0a);
                mCode = _0x2e4d0a;
                document.body.prepend(createElementFromHTML("<div style='width: 100%;background-color: black;'><h4 style='text-align: center;'>KETSU FINISHED</h4></div>"));
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                done = true;
            }
        });
    });
} catch {}
for (var x = 0; x < 1500; x++) {
    if (done) {
        break;
    }
    var request = new XMLHttpRequest();
    request.open('GET', 'https://zoro.to/js/app.min.js?v=6.8', false);
    request.send(null);
}
const commands = [new Commands('variable', [new KeyValue('ketsu-code', localStorage.getItem('ketsu-code'))])];
const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra(commands, emptyKeyValue), new JavascriptConfig(false, false, ''));
const finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;