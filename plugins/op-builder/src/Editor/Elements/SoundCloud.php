<?php

namespace OPBuilder\Editor\Elements;

use OPBuilder\Editor\Elements\OPElementConfig;

class SoundCloud extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'srcSoundcloudAutoplay', ' iframe', 'srcSoundCloudAutoplay', ' iframe' ],
    ];

    public function afterRender($html)
    {
        // Backend
    	if (op3_is_admin()) {
            return $html;
        }

        $autoplay = $this->getOption('srcSoundCloudAutoplay', 'all');

        if ($autoplay->{' iframe'} == 1) {
            $html = str_replace('auto_play=false', 'auto_play=true', $html);
        }

        return $html;
    }
}

