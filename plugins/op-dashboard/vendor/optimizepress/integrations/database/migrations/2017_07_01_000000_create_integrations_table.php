<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOptimizePressIntegrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('optimizepress_integrations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uid')->index()->unique()->nullable();
            $table->integer('user_id')->index()->nullable();
            $table->string('type')->index()->default('default');
            $table->tinyInteger('sl_auth')->index()->default(0);
            $table->string('provider')->index()->nullable();
            $table->string('title')->nullable();
            $table->text('connection_data')->nullable();
            $table->tinyInteger('authorized')->default(0);
            $table->tinyInteger('ping')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('optimizepress_integrations');
    }
}
