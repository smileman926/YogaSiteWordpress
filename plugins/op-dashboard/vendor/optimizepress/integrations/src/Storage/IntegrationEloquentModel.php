<?php

namespace OptimizePress\Integrations\Storage;

use Illuminate\Database\Eloquent\Model;

/**
 * Eloquent model for an integration
 */
class IntegrationEloquentModel extends Model
{
    /**
     * @var string
     */
    protected $table = 'optimizepress_integrations';

    /**
     * @var array
     */
    protected $fillable = ['title', 'provider', 'sl_auth', 'connection_data', 'ping', 'authorized', 'user_id', 'type'];

    /**
     * @var array
     */
    protected $casts = [
        'data'            => 'object',
        'connection_data' => 'object',
        'sl_auth'         => 'bool',
        'ping'            => 'bool',
        'authorized'      => 'bool',
    ];
}
