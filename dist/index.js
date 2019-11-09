"use strict";var __spreadArrays=this&&this.__spreadArrays||function(){for(var s=0,i=0,il=arguments.length;i<il;i++)s+=arguments[i].length;for(var r=Array(s),k=0,i=0;i<il;i++)for(var a=arguments[i],j=0,jl=a.length;j<jl;j++,k++)r[k]=a[j];return r};Object.defineProperty(exports,"__esModule",{value:true});var isBrowser=typeof window!=="undefined"&&typeof window.document!=="undefined";var Logger=function(){function Logger(types){this.types=types;for(var key in types){if(types.hasOwnProperty(key)){var type=types[key];type.enabled=type.enabled===false?false:true;if(isBrowser){type.styles=type.styles.map(function(style){return getStyle(style)})}}}}Logger.prototype.Log=function(type){var messages=[];for(var _i=1;_i<arguments.length;_i++){messages[_i-1]=arguments[_i]}if(this.types[type].enabled){var wrappers=this.types[type].wrappers===undefined?[]:this.types[type].wrappers;var msg="";for(var i=0;i<messages.length;i++){var message=messages[i];var wrapper=wrappers[i];var style=this.types[type].styles[i];if(isBrowser){msg+="%c"+(wrapper&&wrapper[0]?wrapper[0]:"")+message+(wrapper&&wrapper[1]?wrapper[1]:"")}else{var color=typeof style==="string"?"[38;5;"+rgbToAnsi256.apply(void 0,ConvertHexString(style))+"m":style.color?"[38;5;"+rgbToAnsi256.apply(void 0,ConvertHexString(style.color))+"m":"";var background=typeof style==="string"?"":style.background?"[48;5;"+rgbToAnsi256.apply(void 0,ConvertHexString(style.background))+"m":"";msg+=""+color+background+(wrapper&&wrapper[0]?wrapper[0]:"")+message+(wrapper&&wrapper[1]?wrapper[1]:"")+"[0m"}}if(isBrowser){console.log.apply(console,__spreadArrays([msg],this.types[type].styles))}else{console.log(msg)}}};Logger.prototype.SetEnabled=function(type,val){this.types[type].enabled=val};return Logger}();exports.Logger=Logger;function getStyle(style){if(typeof style==="string"){return"color: "+style+";"}else{var res="";for(var key in style){if(style.hasOwnProperty(key)){res+=key+": "+style[key]+";"}}return res}}function rgbToAnsi256(r,g,b){if(r===g&&g===b){if(r<8){return 16}if(r>248){return 231}return Math.round((r-8)/247*24)+232}var ansi=16+36*Math.round(r/255*5)+6*Math.round(g/255*5)+Math.round(b/255*5);return ansi}function ConvertHexString(text){var color={red:0,green:0,blue:0,alpha:0};var raw=text.replace("#","");var length=raw.length;var modulo=length%3;color.red=length>4?parseInt(raw.substring(0,2),16):parseInt(raw.substring(0,1).concat(raw.substring(0,1)),16);color.green=length>4?parseInt(raw.substring(2,4),16):parseInt(raw.substring(1,2).concat(raw.substring(1,2)),16);color.blue=length>4?parseInt(raw.substring(4,6),16):parseInt(raw.substring(2,3).concat(raw.substring(2,3)),16);if(modulo){color.alpha=length>4?parseInt(raw.substring(length-modulo,length),16):parseInt(raw.substring(length-modulo,length).concat(raw.substring(length-modulo,length)),16);color.alpha=color.alpha}else{color.alpha=1}return[color.red,color.green,color.blue]}