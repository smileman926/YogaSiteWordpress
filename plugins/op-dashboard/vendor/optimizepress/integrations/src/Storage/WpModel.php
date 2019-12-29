<?php

namespace OptimizePress\Integrations\Storage;

use ArrayAccess;
use OptimizePress\Support\Collection;
use OptimizePress\Support\Contracts\Jsonable;

/**
 * WP Eloquent model for an integration
 */
class WpModel implements ArrayAccess, Jsonable
{
    /**
     * @var string
     */
    protected $table;

    /**
     * Construct a new model
     *
     * @param array $attributes
     */
    public function __construct($attributes = [])
    {
        $this->attributes = $attributes;
    }

    /**
     * Find by ID
     *
     * @param  int $id
     * @return static
     */
    public static function find($id)
    {
        global $wpdb;

        $table = (new static)->getTable();
        $entry = $wpdb->get_row("SELECT * FROM $table WHERE id = '$id'", ARRAY_A);

        return $entry ? new static($entry) : null;
    }

    /**
     * Return all entries
     *
     * @return Collection
     */
    public static function all()
    {
        global $wpdb;

        $results = new Collection;
        $table   = (new static)->getTable();
        $entries = $wpdb->get_results("SELECT * FROM $table", ARRAY_A);

        if ($entries) {
            foreach ($entries as $entry) {
                $results->push(new static($entry));
            }
        }

        return $results;
    }

    /**
     * Create new entry (insert)
     *
     * @param  array $data
     * @return WpModel
     */
    public static function create($data = [])
    {
        global $wpdb;

        // Create new entry
        $table  = (new static)->getTable();
        $result = $wpdb->insert($table, $data);

        // Return the created model
        if ($result) {
            return self::find($wpdb->insert_id);
        }
    }

    /**
     * Update existing entry
     *
     * @param array $data
     * @return WpModel
     */
    public function update($data = [])
    {
        global $wpdb;

        // Update the entry
        $wpdb->update($this->getTable(), $data, ['id' => $this->id]);

        // Update attributes
        $this->attributes = array_merge((array) $this->attributes, $data);

        // Re-fetch the model
        return self::find($this->id);
    }

    /**
     * Delete the current model
     *
     * @return bool
     */
    public function delete()
    {
        global $wpdb;

        // First lets find the model
        $model = self::find($this->id);

        if ($model) {
            return (bool) $wpdb->delete($this->getTable(), ['id' => $this->id], ['%d']);
        }
        return true;
    }

    /**
     * Return name of the table
     *
     * @return string
     */
    public function getTable()
    {
        global $wpdb;

        return $wpdb->prefix . $this->table;
    }

    /**
     * Handle dynamic static method calls into the method.
     *
     * @param  string  $method
     * @param  array   $parameters
     * @return mixed
     */
    public static function __callStatic($method, $parameters)
    {
        $instance = new static;

        return call_user_func_array(array($instance, $method), $parameters);
    }

    /**
     * Get model attribute
     *
     * @param  string $key
     * @return mixed
     */
    public function __get($key)
    {
        if (isset($this->$key)) {
            return $this->$key;
        } elseif (isset($this->attributes[$key])) {
            return $this->attributes[$key];
        }
    }

    /**
     * Determine if the given attribute exists.
     *
     * @param  mixed  $offset
     * @return bool
     */
    public function offsetExists($offset)
    {
        return isset($this->$offset);
    }

    /**
     * Get the value for a given offset.
     *
     * @param  mixed  $offset
     * @return mixed
     */
    public function offsetGet($offset)
    {
        return $this->$offset;
    }

    /**
     * Set the value for a given offset.
     *
     * @param  mixed  $offset
     * @param  mixed  $value
     * @return void
     */
    public function offsetSet($offset, $value)
    {
        $this->$offset = $value;
    }

    /**
     * Unset the value for a given offset.
     *
     * @param  mixed  $offset
     * @return void
     */
    public function offsetUnset($offset)
    {
        unset($this->$offset);
    }

    /**
     * Just return attributes as array
     *
     * @return array
     */
    public function toArray()
    {
        return $this->attributes;
    }

    /**
     * Convert the object to its JSON representation.
     *
     * @param  int $options
     * @return string
     */
    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }
}
