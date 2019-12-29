<?php

namespace OPBuilder\Editor\Page;

use OPDashboard\Providers\RecaptchaProvider;
use stdClass;

trait Assets
{
    /**
     * Enqueue the page assets
     *
     * @return void
     */
    public function enqueueAssets()
    {
        global $post;

        // Fonts summary from database
        $summary = isset($this->summary, $this->summary->fonts) ? $this->summary->fonts : new stdClass();

        // Append default fonts on blank template if
        // no record is in database
        if (empty((array) $summary) && $this->pageTemplate === 'op_builder_blank') {
            $summary = new stdClass();
            $summary->{'IBM Plex Sans'} = array('400', '700');
            $summary->{'Poppins'} = array('400', '700');
        } else {
            // on old templates there are no default fonts in summary
            // temp solution as these 2 fonts will always load
            // @todo optimise old templates after vacation time
            if ($this->pageTemplate === 'op_builder_blank' && is_object($summary)) {
                if (! isset($summary->{'IBM Plex Sans'}))
                    $summary->{'IBM Plex Sans'} = array('400', '700');
                if (! isset($summary->{'Poppins'}))
                    $summary->{'Poppins'} = array('400', '700');
            }
        }

        if (! empty((array) $summary)) {
            // To avoid repeating iteration of fonts config
            // (which is a big object) we're gonna filter it
            // with only necessary items
            $config = array();
            if (is_array($summary) || op3_is_admin()) {
                $config = array_filter(op3_config('fonts'), function($item) use ($summary) {
                    if (is_object($summary)) {
                        return isset($summary->{$item['title']});
                    } else {
                        return in_array($item['uid'], (array)$summary);
                    }
                });
            }


            // Backward compatibility: fix sequential array
            // (the way we used to handle fonts)
            if (is_array($summary)) {
                $fonts = $summary;
                $summary = new stdClass();

                foreach ($config as $item) {
                    if ($item['url'] && in_array($item['uid'], $fonts)) {
                        $title = $item['title'];
                        $url = $item['url'];
                        $parse = parse_url($url);
                        $query = $parse['query'];
                        parse_str($query, $query);

                        $family = $query['family'];
                        $arr = explode(':', $family);
                        //$title = $arr[0];
                        $decour = isset($arr[1]) ? $arr[1] : '';

                        $summary->$title = empty($decour) ? array() : explode(',', $decour);
                    }
                }
            }

            if (op3_is_admin()) {
                // In live editor each font family must be included
                // as it's own link tag so live editor can recognize
                // that the font is loaded (loading font family with
                // all it's weights and styles)
                foreach ($config as $item) {
                    if (isset($summary->{$item['title']})) {
                        $this->assets->appendHtmlToHead('<link class="op3-designer-stylesheet-font-family" rel="stylesheet" href="' . $item['url'] . '" />');
                    }
                }
            } else {
                // Frontend font family single request to google api
                $fonts = array();
                foreach ($summary as $family => $decour) {
                    $fonts[] = urlencode($family) . (! empty($decour) ? ':' . implode(',', $decour) : '');
                }

                $this->assets->appendHtmlToHead('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=' . implode('|', $fonts) . '" />');
            }
        }

        // Generate a file name
        //$fileName = 'page-' . $this->id . (($this->summary['timestamp'] and $this->summary['timestamp']) ? '-' . $this->summary['timestamp']: '');
        $fileName      = 'page-' . $this->id;
        $fileTimestamp = (isset($this->summary->timestamp) && $this->summary->timestamp) ? $this->summary->timestamp : '';
        $fileUrl       = op3_asset('cache/' . $fileName . '.css', false);

        // Frontend op3 stylesheets - loading only if it is OP3 page
        if (! op3_is_admin() && is_op3_page($post->ID)) {
            $this->assets->enqueueStylesheet('op3-frontend-stylesheet', $fileUrl, ['timestamp' => $fileTimestamp]);
        }

        // Then add the custom stylesheet as inline code at the end of the head tag
        $this->assets->appendHtmlToHead($this->stylesheet->toString());

        // Frontend op3 scripts - loading only if it is OP3 page
        if (! op3_is_admin() && is_op3_page($post->ID)) {
            // Generate a file name
            //$fileName = 'page-' . $this->id . (($this->summary['timestamp'] and $this->summary['timestamp']) ? '-' . $this->summary['timestamp']: '');
            $fileName      = 'page-' . $this->id;
            $fileTimestamp = ($this->summary->timestamp && $this->summary->timestamp) ? $this->summary->timestamp : '';
            $fileUrl       = op3_asset('cache/' . $fileName . '.js', false);

            $this->assets->enqueueScript('op3-frontend-scripts', $fileUrl, ['dependencies' => ['jquery'], 'timestamp' => $fileTimestamp], true);
        }
    }

    /**
     * Generate and spit out the page stylesheets
     * Also includes the fonts
     *
     * @param  bool $echo
     * @return string
     */
    public function generateStylesheet($echo = true)
    {
        $stylesheetContent = '';
        $userAgentIsIE = op3_is_ie();

        // We do not have to include these stylesheets on live-editor,
        // gulp adds all stylesheets to designer.css
        if (op3_is_admin()) {
            return;
        }

        // Check for template and add template specific styles (Bootstrap reboot only for now)
        $includes = [];
        if ($this->pageTemplate === 'op_builder_blank') {
            $includes[] = op3_asset_path('css/op3-reboot.css');
        }

        // Essential styles used throughout components
        $includes[] = op3_asset_path('css/op3-core.css');

        // Add elements (for element types)
        if ($this and $this->summary and isset($this->summary->elements)) {
            $includes[] = op3_asset_path('css/elements/default/op3-element.css');

            foreach ($this->summary->elements as $item) {
                $elementName = kebab_case($item);
                $includes[] = op3_asset_path('css/elements/' . $elementName . '/op3-element.css');

                // internet explorer magic
                if ($userAgentIsIE && file_exists(op3_asset_path('css/elements/' . $elementName . '/op3-element-ie.css'))) {
                    $includes[] = op3_asset_path('css/elements/' . $elementName . '/op3-element-ie.css');
                }

                // ...and it's assets from config
                foreach(op3_element_config($item)['assets'] as $asset) {
                    if (strtolower(substr($asset, -4)) == '.css') {
                        $includes[] = $asset;
                    }
                }
            }
        }

        // Include all stylesheet files
        foreach(array_unique($includes) as $file) {
            ob_start();
            if (file_exists($file)) {
                include($file);
            }
            $stylesheetContent .= ob_get_clean();
        }

        // Generate stylesheet for each element
        $mediaRules = $this->stylesheet->mediaRules();
        if ($mediaRules and count($mediaRules)) {
            foreach ($mediaRules as $media => $elements) {
                $stylesheetContent .= '@media ' . $media . ' {'.PHP_EOL;
                foreach ($elements as $element) {
                    $stylesheetContent .= $element;
                }
                $stylesheetContent .= '}'.PHP_EOL;;
            }
        }

        // Spit it out
        if ($echo) {
            echo $stylesheetContent;
        } else {
            return $stylesheetContent;
        }
    }

    /**
     * Generate and spit out the page scripts
     *
     * @param  bool $echo
     * @return string
     */
    public function generateScripts($echo = true)
    {
        $scriptContent = '';

        if (op3_is_admin()) {
            return;
        }

        $includes = [];
        if ($this and $this->summary and isset($this->summary->elements)) {
            foreach ($this->summary->elements as $item) {
                foreach(op3_element_config($item)['assets'] as $asset) {
                    if (strtolower(substr($asset, -3)) == '.js') {
                        $includes[] = $asset;
                    }
                }
            }
        }

        foreach(array_unique($includes) as $file) {
            ob_start();
            if (file_exists($file)) {
                include($file);
            }
            $scriptContent .= ob_get_clean();
        }

        // let us see if we have Google Recaptcha key
        $recaptchaProvider = new RecaptchaProvider;

        // Custom OP3 properties
        $op3 = array(
            'Meta' => array(
                'pageId' => $this->id,
                'homeUrl' => home_url(),
                'siteUrl' => site_url(),
                'facebookAppId' => get_option('opd_facebook_app_id'),
                'facebookLang' => get_option('opd_facebook_locale'),
            ),
            'GoogleRecaptcha' => array(
                'googleRecaptchaSiteKey' => $recaptchaProvider->getGoogleReCaptchaSiteKey(),
            ),
        );
        $scriptContent = ''
            . ';window.OP3='
            . json_encode($op3)
            . ';' . PHP_EOL
            . $scriptContent;

        // Spit it out
        if ($echo) {
            echo $scriptContent;
        } else {
            return $scriptContent;
        }
    }
}
