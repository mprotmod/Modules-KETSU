  function Info(request, extra, javascriptConfig, output) {
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

  function Chapter(chapName, link, openInWebView) {
      this.chapName = chapName;
      this.link = link;
      this.openInWebView = openInWebView;
  }

  function Output(image, title, link, description, genres, field1, field2, field3, field4, chapters) {
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
  var savedData = document.getElementById('ketsu-final-data');
  var parsedJson = JSON.parse(savedData.innerHTML);
  let emptyKeyValue = [new KeyValue('Referer', 'https://zoro.to')];
  var airing;
  var status;
  var image = document.querySelector('.film-poster img').src;
  image = new ModuleRequest(image, 'get', emptyKeyValue, null);
  if (document.querySelector('.anisc-detail h2').textContent != document.querySelector('.anisc-detail h2').dataset.jname) {
      var title = document.querySelector('.anisc-detail h2').textContent + '/' + document.querySelector('.anisc-detail h2').dataset.jname
  } else {
      var title = document.querySelector('.anisc-detail h2').dataset.jname
  };
  var desc = '';
  try {
      desc = document.querySelector('div.anis-content > div.anisc-detail > div.film-depion.m-hide > div').textContent.trim();
  } catch (e) {
      desc = document.querySelector('.anisc-info').textContent.trim();
  }
  var animeinfo = document.querySelector('div.anisc-info-wrap > div.anisc-info');
  for (var x = 0; x < animeinfo.children.length; x++) {
      if (animeinfo.children[x].textContent.trim().includes('Status')) {
          var status = animeinfo.children[x].textContent.split('Status:')[1].trim();
      } else if (animeinfo.children[x].textContent.trim().includes('Aired')) {
          var airing = animeinfo.children[x].textContent.split('Aired:')[1].trim();
      }
  }
  var genres = Array.from(document.querySelectorAll('.item.item-list a')).map(g => g.textContent);
  var type = 'Anime';
  var episodes = [];
  var json = document.querySelector('#wrapper').dataset.id;
  var nextRequest = `https://zoro.to/ajax/v2/episode/list/${json}`;
  let infoPageObject = new Info(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, airing, type, 'Eps: ' + episodes.length, episodes));
  var finalJson = JSON.stringify(infoPageObject);
  savedData.innerHTML = finalJson;
