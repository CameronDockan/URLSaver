chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function(tabs) {

    let tab = tabs[0];
    const addURLButton = document.querySelector(".addURLButton");
    const addNamedURLButton = document.querySelector(".addNamedURLButton");
    const clearButton = document.querySelector(".clearButton");
    let mainUL = document.querySelector(".main-ul");
    let listOfURLS = [];

    const pushURLToList = () => {
        listOfURLS.push(`<li class="listItem">` + "<a href=" + tab.url + ">" + tab.url + "</a>" + "</li>"); // + "<br>"
    }

    const setStorage = () => {
        chrome.storage.local.set({ savedURLS: listOfURLS }).then(() => {
            console.log('storage saved to local');
        })
    }

    const getStorage = () => {
        chrome.storage.local.get('savedURLS').then((result) => {
            if (!result.savedURLS) {
                mainUL.innerHTML = "empty";
            } else {
                listOfURLS = result.savedURLS;
                mainUL.innerHTML = result.savedURLS.join('');

            }
        })
    }

    chrome.storage.onChanged.addListener(getStorage);


    const addURL = () => {
        getStorage();
        pushURLToList();
        setStorage();
    }
    addURLButton.addEventListener("click", addURL);


    const addNamedURL = () => {
        getStorage();
        let nameOrNot = confirm("name your link?");
        let nameOfLink;
        if(nameOrNot) nameOfLink = prompt("name the link!");
        if(nameOrNot == false || nameOfLink == null) {
            nameOfLink = tab.url;
        }
        const pushNamedURLToList = () => {
            listOfURLS.push(`<li class="listItem">` + "<a href=" + tab.url + ">" + nameOfLink + "</a>" + "</li>"); // + "<br>"

        }
        pushNamedURLToList();
        setStorage();
    }
    addNamedURLButton.addEventListener("click", addNamedURL);


    const clearList = () => {
        chrome.storage.local.clear();
        window.location.reload();
    }
    clearButton.addEventListener("click", clearList)

    window.onload = getStorage();
});

document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
    // HYPER-LINK FUNCTIONALITY
    window.addEventListener('click',function(e){
        if(e.target.href!==undefined){
          chrome.tabs.create({url:e.target.href})
        }
      })
});