<div class="ops-box-size-max" style="margin-bottom: 25px;">
    <div class="ops-alert ops-alert-dismissible ops-alert-<?php echo $message->type ?>" data-message-uid="<?php echo $message->uid ?>" data-read-url="<?php echo rest_url('opd/v1/mark-message-read') ?>">
        <?php if ($message->subtitle) : ?>
            <h4 class="ops-alert-heading"><?php echo $message->subtitle; ?></h4>
        <?php endif; ?>

        <p><?php echo $message->body; ?></p>

        <a type="button" class="ops-close js-ops-close-broadcast-message" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></a>
    </div>
</div>
