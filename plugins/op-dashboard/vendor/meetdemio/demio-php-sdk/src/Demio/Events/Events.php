<?php

/**
 * @author Oleksandr Torosh <webtorua@gmail.com>
 */
namespace Demio\Events;

use Demio\Injectable;

/**
 * Class Events
 * @package Demio\Events
 */
class Events extends Injectable
{

    /**
     * @return \Demio\Results
     */
    public function getList()
    {
        return $this->getRequest()->get('events');
    }

    /**
     * @param $id
     * @return \Demio\Results
     */
    public function getEvent($id)
    {
        return $this->getRequest()->get('event/' . $id);
    }

    /**
     * @param $id
     * @param $date_id
     * @return \Demio\Results
     */
    public function getEventDate($id, $date_id)
    {
        return $this->getRequest()->get('event/' . $id . '/date/' . $date_id);
    }

    /**
     * @param $params
     * @return \Demio\Results
     */
    public function register($params)
    {
        return $this->getRequest()->put('event/register', $params);
    }
}