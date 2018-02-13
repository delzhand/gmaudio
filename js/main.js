"use strict";

/***If we are currently playing any audio. Set to false in init */
var playing = false;

/**
 * Entry point
 */
$(document).ready(function(){
    init();
    setInterval(update, 100);
});

/**
 * Called to reset all audio parameters and be ready to start
 */
function init(){
    //Stop playing all files just to be sure
    $('audio').each(function(index, track){
        track.currentTime = 0;
        track.volume = 0;
        track.targetVolume = 0;
        playing = false;
    });
}

/**
 * Update handler, will handle audio automation animation and easing
 */
function update(){
    $('audio').each(function(index, track){
        var diff = track.targetVolume - track.volume;
        if(Math.abs(diff) < 0.1) track.volume = track.targetVolume;
        track.volume = constrain(track.volume + diff * 0.1, 0, 1);
    });
}

/**
 * Starts to play the provided track, fades others
 * @param {Track} track 
 */
function playTrack(track){
    if(!playing){
        //If we are not playing yet, first play all tracks
        $('audio').each(function(index, track){ track.play();});
    }
    //Now set all targetVolumes to 0
    $('audio').each(function(index, track){ track.targetVolume = 0;});

    //Only allow the chosen one to play
    var chosenTrack = $('#' + track + "Sound").get(0);
    chosenTrack.targetVolume = 1;
}

/**
 * REturns the constrained value between min and max
 */
function constrain(val, min, max){
    return Math.max(Math.min(max, val), min);
}