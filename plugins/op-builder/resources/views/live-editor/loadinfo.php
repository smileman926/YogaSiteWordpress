<style id="op3-loadinfo-css">
    .op3-loading #header,
    .op3-loading #sidebar,
    .op3-loading .op3-loadinfo-wrapper {
        opacity: 0;
        width: 0;
        height: 0;
        overflow: hidden;
    }
</style>

<div id="loadinfo" class="op3-loadinfo op3-loadinfo-init op3-loadinfo-active" style="--op3-progressbar-start:0.01;">
    <div class="op3-loadinfo-wrapper">
        <p class="op3-loadinfo-message">Loading OptimizePress</p>
        <span class="op3-loadinfo-progressbar"></span>
    </div>
    <a class="op3-loadinfo-close" href="#" onclick="return !!OP3.LiveEditor.close(true)">
        <i class="op3-icon op3-icon-simple-remove-1"></i>
    </a>
</div>
