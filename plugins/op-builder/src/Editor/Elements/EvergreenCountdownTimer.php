<?php

namespace OPBuilder\Editor\Elements;

class EvergreenCountdownTimer extends OPElement implements OPElementInterface
{
    /**
     * Save this data to the elements storage option
     * You can either return true, or build up an array with additional data
     *
     * @return array|bool
     */
    public function saveToElementStorage()
    {
        return true;
    }
}
