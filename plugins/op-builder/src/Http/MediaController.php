<?php

namespace OPBuilder\Http;

class MediaController
{
    /**
     * Display media picker
     *
     * @return void
     */
    public function picker()
    {
        wp_enqueue_media();

        echo op3_view('live-editor/media');
    }
}
