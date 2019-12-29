<div id="frame" class="op3-frame">
    <div class="wrapper">
        <?php
        /**
         * This ensures the designer.js doesn't execute before live-editor.js is fully loaded.
         * It's needed because designer.js is accessing dependencies from live-editor.js
         * via window.parent.OP3, which can in some cases, on slower-3G network
         * connections, break the editor (OP3-1081)
         */
        ?>
        <iframe src="" id="op3-designer-iframe"></iframe>
        <style>#op3-designer-iframe { border: 0; }</style>
        <script>
            ;(function() {
                var onReady = function() {
                    var src = "<?php echo (isset($_GET['id'])) ? op3_get_editor_url($_GET['id']) : null ?>";
                    document.querySelector("#op3-designer-iframe").setAttribute("src", src);
                }

                if (/complete|interactive|loaded/.test(document.readyState))
                    onReady();
                else
                    window.addEventListener("DOMContentLoaded", onReady());
            })();
        </script>
    </div>
</div>
