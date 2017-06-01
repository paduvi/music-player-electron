/**
 * Created by chotoxautinh on 6/1/17.
 */
import React from 'react';

import Sound from 'react-sound';

const Player = ({backward, forward, togglePlay, playStatus, stop, random}) => (
    <div className="player">
        {/*Rewind Button*/}
        <div className="player__backward">
            <button onClick={backward}><i className="fa fa-backward"></i></button>
        </div>
        <div className="player__main">
            {/*Play/Pause Button*/}
            <button onClick={togglePlay}>
                <i className={playStatus !== Sound.status.PLAYING ? 'fa fa-play' : 'fa fa-pause'}/>
            </button>
            {/*Stop Button*/}
            <button onClick={stop}><i className="fa fa-stop"></i></button>
            {/*Random Track Button*/}
            <button onClick={random}><i className="fa fa-random"></i></button>
        </div>
        {/*Forward Button*/}
        <div className="player__forward">
            <button onClick={forward}><i className="fa fa-forward"></i></button>
        </div>
    </div>

);

export default Player;