!function(e,t,i){"use strict";if(void 0===e)throw"Missing dependency: jQuery\nhttps://code.jquery.com/";var s=function(e,t){if(!(this instanceof s))throw"SimpleNavTree: SimpleNavTree is a constructor.";this._element=e,this._options=t,this._init()};e.extend(s.prototype,{_defaults:{eventTrigger:"hover",ulSelector:"ul",liSelector:"li",dropdownArrowSelector:".jquery-simple-nav-tree-arrow",collapseDelay:0,eventTriggerAttribute:"data-trigger"},_init:function(){if(this._element=e(this._element).data("jquery-simple-nav-tree",this).addClass("jquery-simple-nav-tree").get(0),!(this._element instanceof Node))throw"SimpleNavTree: element argument must be of type Node.";for(var t in this._options=e.extend({},this._defaults,this._options),this._options)t in this._defaults||delete this._options[t];this.$ui={document:e(this._element.ownerDocument),element:e(this._element),ul:e(this._element).find(this._options.ulSelector).addClass("jquery-simple-nav-tree-ul"),li:e(this._element).find(this._options.liSelector).addClass("jquery-simple-nav-tree-li")},this._uuid=this.$ui.element.attr("id")||this._getUuid(),this._bind()},destroy:function(){this._unbind(),this.$ui.element.removeData("jquery-simple-nav-tree").removeClass("jquery-simple-nav-tree"),this._element=null,this._options=null,delete this.$ui,delete this._uuid},_getUuid:function(){for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t="",i=0;i<8;i++)t+=e.charAt(Math.floor(Math.random()*e.length));var s=this.$ui.document.data("jquery-simple-nav-tree-uuids");return s||(s=[],this.$ui.document.data("jquery-simple-nav-tree-uuids",s)),-1!==s.indexOf(t)?this._getUuid():(s.push(t),t)},_bind:function(){this._unbind();var e=".jquery-simple-nav-tree-"+this._uuid,t=this._options.eventTrigger;"click"!==t&&"auto"!==t||(this.$ui.element.on("click"+e,this._options.liSelector,this._handleListClick.bind(this)),this.$ui.document.on("click"+e,this._handleDocumentClick.bind(this))),"hover"!==t&&"auto"!==t||this.$ui.element.on("mouseenter"+e,this._options.liSelector,this._handleListMouseEnter.bind(this)).on("mouseleave"+e,this._options.liSelector,this._handleListMouseLeave.bind(this))},_unbind:function(){e(null).add(this.$ui.element).add(this.$ui.document).off(".jquery-simple-nav-tree-"+this._uuid)},toggle:function(t){var i=e(t).closest(this._options.liSelector).first();i.length&&(i.is(".jquery-simple-nav-tree-expand")?this.collapse(i):this.expand(i))},expand:function(t){var s=e(t).closest(this._options.liSelector).first();if(s.length){var n=s.parents(this._options.liSelector),o=s.find(this._options.liSelector);this.$ui.li.not(s).not(n).not(o).removeClass("jquery-simple-nav-tree-expand"),e(null).add(s).add(n).addClass("jquery-simple-nav-tree-expand");var l=s.find(this._options.ulSelector).first(),r=l.get(0).getBoundingClientRect(),a=i.documentElement.getBoundingClientRect();r.x+r.width>a.width&&l.addClass("jquery-simple-nav-tree-expand-flip")}},collapse:function(t,i){var s=e(t).closest(this._options.liSelector).first();if(s.length){var n=s.find(this.$ui.li);(n=n.add(s)).removeClass("jquery-simple-nav-tree-expand")}},collapseAll:function(){e(this.$ui.li).removeClass("jquery-simple-nav-tree-expand")},_handleListMouseEnter:function(t){"auto"===this._options.eventTrigger&&"hover"!==e(this._element).attr(this._options.eventTriggerAttribute)||(this._hoverCollapseInterval&&this._hoverCollapseDelay&&clearInterval(this._hoverCollapseInterval),this.expand(t.currentTarget))},_handleListMouseLeave:function(t){"auto"===this._options.eventTrigger&&"hover"!==e(this._element).attr(this._options.eventTriggerAttribute)||(this._hoverCollapseInterval&&this._hoverCollapseDelay&&clearInterval(this._hoverCollapseInterval),this._hoverCollapseDelay=function(e){this.collapse(e),clearInterval(this._hoverCollapseInterval),delete this._hoverCollapseInterval,delete this._hoverCollapseDelay}.bind(this,t.currentTarget),this._hoverCollapseInterval=setTimeout(this._hoverCollapseDelay,this._options.collapseDelay))},_handleListClick:function(t){if("auto"!==this._options.eventTrigger||"click"===e(this._element).attr(this._options.eventTriggerAttribute)){var i=e(t.currentTarget).closest(this._options.liSelector).first();i.length&&(i.is(".jquery-simple-nav-tree-expand")?this.collapse(i,!0):this.expand(i),t.stopPropagation(),e(t.target).is(this._options.dropdownArrowSelector)&&t.preventDefault())}},_handleDocumentClick:function(t){if("auto"!==this._options.eventTrigger||"click"===e(this._element).attr(this._options.eventTriggerAttribute)){var i=e(t.target);i.closest(this.$ui.li).length||(this.collapseAll(),i.is(this._options.dropdownArrowSelector)&&t.preventDefault())}}}),e.fn.simpleNavTree=function(t){var i=e(this),n=Array.prototype.slice.call(arguments,1);return i.each(function(){var o=e(this).data("jquery-simple-nav-tree");if(o||(o=new s(this,"object"==typeof t?t:{})),"string"==typeof t){if(!("_"!==t.substr(0,1)&&t in o&&"function"==typeof o[t]))throw"SimpleNavTree: no method named '"+t+"'";var l=o[t].apply(o,n);if(void 0!==l)return i=l,!1}}),i}}(jQuery,window,document);