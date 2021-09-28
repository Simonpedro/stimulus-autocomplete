var t,e=require("@hotwired/stimulus"),s=(t=require("lodash.debounce"))&&"object"==typeof t&&"default"in t?t.default:t,i=function(t){function e(){for(var e=[],s=arguments.length;s--;)e[s]=arguments[s];t.apply(this,e),this.extractTextValue=function(t){return t.hasAttribute("data-autocomplete-label")?t.getAttribute("data-autocomplete-label"):t.textContent.trim()}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.connect=function(){this.close(),this.inputTarget.setAttribute("autocomplete","off"),this.inputTarget.setAttribute("spellcheck","false"),this.mouseDown=!1,this.onInputChange=s(this.onInputChange.bind(this),300),this.onResultsClick=this.onResultsClick.bind(this),this.onResultsMouseDown=this.onResultsMouseDown.bind(this),this.onInputBlur=this.onInputBlur.bind(this),this.onKeydown=this.onKeydown.bind(this),this.inputTarget.addEventListener("keydown",this.onKeydown),this.inputTarget.addEventListener("blur",this.onInputBlur),this.inputTarget.addEventListener("input",this.onInputChange),this.resultsTarget.addEventListener("mousedown",this.onResultsMouseDown),this.resultsTarget.addEventListener("click",this.onResultsClick),"string"==typeof this.inputTarget.getAttribute("autofocus")&&this.inputTarget.focus()},e.prototype.disconnect=function(){this.hasInputTarget&&(this.inputTarget.removeEventListener("keydown",this.onKeydown),this.inputTarget.removeEventListener("focus",this.onInputFocus),this.inputTarget.removeEventListener("blur",this.onInputBlur),this.inputTarget.removeEventListener("input",this.onInputChange)),this.hasResultsTarget&&(this.resultsTarget.removeEventListener("mousedown",this.onResultsMouseDown),this.resultsTarget.removeEventListener("click",this.onResultsClick))},e.prototype.sibling=function(t){var e=Array.from(this.resultsTarget.querySelectorAll('[role="option"]:not([aria-disabled])')),s=this.resultsTarget.querySelector('[aria-selected="true"]'),i=e.indexOf(s),n=t?e[i+1]:e[i-1];return n||(t?e[0]:e[e.length-1])},e.prototype.select=function(t){for(var e,s,i=0,n=this.resultsTarget.querySelectorAll('[aria-selected="true"]');i<n.length;i+=1){var r=n[i];r.removeAttribute("aria-selected"),(e=r.classList).remove.apply(e,this.selectedClasses)}t.setAttribute("aria-selected","true"),(s=t.classList).add.apply(s,this.selectedClasses),this.inputTarget.setAttribute("aria-activedescendant",t.id),t.scrollIntoView(!1)},e.prototype.onKeydown=function(t){switch(t.key){case"Escape":this.isHidden||(this.hideAndRemoveOptions(),t.stopPropagation(),t.preventDefault());break;case"ArrowDown":var e=this.sibling(!0);e&&this.select(e),t.preventDefault();break;case"ArrowUp":var s=this.sibling(!1);s&&this.select(s),t.preventDefault();break;case"Tab":var i=this.resultsTarget.querySelector('[aria-selected="true"]');i&&this.commit(i);break;case"Enter":var n=this.resultsTarget.querySelector('[aria-selected="true"]');n&&!this.isHidden&&(this.commit(n),this.hasSubmitOnEnterValue||t.preventDefault())}},e.prototype.onInputBlur=function(){this.mouseDown||this.close()},e.prototype.commit=function(t){if("true"!==t.getAttribute("aria-disabled")){if(t instanceof HTMLAnchorElement)return t.click(),void this.close();var e=this.extractTextValue(t),s=t.getAttribute("data-autocomplete-value")||e;this.inputTarget.value=e,this.hasHiddenTarget?(this.hiddenTarget.value=s,this.hiddenTarget.dispatchEvent(new Event("input")),this.hiddenTarget.dispatchEvent(new Event("change"))):this.inputTarget.value=s,this.inputTarget.focus(),this.hideAndRemoveOptions(),this.element.dispatchEvent(new CustomEvent("autocomplete.change",{bubbles:!0,detail:{value:s,textValue:e}}))}},e.prototype.onResultsClick=function(t){if(t.target instanceof Element){var e=t.target.closest('[role="option"]');e&&this.commit(e)}},e.prototype.onResultsMouseDown=function(){var t=this;this.mouseDown=!0,this.resultsTarget.addEventListener("mouseup",function(){return t.mouseDown=!1},{once:!0})},e.prototype.onInputChange=function(){this.element.removeAttribute("value"),this.fetchResults()},e.prototype.identifyOptions=function(){for(var t=0,e=0,s=this.resultsTarget.querySelectorAll('[role="option"]:not([id])');e<s.length;e+=1){s[e].id=this.resultsTarget.id+"-option-"+t++}},e.prototype.hideAndRemoveOptions=function(){this.close(),this.resultsTarget.innerHTML=null},e.prototype.fetchResults=function(){var t=this,e=this.inputTarget.value.trim();if(!e||e.length<this.minLengthValue)this.hideAndRemoveOptions();else if(this.hasUrlValue){var s=new URL(this.urlValue,window.location.href),i=new URLSearchParams(s.search.slice(1));i.append("q",e),s.search=i.toString(),this.element.dispatchEvent(new CustomEvent("loadstart")),fetch(s.toString(),{headers:{"X-Requested-With":"XMLHttpRequest"}}).then(function(t){return t.text()}).then(function(e){t.resultsTarget.innerHTML=e,t.identifyOptions(),!!t.resultsTarget.querySelector('[role="option"]')?t.open():t.close(),t.element.dispatchEvent(new CustomEvent("load")),t.element.dispatchEvent(new CustomEvent("loadend"))}).catch(function(){t.element.dispatchEvent(new CustomEvent("error")),t.element.dispatchEvent(new CustomEvent("loadend"))})}},e.prototype.open=function(){this.isHidden&&(this.hasSkipHiddenPropertyValue||(this.resultsTarget.hidden=!1),this.isHidden=!1,this.element.setAttribute("aria-expanded","true"),this.element.dispatchEvent(new CustomEvent("toggle",{detail:{action:"open",inputTarget:this.inputTarget,resultsTarget:this.resultsTarget}})))},e.prototype.close=function(){this.isHidden||(this.hasSkipHiddenPropertyValue||(this.resultsTarget.hidden=!0),this.isHidden=!0,this.inputTarget.removeAttribute("aria-activedescendant"),this.element.setAttribute("aria-expanded","false"),this.element.dispatchEvent(new CustomEvent("toggle",{detail:{action:"close",inputTarget:this.inputTarget,resultsTarget:this.resultsTarget}})))},e}(e.Controller);i.targets=["input","hidden","results"],i.classes=["selected"],i.values={submitOnEnter:Boolean,url:String,minLength:Number,skipHiddenProperty:Boolean},exports.Autocomplete=i;
//# sourceMappingURL=stimulus-autocomplete.js.map
