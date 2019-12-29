<?php if ($customer) : ?>
    <div class="customer-info">
        <p>Hello, <?php echo $customer->full_name; ?>. Your OptimizePress Suite subscription is valid and connected!</p>
        <p>
            Your subscription is valid until
            <i><strong><?php echo date(get_option('date_format'), strtotime(date("Y-m-d", strtotime($customer->eligible_until)))) ?></strong></i>
        </p>
        <hr>
        You currently have the <strong>"<?php echo $customer->tier->title ?>"</strong>.
        <hr>
        <p>You can test the connection again by disconnecting: <a href="<?php echo \OPDashboard\sl_disconnect_url() ?>">Disconnect</a></p>
    </div>


    <!--
    <div class="stats">
        <div class="stat-item">
            <h3>Last 7 Days Stats</h3>
            <p>Get a quick overview of your OptimizePress landing pages with these stats</p>
        </div>
        <div class="stat-item">
            <span class="opd-optins">250</span> optins
        </div>
        <div class="stat-item">
            <span class="opd-visitors">2560</span> visitors
        </div>
        <div class="stat-item">
            <i class="fa fa-search" aria-hidden="true"></i> <a href="#">View Stats</a>
        </div>
        <div class="stat-item">
            <i class="fa fa-search" aria-hidden="true"></i> <a href="#">View Experiments</a>
        </div>
    </div>
    -->
<?php endif; ?>
