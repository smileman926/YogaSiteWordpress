<?php

namespace OptimizePress\Integrations\Storage;

/**
 * WP Eloquent model for an integration
 */
class IntegrationWpModel extends WpModel
{
    /**
     * @var string
     */
    protected $table = 'optimizepress_integrations';

    /**
     * Find integration by UID
     *
     * @param  string $uid
     * @return static
     */
    public static function findByUid($uid)
    {
        global $wpdb;

        $table = (new static)->getTable();
        $entry = $wpdb->get_row("SELECT * FROM $table WHERE uid = '$uid'", ARRAY_A);

        return $entry ? new static($entry) : null;
    }

    /**
     * Find integration by provider
     *
     * @param  string $provider
     * @return static
     */
    public static function findByProvider($provider)
    {
        global $wpdb;

        $table = (new static)->getTable();
        $entry = $wpdb->get_row("SELECT * FROM $table WHERE provider = '$provider'", ARRAY_A);

        return $entry ? new static($entry) : null;
    }

    /**
     * Delete integration record by provider
     *
     * @param  string $provider
     * @return void
     */
    public static function deleteByProvider($provider)
    {
        global $wpdb;

        $table = (new static)->getTable();
        $wpdb->get_row("DELETE FROM $table WHERE provider = '$provider'", ARRAY_A);
    }
}
