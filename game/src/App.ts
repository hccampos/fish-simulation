/// <reference path="../definitions/require.d.ts" />
///<reference path='Game.ts'/>

require.config({
    baseUrl: '/js',

    paths: {
        jquery: '/vendor/jquery'
    },

    shim: {
        jquery: {
            exports: '$'
        }
    }
});

require([
    'Game',
    'jquery'
], (
    Game,
    $
) => {
    'use strict';

    $(document).ready(function() {
        var game = new Game();
        game.run();
    });
});