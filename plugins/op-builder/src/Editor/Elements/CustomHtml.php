<?php

namespace OPBuilder\Editor\Elements;

class CustomHtml extends OPElement implements OPElementInterface
{

    /**
     * Overriding abstract method.
     * Before wrapping element manipulate element content.
     *
     * @param  string $html
     * @return string
     */
	public function afterRender($html)
	{
		// Frontend
    	if (!op3_is_admin())
    		return $html;

    	// Live Editor
    	$tags = ['script', 'style', 'link'];
		foreach ($tags as $tag) {
            $html = $this->prepareContentForLiveEditor($tag, $html);
        }

    	return $html;
	}

	/**
	 * Custom html element can have script, style, link html tags
	 * which must be disabled in live editor.
	 * Only way to disable it is to set type="type/op3".
	 *
	 * @param  string $tagName
	 * @param  string $html
	 * @return
	 */
	private function prepareContentForLiveEditor($tagName, $html) 
	{
		// Find all tags with type attribute
		if (preg_match_all('/<' . $tagName . '.?type="(.*?)"/', $html, $matches)) {
			foreach ($matches[1] as $key => $value) {
				$regExp = preg_quote($value, '/');

				// Move type to data-op3-type
				// <style type="text/css"> to <style type="type/op3" data-op3-type="text/css">
				$html = preg_replace('/(<' . $tagName . '?.type)="' . $regExp . '"/', '$1=="type/op3" data-op3-type="' . $value . '"', $html);
			}
		}

		// If tag don't have type attribute add it (type="type/op3")
		$html = preg_replace('/<' . $tagName . '/', '<' . $tagName . ' type="type/op3"', $html);

		return $html;
	}
}
