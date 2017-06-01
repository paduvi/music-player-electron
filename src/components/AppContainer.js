import React, {PureComponent} from 'react';

//Sound component
import Sound from 'react-sound';

//Custom components
import Details from './Details';
import Player from './Player';
import Progress from './Progress';
import Search from './Search';
import Footer from './Footer';

class AppContainer extends PureComponent {

    constructor(props) {
        super(props);
        this.client_id = '2f98992c40b8edf17423d93bda2e04ab';
        this.state = {
            track: {stream_url: '', title: '', artwork_url: ''},
            tracks: [],
            playStatus: Sound.status.PLAYING,
            elapsed: '00:00',
            total: '00:00',
            position: 0,
            playFromPosition: 0,
            autoCompleteValue: ''
        };
    }

    componentDidMount() {
        this.randomTrack();
    }

    prepareUrl = (url) => {
        //Attach client id to stream url
        return `${url}?client_id=${this.client_id}`
    }

    xlArtwork = (url) => {
        return url ? url.replace(/large/, 't500x500') : null;
    }

    togglePlay = () => {
        // Check current playing state
        if (this.state.playStatus === Sound.status.PLAYING) {
            // Pause if playing
            this.setState({playStatus: Sound.status.PAUSED})
        } else {
            // Resume if paused
            this.setState({playStatus: Sound.status.PLAYING})
        }
    }

    stop = () => {
        // Stop sound
        this.setState({playStatus: Sound.status.STOPPED});
    }

    forward = () => {
        this.setState({playFromPosition: this.state.playFromPosition + 1000 * 10});
    }

    backward = () => {
        this.setState({playFromPosition: this.state.playFromPosition - 1000 * 10});
    }

    handleSelect = (value, item) => {
        this.setState({autoCompleteValue: value, track: item});
    }

    handleChange = async (event, value) => {
        // Update input box
        this.setState({autoCompleteValue: event.target.value});

        //Search for song with entered value
        try {
            const response = await fetch(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`);
            const data = await response.json();
            // Update track state
            this.setState({tracks: data});
        } catch (err) {
            console.log(err);
        }
    }

    formatMilliseconds = (milliseconds) => {
        milliseconds = milliseconds % 3600000;
        const minutes = Math.floor(milliseconds / 60000);
        milliseconds = milliseconds % 60000;
        const seconds = Math.floor(milliseconds / 1000);

        return (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds;
    }

    handleSongPlaying = (audio) => {
        this.setState({
            elapsed: this.formatMilliseconds(audio.position),
            total: this.formatMilliseconds(audio.duration),
            position: audio.position / audio.duration
        })
    }

    handleSongFinished = () => {
        return this.randomTrack();
    }

    randomTrack = async () => {
        try {
            //Request for a playlist via Soundcloud using a client id
            const response = await fetch(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
            const data = await response.json();
            // Store the length of the tracks
            const trackLength = data.tracks.length;
            // Pick a random number
            const randomNumber = Math.floor((Math.random() * trackLength) + 1);
            //Set the track state with a random track from the playlist
            this.setState({track: data.tracks[randomNumber]});
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const scotchStyle = {
            width: '500px',
            height: '500px',
            backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.7),
              rgba(0, 0, 0, 0.7)
            ),   url(${this.xlArtwork(this.state.track.artwork_url)})`
        };

        return (
            <div className="scotch_music" style={scotchStyle}>
                <Search
                    clientId={this.state.client_id}
                    autoCompleteValue={this.state.autoCompleteValue}
                    tracks={this.state.tracks}
                    handleSelect={this.handleSelect}
                    handleChange={this.handleChange}/>
                <Details
                    title={this.state.track.title}/>
                {this.state.track.stream_url && <Sound
                    url={this.prepareUrl(this.state.track.stream_url)}
                    playStatus={this.state.playStatus}
                    onPlaying={this.handleSongPlaying}
                    playFromPosition={this.state.playFromPosition}
                    onFinishedPlaying={this.handleSongFinished}/>}
                <Player
                    togglePlay={this.togglePlay}
                    stop={this.stop}
                    playStatus={this.state.playStatus}
                    forward={this.forward}
                    backward={this.backward}
                    random={this.randomTrack}/>
                <Progress
                    elapsed={this.state.elapsed}
                    total={this.state.total}
                    position={this.state.position}/>
                <Footer />
            </div>
        );
    }
}

export default AppContainer;