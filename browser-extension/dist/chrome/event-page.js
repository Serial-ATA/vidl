!function(o){function e(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return o[t].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=o,e.c=n,e.d=function(o,n,t){e.o(o,n)||Object.defineProperty(o,n,{configurable:!1,enumerable:!0,get:t})},e.n=function(o){var n=o&&o.__esModule?function(){return o.default}:function(){return o};return e.d(n,"a",n),n},e.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},e.p="",e(e.s=0)}([function(o,e,n){"use strict";function t(o,e,n,t){chrome.notifications.clear(n,function(){chrome.notifications.create(n,{type:"basic",title:o,message:e,iconUrl:"icon128.png"})})}chrome.runtime.onMessage.addListener(function(o,e,n){chrome.tabs.query({active:!0,currentWindow:!0},function(e){i.init(e[0].url,o.format)})}),chrome.commands.onCommand.addListener(function(o){var e=void 0;"dl_last"==o?(e=localStorage.getItem("lastFormat"))||(e="mp3"):"dl_mp3"==o?e="mp3":"dl_mp4"==o&&(e="mp4"),chrome.tabs.query({active:!0,currentWindow:!0},function(o){i.init(o[0].url,e,o[0].title)})});var r=0,l=function(){return String(r++)},i={};i.init=function(o,e,n){var r=l();t("Download Started",null,r);var i=!1,c=new WebSocket("§VIDL_URL_PROD§");c.onclose=function(o){if(!i){console.log("ws err - The server connection closed unexpectedly."),console.log(o);t("Error Downloading Video","The server connection closed unexpectedly. Code: "+o.code,r,!0)}},c.onopen=function(n){console.log("ws open"),console.log(n);var t={url:o,format:e};c.send(JSON.stringify(t))},c.onmessage=function(o){var e=JSON.parse(o.data),l=e.type;if("err"==l)console.log("vidl err - "+e.msg),console.log(e),t("Error Downloading Video",e.msg+" Code: "+e.code,r,!0),i=!0,c.close();else if("info"==l)console.log("info"),console.log(e),e.uploader&&e.title?t("Download Started",e.uploader+" - "+e.title,r):e.uploader?t("Download Started",e.uploader,r):e.title&&t("Download Started",e.title,r);else if("file"==l){console.log("file"),console.log(e);var a="Download Complete";e.lastFile?(i=!0,c.close()):a="Download 0 of "+e.totalFiles+" Complete",e.uploader&&e.title?t(a,e.uploader+" - "+e.title,r,!0):e.uploader?t(a,e.uploader,r,!0):e.title?t(a,e.title,r,!0):t(a,n),chrome.downloads.download({url:"§VIDL_DL_URL_PROD§"+e.id})}}}}]);