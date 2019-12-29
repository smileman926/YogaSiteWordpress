<?php

use PHPUnit\Framework\TestCase;
use OptimizePress\Integrations\LeadOptions;

final class LeadOptionsOptinReasonTest extends TestCase
{
    public function testUnsetOptinReasonReturnsDefault()
    {
        $leadOptions = new LeadOptions;

        $this->assertEquals($leadOptions->getOptinReason(), 'Contact Was Opted In through OptimizePress integrations');
    }

    public function testSetOptinReasonDoesNotReturnDefault()
    {
        $leadOptions = new LeadOptions;
        $leadOptions->setOptinReason('Dummy text');

        $this->assertNotEquals($leadOptions->getOptinReason(), 'Contact Was Opted In through OptimizePress integrations');
    }

    public function testSetOptinReasonReturnSetText()
    {
        $leadOptions = new LeadOptions;
        $leadOptions->setOptinReason('Dummy text');

        $this->assertEquals($leadOptions->getOptinReason(), 'Dummy text');
    }
}