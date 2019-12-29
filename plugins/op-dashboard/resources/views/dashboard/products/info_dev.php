<div class="opd-product-floating-info" style="position: absolute; top: 5px; left: 15px; background: rgba(0,0,0,.1); border-radius: 5px; padding: 5px; width: 25%; color: #000; font-size: 11px;">
    Installed: <?php echo $product->isInstalled() ? '<span style="color: #0c0">yes</span>' : '<span style="color: #c00">no</span>' ?><br>
    Active: <?php echo $product->isActive() ? '<span style="color: #0c0">yes</span>' : '<span style="color: #c00">no</span>' ?><br>
</div>
