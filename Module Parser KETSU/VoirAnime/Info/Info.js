function Info ( request, extra, javascriptConfig, output ) {
	this.request = request;
	this.extra = extra;
	this.javascriptConfig = javascriptConfig;
	this.output = output;
}

function ModuleRequest ( url, method, headers, httpBody ) {
	this.url = url;
	this.method = method;
	this.headers = headers;
	this.httpBody = httpBody;
}

function Extra ( commands, extraInfo ) {
	this.commands = commands;
	this.extraInfo = extraInfo;
}

function Commands ( commandName, params ) {
	this.commandName = commandName;
	this.params = params;
}

function JavascriptConfig ( removeJavascript, loadInWebView, javaScript ) {
	this.removeJavascript = removeJavascript;
	this.loadInWebView = loadInWebView;
	this.javaScript = javaScript;
}

function KeyValue ( key, value ) {
	this.key = key;
	this.value = value;
}

function Chapter ( chapName, link, openInWebView ) {
	this.chapName = chapName;
	this.link = link;
	this.openInWebView = openInWebView;
}

function Output ( image, title, link, description, genres, field1, field2, field3, field4, chapters ) {
	this.image = image;
	this.link = link;
	this.title = title;
	this.description = description;
	this.genres = genres;
	this.field1 = field1;
	this.field2 = field2;
	this.field3 = field3;
	this.field4 = field4;
	this.chapters = chapters;
}

function getStuff ( array, match ) {
	for ( var x = 0; x < array.length; x++ ) {
			let data = array[ x ].innerText;
			if ( data.includes( match ) ) {
					return data.replace( match, '' ).trim( );
			}
	}
}

function getHtmlStuff ( array, match ) {
	for ( var x = 0; x < array.length; x++ ) {
			let data = array[ x ].innerText;
			if ( data.includes( match ) ) {
					return array[ x ];
			}
	}
}
var savedData = document.getElementById( 'ketsu-final-data' );
var parsedJson = JSON.parse( savedData.innerHTML );
let emptyKeyValue = [ new KeyValue( '', '' ) ];
var episodes = [ ];

let metadata = document.querySelectorAll('div.post-content div.post-content_item');
let type = '';
let status = '';

for(let info of metadata){
	if(info.querySelector('.summary-heading h5').textContent.includes('Status')){
		status = info.querySelector('.summary-content').textContent.trim();
	} else if (info.querySelector('.summary-heading h5').textContent.includes('Type')){
		type = info.querySelector('.summary-content').textContent.trim();
	}
}

let genres = [ ];
genres = Array.from( document.querySelectorAll( '.genres-content a' ) ).map( g => g.textContent );
let desc = document.querySelector( '.depion-summary' ).textContent.trim( );
let title = document.querySelector( '.post-title h1' ).textContent.trim( );
if ( title.includes( 'VF' ) ) {
	type = 'VF';
} else {
	type = 'VOSTFR'
}
let image = document.querySelector( '.summary_image img' ).src;
image = new ModuleRequest( image, 'get', emptyKeyValue, null );
var chapters = document.querySelector( '.listing-chapters_wrap .main.version-chap' ).querySelectorAll( 'li' );
for ( let i = chapters.length - 1; i >= 0; i-- ) {
	var element = chapters[ i ];
	var fixedLink = element.querySelector( 'a' ).href;
	let episodeName = ''
	if(!element.querySelector('a').textContent.includes('FILM')){
			episodeName = `Episode ${element.querySelector('a').textContent.match(`(-)+(.[0-9]+.)+(${type})`)[2]} ${type}`;
	} else {
			episodeName = element.querySelector('a').textContent;
	}
	let chapter = new Chapter( episodeName, new ModuleRequest( fixedLink, 'get', emptyKeyValue, null ), false );
	episodes.push( chapter );
}
let infoPageObject = new Info( new ModuleRequest( '', '', emptyKeyValue, null ), new Extra( [ new Commands( '', emptyKeyValue ) ], emptyKeyValue ), new JavascriptConfig( false, false, '' ), new Output( image, title, parsedJson.request, desc, genres, status, 'Anime', type, 'Eps: ' + episodes.length, episodes ) );
var finalJson = JSON.stringify( infoPageObject );
savedData.innerHTML = finalJson;
 