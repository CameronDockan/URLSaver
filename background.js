// chrome.commands.onCommand.addListener((command) => {
    
//   chrome.tabs.query({
//     active: true,
//     lastFocusedWindow: true
// }, function(tabs) {

//     let tab = tabs[0];

//     let listOfURLS = JSON.parse(localStorage.getItem("savedURLS")) || [];

//     listOfURLS.push("<li>" + "<a href=" + tab.url + ">" + tab.url + "</a>" + "</li>")
//     localStorage.setItem("savedURLS", JSON.stringify(listOfURLS))

//     let mainP = document.querySelector(".main-p");
    // listOfURLS.forEach(element => {
    //     "<li>" + element + "</li>"
    // });
//     mainP.innerHTML = `${listOfURLS}`;
// });
//   });





