"use strict";

/***If we are currently playing any audio. Set to false in init */
var playing = false;

/**The different fade speeds, before they are overwritten by the settings INI */
var SLOW_FADE = 0.03;
var MED_FADE = 0.1;
var FAST_FADE = 0.25;

/**
 * Entry point
 */
$(document).ready(function(){
    //First parse the track data
    parseTrackData();

    //Then prepare to start
    init();
    setInterval(update, 100);
});

/**
 * Starts loading the track data from the hidden embedded iframe
 */
function parseTrackData(){
    var data = $('#tracks').html();
    console.log(data);
}

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

    //Re-set the handler for the fadeButtons
    $('.fadeButton').unbind('click').click(function(){
        //What to do on a click, first remove any selection made visible
        $('.fadeButton').removeClass('btn-primary btn-secondary').addClass('btn-secondary');
        //Then make the new button primary button
        $(this).addClass('btn-primary').removeClass('btn-secondary');

        //Now determine which button was clicked
        switch($(this).attr('id')){
            case 'slowFade':
                volumeEaseFactor = SLOW_FADE;
            break;
            case 'fastFade':
                volumeEaseFacto = FAST_FADE;
            break;
            case 'mediumFade':
                volumeEaseFactor = MED_FADE;
            default:
            break;
        }
    });
}

var noVolume = '<i class="fas fa-volume-off"></i>';
var halfVolume = '<i class="fas fa-volume-down"></i>';
var fullVolume = '<i class="fas fa-volume-up"></i>';

//Used to handle animation frames, the FPS of animations is waay below the FPS for audio fades. (a 1/3 to be exact);
var frameCounter = 0;

/**The default volume ease factor is 0.1, this is a medium fade */
var volumeEaseFactor = MED_FADE;

/**
 * Update handler, will handle audio automation animation and easing
 */
function update(){
    $('audio').each(function(index, track){
        var diff = track.targetVolume - track.volume;
        if(Math.abs(diff) < 0.01) track.volume = track.targetVolume;
        track.volume = constrain(track.volume + diff * volumeEaseFactor, 0, 1);
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

/**
 * Set up the handler of the data loading
 */
window.onmessage = function(event){
    console.log(event.data);
}