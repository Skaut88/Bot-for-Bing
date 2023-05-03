// ==UserScript==
// @name         Bot for Bing (v0.1)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Kuprin Dmitriy
// @match        https://www.bing.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// ==/UserScript==

let keywords = ["10 самых популярных шрифтов от Google", "VS Code", "как использовать DevTools браузера", "Отключение редакций и ревизий в WordPress",
	"Вывод произвольных типов записей и полей в WordPress"];
let keyword = keywords[getRandom(0, keywords.length)];
let bingInput = document.getElementsByName("q")[0];
let btn = document.getElementById("search_icon");
let links = document.links;
if (btn != undefined) {
  bingInput.value = keyword;
  btn.click();
} else {
    for(let i = 0; i < links.length; i++) {
      if (links[i].href.indexOf("napli.ru") != -1) {
        let link = links[i];
        console.log("Нашёл строку " + link);
        link.click();
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
