!function(a,e,t){"use strict";a(t).ready(function(){a(function(){a('[data-op3-element-type="video"] iframe').load(function(){a('[data-op3-element-type="video"] .op3-video-image-overlay').on("click",n)})})});var n=function(e){var t=a(this).parent().find("iframe"),n=t.attr("src");-1!==n.indexOf("autoplay=0")?n=n.replace("autoplay=0","autoplay=1"):n=n+=(n.indexOf("?")>-1?"&":"?")+"autoplay=1";t.attr("src",n),a(this).css("display","none")}}(jQuery,window,document);