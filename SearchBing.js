// ==UserScript==
// @name         Bot for Bing (v0.2)
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description
// @author       Kuprin Dmitriy
// @match        https://www.bing.com/*
// @match        https://kiteuniverse.ru/*
// @match        https://motoreforma.com/*
// @match        https://napli.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// ==/UserScript==

let sites = {
"napli.ru": ["10 самых популярных шрифтов от Google", "VS Code", "как использовать DevTools браузера", "Отключение редакций и ревизий в WordPress",
	"Вывод произвольных типов записей и полей в WordPress"],
"kiteuniverse.ru": ["Шоу воздушных змеев", "Kite Universe", "Красота. Грация. Интеллект"],
"motoreforma.com": ["мотореформа", "прошивки для CAN-AM", "тюнинг для квадроциклов Maverick X3"]
}
let searchIndex = Object.keys(sites);
let site = searchIndex[getRandom(0, searchIndex.length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let links = document.links;
let bingInput = document.getElementsByName("q")[0];
let btn = document.getElementById("search_icon");

if (btn != undefined) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.bing.com"){
  site = getCookie("site");
} else {
  site = location.hostname;
}

if (btn != undefined) {
	let i = 0;
	let timerId = setInterval(() => {
		bingInput.value += keyword[i];
		i++;
		if (i == keyword.length) {
			clearInterval(timerId);
			btn.click();
		}
	}, 300);
} else if (location.hostname == site) {
	console.log("Мы на целевом сайте");
	setInterval(() => {
		let index = getRandom(0, links.length);
		if (getRandom(0, 101) >= 70) {
			location.href = "https://www.bing.com/";
		}
		if (links.length == 0) {
			location.href = site;
		}
		if (links[index].href.indexOf(site) != -1) {
			links[index].click();
		}
	}, getRandom(2000, 5000));
} else {
	let nextBingPage = true;
	for (let i = 0; i < links.length; i++) {
		if (links[i].href.indexOf(site) != -1) {
			let link = links[i];
			nextBingPage = false;
			console.log("Нашел строку " + link);
			setTimeout(() => link.click(), getRandom(2500, 4000));
			break;
		}
	}
	let elementExist = setInterval(() => {
		let element = document.querySelector(".b_widePag");
		if (element != null) {
			if (element.innerText == "5") {
				nextBingPage = false;
				location.href = "https://www.bing.com/";
			}
			clearInterval(elementExist);
		}
	}, 100);
	if (nextBingPage) {
		setTimeout(() => document.getElementsByClassName("sw_next")[0].click(), getRandom(2000, 4000));
	}
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
