!function(t,a,n){"use strict";t(function(){t('[data-op3-element-type="countdowntimer"]').each(function(){var a=t(this).find(" > .op3-countdown-timer"),n=new Date(a.attr("data-op3-date-time")),r=a.attr("data-op3-redirect-url"),c=a.attr("data-op3-text"),d=a.attr("data-op3-finish-action");a.countdown(n).on("update.countdown",function(t){s(t,this)}).on("finish.countdown",function(){"redirect"===d?i(r):a.html("<h1>"+c+"</h1>")})})});var s=function(a,n){n instanceof jQuery||(n=t(n));var s='<div class="wrapper day"><span class="digits day">%D</span><span class="units day">'+n.attr("data-op3-unit-day")+"</span></div>",i='<div class="wrapper hr"><span class="digits hr">%H</span><span class="units hr">'+n.attr("data-op3-unit-hour")+"</span></div>",r='<div class="wrapper min"><span class="digits min">%M</span><span class="units min">'+n.attr("data-op3-unit-min")+"</span></div>",c='<div class="wrapper sec"><span class="digits sec">%S</span><span class="units sec">'+n.attr("data-op3-unit-sec")+"</span></div>",d="",e=a.strftime("%D"),p=a.strftime("%H"),o=a.strftime("%M");d=0==e&&0==p&&0==o?c:0==p&&0==o?r+c:0==e?i+r+c:s+i+r+c,n.html(a.strftime(d))},i=function(t){t.length>0&&a.location.replace(t)}}(jQuery,window,document);