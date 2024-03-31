var maxStreams = 5
var activeStreams = 0


var currentDownload = 0;


var searching = false
var needToResearch = false

// This allows us to load all the modules asynchronously with a max amount of active downloads of {maxStreams} without overloading

function searchForActiveStreams() {
    print("started")
    if (searching) {
        needToResearch = true
        return
    }
     searching = true
     print("searching")


    if (currentDownload > Object.keys(parsedRawModules).length - 1) {
       // completedDownloading()
        return}

    while (activeStreams < maxStreams) {
        activeStreams+= 1
        let currentDownloadIndex = currentDownload;
        currentDownload+= 1;
        download(currentDownloadIndex)
    }

    finishedSearching()
}

function finishedSearching() {
    searching = false
    if (needToResearch) { 
        needToResearch = false
        print("meeds to research")
        searchForActiveStreams()
    }
}

var completedDownload = false;
function completedDownloading() {
    updateTagsSelection()
    deleteSkeletons();
    reorderModules()
}


function download(index) { 
    print("donwloading" + index)
    // when we finish the download we rest -1 to the activestreams
    if (index > Object.keys(parsedRawModules).length - 1) {
        //completedDownloading()
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", parsedRawModules[index].url, true);
    xhr.onload = (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status != 200) {return} 
            // save module data
            addModle("a" + (index), xhr.responseText)
            activeStreams-=1;
            print("downloaded " + index)
            searchForActiveStreams();
            downloadCompleted();
            if (index  >= Object.keys(parsedRawModules).length - 1) {
                setTimeout(() => {
                    completedDownloading();
                },500);
            }
        }
    };

    xhr.onerror = (e) => {
        downloadCompleted();
        activeStreams-=1;
        print("failed " + index)
        searchForActiveStreams();
    };
    xhr.send(null);

}

var completed = [];
function downloadCompleted() {
completed.push(1);
if (completed.length == parsedRawModules.length ) {
    completedDownloading();
}
}


function startAsyncDownload() {
    searchForActiveStreams();
}


