<?php

namespace OPBuilder\Editor\Elements;

class Video extends OPElement implements OPElementInterface
{
    protected $selectorChanges = [
        [ 'aspectRatio', ' [data-op3-code]', null, ' [data-op3-aspect-ratio]' ],
    ];

    /**
     * Remove autoplay for admin
     *
     * @param  string $html
     * @return string
     */
    public function afterRender($html)
    {
        if (op3_is_admin()) {
            return $html;
        }

        $type = $this->getFirstOptionValue('videoSource', 'all');

        // When video source is vimeo, youtube, wistia
        // fill src attr from data-op3-src.
        if ($type === 'vimeo' || $type === 'youtube' || $type === 'wistia') {
            $src = $this->getFirstOptionValue('videoSrc', 'all');
            $html = preg_replace('/ src="(.*?)"/', ' src="' . $src . '"', $html);

            // If video is not visible directly on page (for example it's in popoverlay)
            // remove iframe src to avoid video data loading.
            // Javascript part will fill src attr from data-op3-src attr.
            if ($this->haveParent('popoverlay')) {
                $html = preg_replace('/ src="(.*?)"/', ' src=""', $html);
            }

            // There was one doublequote surplus when video source is youtube.
            // Because of that youtube fullscreen wasn't working.
            $html = str_replace('allowfullscreen"="">', 'allowfullscreen="">', $html);
        }

        return $html;
    }
}
