<?php

namespace OptimizePress\Integrations\Services\Contracts;

interface IntegrationHasTagsInterface
{
    public function getTags();
    public function getTag($tagId);
}
