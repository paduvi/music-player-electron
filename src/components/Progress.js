/**
 * Created by chotoxautinh on 6/1/17.
 */
import React from 'react';

const Progress = ({elapsed, total, position}) => (
    <div className="progress">
        {/* Elapsed time */}
        <span className="player__time-elapsed">{elapsed}</span>
        {/* Progress Bar */}
        <progress
            value={position}
            max="1"></progress>
        {/* Total time */}
        <span className="player__time-total">{total}</span>
    </div>
)

export default Progress;