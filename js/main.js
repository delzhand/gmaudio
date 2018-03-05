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

var noVolume = '<i class="fas fa-volume-off"></i>';
var halfVolume = '<i class="fas fa-volume-down"></i>';
var fullVolume = '<i class="fas fa-volume-up"></i>';

var frameCounter = 0;

/**
 * Update handler, will handle audio automation animation and easing
 */
function update(){
    $('audio').each(function(index, track){
        var diff = track.targetVolume - track.volume;
        if(Math.abs(diff) < 0.1) track.volume = track.targetVolume;
        track.volume = constrain(track.volume + diff * 0.1, 0, 1);
    });
    frameCounter ++;
    if(frameCounter > 1){
        frameCounter = 0;
        updateIcons();
    }
}

/**
 * Updates the icons, this is done a little les frequently to prevent DOM updates
 */
function updateIcons(){
    $('audio').each(function(index, track){
        //Set icon according to track volume
        var volumeID = '#' + track.id.replace(/Sound/g, '') + "Volume";
        var icon = track.volume < 0.1 ? noVolume : track.volume < 0.5 ? halfVolume : fullVolume;
        var opacity = track.volume * 0.8 + 0.2;
        var fontweight = track.volume * 400 + 400;
        $(volumeID).html(icon).attr('style', 'opacity: ' + opacity + ";font-weight: " + fontweight);
    });              
}

/**
 * Starts to play the provided track, fades others
 * @param {Track} track 
 * @param {Number} seconds to start at, undefined or -1 to start at currentPos
 */
function playTrack(track, startPos){
    if(!playing){
        //If we are not playing yet, first play all tracks
        $('audio').each(function(index, track){ track.play();});
    }
    //Now set all targetVolumes to 0
    $('audio').each(function(index, track){ track.targetVolume = 0;});

    //Only allow the chosen one to play
    var chosenTrack = $('#' + track + "Sound").get(0);
    chosenTrack.targetVolume = 1;
	if(startPos && startPos != -1){
		chosenTrack.currentTime = startPos;
	}
}

/**
 * REturns the constrained value between min and max
 */
function constrain(val, min, max){
    return Math.max(Math.min(max, val), min);
}