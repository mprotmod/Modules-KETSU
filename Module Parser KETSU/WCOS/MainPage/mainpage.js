const DefaultLayouts = {
    ultraWideFull: 'ultraWideFull',
    ultraWide: 'ultraWide',

    wideFull: 'wideFull',
    wide: 'wide',

    wideStrechedFull: 'wideStrechedFull',
    wideStrechedFullDouble: 'WideStrechedFullDouble',
    wideStreched: 'wideStreched',
    wideStrechedDouble: 'wideStrechedDouble',

    wideStrechedFullList: 'wideStrechedFullList',
    wideStrechedList: 'wideStrechedList',

    doublets: 'doublets',
    doubletsDouble: 'doubletsDouble',
    doubletsFull: 'doubletsFull',
    doubletsFullDouble: 'doubletsFullDouble',

    doubletsConstant: 'doubletsConstant',
    doubletsDoubleConstant: 'doubletsDoubleConstant',
    doubletsFullConstant: 'doubletsFullConstant',
    doubletsFullDoubleConstant: 'doubletsFullDoubleConstant',

    longDoublets: 'longDoublets',
    longDoubletsDouble: 'longDoubletsDouble',
    longDoubletsFull: 'longDoubletsFull',
    longDoubletsFullDouble: 'longDoubletsFullDouble',

    longDoubletsConstant: 'longDoubletsConstant',
    longDoubletsDoubleConstant: 'longDoubletsDoubleConstant',
    longDoubletsFullConstant: 'longDoubletsFullConstant',
    longDoubletsFullDoubleConstant: 'longDoubletsFullDoubleConstant',

    triplets: 'triplets',
    tripletsDouble: 'tripletsDouble',
    tripletsFull: 'tripletsFull',
    tripletsFullDouble: 'tripletsFullDouble',

    tripletsConstant: 'tripletsConstant',
    tripletsDoubleConstant: 'tripletsDoubleConstant',
    tripletsFullConstant: 'tripletsFullConstant',
    tripletsFullDoubleConstant: 'tripletsFullDoubleConstant',

    longTriplets: 'longTriplets',
    longTripletsDouble: 'longTripletsDouble',
    longTripletsFull: 'longTripletsFull',
    longTripletsFullDouble: 'longTripletsFullDouble',

    longTripletsConstant: 'longTripletsConstant',
    longTripletsDoubleConstant: 'longTripletsDoubleConstant',
    longTripletsFullConstant: 'longTripletsFullConstant',
    longTripletsFullDoubleConstant: 'longTripletsFullDoubleConstant',

    none: ''
};

const CellDesings = {
    Special1: 'Special1',
    Special2: 'Special2',
    Special3: 'Special3',
    CELLHelperText: 'CELLHelperText',

    small1: 'small1',
    small2: 'small2',
    normal1: 'normal1',
    normal2: 'normal2',
    normal3: 'normal3',
    normal4: 'normal4',
    normal5: 'normal5',
    normal6: 'normal6',
    normal7: 'normal7',

    wide1: 'wide1',
    wide2: 'wide2',
    wide3: 'wide3',
    wide4: 'wide4',
    wide5: 'wide5',
    wide6: 'wide6',
    wide7: 'wide7',
    wide8: 'wide8',
    wide9: 'wide9',
    wide10: 'wide10',
    wide11: 'wide11'
};

const Paging = {
    leading: 'leading',
    centered: 'centered',
    none: ''
};

const Orientation = {
    horizontal: 'horizontal',
    vertical: 'vertical'
};

function MainPage(request, extra, javascriptConfig, output) {
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

function Output(cellDesing, orientation, defaultLayout, paging, section, layout, data) {
    this.cellDesing = cellDesing;
    this.orientation = orientation;
    this.defaultLayout = defaultLayout;
    this.paging = paging;
    this.section = section;
    this.layout = layout;
    this.data = data;
}

function Section(sectionName, separator) {
    this.sectionName = sectionName;
    this.separator = separator;
}

function Layout(insets, visibleCellsWidthS, visibleCellsWidthM, visibleCellsWidthL, visibleCellsHeight, heightForVisibleCells, cellSize, ratio, constant, horizontalSpacing, verticalSpacing) {
    this.insets = insets;
    this.visibleCellsWidthS = visibleCellsWidthS;
    this.visibleCellsWidthM = visibleCellsWidthM;
    this.visibleCellsWidthL = visibleCellsWidthL;
    this.visibleCellsHeight = visibleCellsHeight;
    this.heightForVisibleCells = heightForVisibleCells;
    this.cellSize = cellSize;
    this.ratio = ratio;
    this.constant = constant;
    this.horizontalSpacing = horizontalSpacing;
    this.verticalSpacing = verticalSpacing;
}

function Insets(top, bottom, left, right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
}

function Size(width, height) {
    this.width = width;
    this.height = height;
}

function Ratio(inRelation, number1, number2) {
    this.inRelation = inRelation;
    this.number1 = number1;
    this.number2 = number2;
}

function Data(image, title, description, field1, field2, field3, field4, isChapter, link, openInWebView) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
    this.field4 = field4;
    this.isChapter = isChapter;
    this.link = link;
    this.openInWebView = openInWebView;
}

function quickData(link, image, title, field1) {
    return new Data(image, title, 'unknown', field1, 'unknown', 'unknown', 'unknown', false, link);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function returnEps(a) {
    var eps = document.querySelectorAll('.sidebar_body')[a].querySelectorAll('li');
    var dataArray = [];
    for (var i = 0; i < eps.length; i++) {
        ep = eps[i];
        var link = ep.querySelector('a').href;
        if (link.includes('-season')) {
            link = link.split('-season')[0];
        } else if (link.includes('-episode')) {
            link = link.split('-episode')[0];
        } else {
            continue;
        }
        link = link.replace('https://www.wcostream.com', 'https://www.wcostream.com/anime');
        var image = 'https:' + ep.querySelector('img').src;
        image = new ModuleRequest(image, 'get ', emptyKeyValue, null);
        var title = ep.querySelector('img').alt;
        if (title.includes('Subbed')) {
            link = link + '-english-subbed';
        }
        link = new ModuleRequest(link, 'get', emptyKeyValue, null);
        var fullt = ep.querySelectorAll('a')[1].innerText;
        var number;
        if (fullt.includes('Episode ')) {
            number = 'Episode ' + fullt.split('Episode ')[1].split(' ')[0];
        } else {
            number = 'FULL';
        }
        var episode = new Data(image, title, 'desc', number, title, 'f3', 'f4', false, link);
        dataArray.push(episode);
    }
    return dataArray;
}


var savedData = document.getElementById('ketsu-final-data');

var parsedJson = JSON.parse(savedData.innerHTML);

let output = [];
let emptyKeyValue = [new KeyValue('', '')];






var topLayout = new Layout(new Insets(0, 0, 0, 0), 1, 2, 3, 1, 500, new Size(400, 20), new Ratio('width', 1, 1), new Size(0, 0), 0, 0);
var baseUrl = 'https://wcostream.com';


var recArray = returnEps(0);
var dubArray = returnEps(1);
var cartoonArray = returnEps(2);
var subArray = returnEps(3);

var popular = document.querySelector('.menustyle').querySelectorAll('li');
var popularArray = [];
for (var i = 0; i < popular.length; ++i) {
    var link = baseUrl + popular[i].querySelector('a').href;
    link = new ModuleRequest(link, 'get', emptyKeyValue, null);
    var image = 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg';
    image = new ModuleRequest(image, 'get ', emptyKeyValue, null);
    var title = popular[i].querySelector('a').title;
    if (title.includes('Season ')) {
        title = title.split('Season ')[0];
    } else if (title.includes('Episode ')) {
        title = title.split('Episode ')[0];
    }
    var anime = quickData(link, image, title, title, title);
    popularArray.push(anime);
}

output.push(new Output(CellDesings.Special3,Orientation.horizontal,DefaultLayouts.none,Paging.leading,new Section('Recent Releases ',true),topLayout,recArray)); 
output.push(new Output(CellDesings.normal2,Orientation.horizontal,DefaultLayouts.longTripletsDouble,Paging.leading,new Section('Dubbed ',true),null,dubArray)); 
output.push(new Output(CellDesings.normal2,Orientation.horizontal,DefaultLayouts.longTripletsDouble,Paging.leading,new Section('Cartoons ',true),null,cartoonArray)); 
output.push(new Output(CellDesings.normal2,Orientation.horizontal,DefaultLayouts.longTripletsDouble,Paging.leading,new Section('Subbed ',true),null,subArray)); 
output.push(new Output(CellDesings.small2,Orientation.vertical,DefaultLayouts.wide,Paging.leading,new Section('Popular & Ongoing Series ',true),new Layout(new Insets(0,0,10,10),1,1,1,1,50,new Size(400,50),null,new Size(0,0),0,0),popularArray)); 


let MainPageObject = new MainPage(new ModuleRequest('', 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(true, false, ''), output);

var finalJson = JSON.stringify(MainPageObject);
savedData.innerHTML = finalJson;
