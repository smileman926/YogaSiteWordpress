<?php

namespace OPBuilder\Editor\Elements;

use OptimizePress\Support\Contracts\Arrayable;
use WP_Post;
use function OptimizePress\Support\array_get;
use function OptimizePress\Support\object_get;

class OPGlobalElement implements Arrayable
{
    /**
     * @var int
     */
    protected $gid;

    /**
     * @var WP_Post
     */
    protected $post;

    /**
     * @var array
     */
    protected $meta = [
        'gid'         => null,
        'title'       => null,
        'description' => null,
        'type'        => null,
        'thumb'       => null,
        'category_id' => null,
    ];

    /**
     * OPGlobalElement constructor.
     *
     * @param  array  $element
     */
    public function __construct(array $element = [])
    {
        $this->setup($element);
    }

    /**
     * Setup element data from an array
     *
     * @param $data
     */
    public function setup($data)
    {
        $this->gid  = (string) array_get($data, 'gid', array_get($data, 'id'));
        $this->post = get_post($this->gid);

        // Set the readable data
        $this->meta['gid']   = $this->gid;
        $this->meta['title'] = $this->post->post_title;
    }

    /**
     * Load meta data for current global element
     *
     * @param  bool  $includeData
     * @return OPGlobalElement
     */
    public function loadMeta($includeData = true): OPGlobalElement
    {
        // Fetch meta data from post meta table
        $meta = (object) @json_decode(get_post_meta($this->gid, '_op3_ge_meta', true), false);

        // And assign it to the element
        $this->assignMeta([
            'title'       => object_get($meta, 'title'),
            'description' => object_get($meta, 'description'),
            'type'        => object_get($meta, 'type'),
            'category_id' => object_get($meta, 'category_id'),
            'thumb'       => object_get($meta, 'thumb'),
        ]);

        // Also add OP3 data
        if ($includeData) {
            $this->assignMeta(['data' => (object) @json_decode((string) get_post_meta($this->gid, '_op3_data', true), false)]);
        }

        return $this;
    }

    /**
     * Assign loaded meta data to the global elements
     *
     * @param  array|object $meta
     * @return array
     */
    public function assignMeta($meta): array
    {
        // Convert to object
        $meta = (object) $meta;

        // Assign values
        if (isset($meta->type))        $this->meta['type']        = $meta->type;
        if (isset($meta->title))       $this->meta['title']       = $meta->title;
        if (isset($meta->description)) $this->meta['description'] = $meta->description;
        if (isset($meta->thumb))       $this->meta['thumb']       = $meta->thumb;
        if (isset($meta->data))        $this->meta['data']        = $meta->data;
        if (isset($meta->category_id)) $this->meta['category_id'] = $meta->category_id;

        return $this->meta;
    }

    /**
     * Return element data
     *
     * @param  string  $key
     * @return mixed
     */
    public function data($key = null)
    {
        if ($key && isset($this->meta['data']->$key)) {
            return $this->meta['data']->$key;
        }

        return $this->meta['data'];
    }

    /**
     * Return element data
     *
     * @param  string  $key
     * @return bool
     */
    public function hasData($key): bool
    {
        return (bool) isset($this->meta['data']->$key);
    }

    /**
     * Timestamp when element was created
     *
     * @return string|null
     */
    public function createdAt()
    {
        return $this->post ? $this->post->post_date : null;
    }

    /**
     * Timestamp when element was updated
     *
     * @return string|null
     */
    public function updatedAt()
    {
        return $this->post ? $this->post->post_modified_gmt : null;
    }

    /**
     * Get a value
     *
     * @param  string $key
     * @return mixed
     */
    public function __get($key)
    {
        if (! isset($this->{$key})) {
            return array_get($this->meta, $key);
        }

        return $this->{$key};
    }

    /**
     * @param  string $key
     * @param  mixed  $value
     * @return void
     */
    public function __set($key, $value)
    {
        $this->meta[$key] = $value;
    }

    /**
     * Convert element object to array
     *
     * @return array
     */
    public function toArray(): array
    {
        return (array) $this->meta;
    }
}
