
        </main>
    </div> <!-- #page .hfeed .site -->
        <footer id="colophon" class="site-footer" role="contentinfo" itemscope="itemscope" itemtype="http://schema.org/WPFooter">
            <section class="op-footer">
                <div class="container op-container">
                    <div class="row">
                        <?php op_footer_sidebars(); ?>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <?php op_footer_logo(); ?>
                        </div>
                        <div class="col-sm-12 footer-copyright">
                            <?php op_footer_copyright(); ?>
                            <?php op_footer_powered_by(); ?>
                        </div>
                    </div>
                </div>
            </section>
            <?php wp_footer(); ?>
        </footer>
</body>
</html>
