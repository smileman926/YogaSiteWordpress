<?php

namespace OPBuilder\Editor\Render;

class CustomJsRender extends BasePropertyRender
{
    /**
     * Render the property on the page.
     *
     * @return void
     */
    public function render()
    {
        if (is_single() || is_page()) {
            $scripts = $this->output();

            // Is Live Editor?
            if (op3_is_admin()) {
                $scripts = $this->prepareScriptsForLiveEditor($scripts);
            }

            echo $scripts;
        }
    }

    /**
     * Prepare html script tags for OP3 Live Editor.
     *
     * @param  array  $scripts
     * @return string|void
     */
    public function prepareScriptsForLiveEditor($scripts) {
		$result = '';

		// Html class attr selector
		$selector = $this->selector();

		// Split string by html script tags
		preg_match_all("/<script.*?>.*?<\/script>|<link.*?\/?>/s", $scripts, $splited);

		if (!$splited && $splited[0]) {
            return;
        }

		foreach ($splited[0] as $script) {
            // Get html node type
            $nodeType = 'script';
            if (preg_match('/<link/', $script))
                $nodeType = 'link';

			// if type attr already exists
			// store it to new attribute
			// and set type="script/op3"
    		if (preg_match('/ type="(.*?)"/', $script, $matches)) {
    			$regExp = preg_quote($matches[1]);
    			$script = preg_replace('/type="(.*?)"/', ' type="' . $nodeType . '/op3" data-op3-type="' . $regExp . '"', $script);
    		}

    		// If there is no type="" attribute
    		// set it to type="script/op3"
    		if (! preg_match('/ type="(.*?)"/', $script)) {
                $script = preg_replace('/<' . $nodeType . '/', '<' . $nodeType . ' type="' . $nodeType . '/op3"', $script);
            }

    		// If there is no class attr
    		// set it to class="op3-custom-header-js"
    		if (! preg_match('/class="(.*?)"/', $script)) {
                $script = preg_replace('/<' . $nodeType . '/', '<' . $nodeType . ' class="'.$selector.'"', $script);
            }

    		$result .= $script;
    	}

        return $result;
    }
}
