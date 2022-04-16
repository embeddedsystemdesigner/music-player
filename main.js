// choose elements in html document
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const durationEL = document.getElementById('duration');
const currentTimeEL = document.getElementById('current-time');



//music name and other information
const songs = [
    {
        name: 'jacinto-1',
        displayNamge: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayNamge: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayNamge: 'Front Row (Rimix)',
        artist: 'Metric/Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
    }
];
////////////////////////////////////////////////////////////////////////////////////////




let songIndex = 0;
let isPlaying = false;




// load a new song
function loadSong(song) {
    title.textContent = song.displayNamge;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
////////////////////////////////////////////////////////////////////////////////////////

// play song
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}
////////////////////////////////////////////////////////////////////////////////////////

// pause song
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}
////////////////////////////////////////////////////////////////////////////////////////

// move  the time of music forward or backward 
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;

}
////////////////////////////////////////////////////////////////////////////////////////


// update progress bar and current time and total time ghraphically when the song is moving or ... 
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPecent = (currentTime / duration) * 100;
        progress.style.width = `${progressPecent}%`;
        const durationMinutes = Math.floor(duration / 60);
        let durationSecond = Math.floor(duration % 60);
        if (durationSecond < 10) {
            durationSecond = `0${durationSecond}`;
        }

        if (durationSecond) {
            durationEL.textContent = `${durationMinutes}:${durationSecond}`;
        }


        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;

    }

}
////////////////////////////////////////////////////////////////////////////////////////

// load a new song and plays it
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();

}
////////////////////////////////////////////////////////////////////////////////////////

// go to previuse song and plays it
function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();

}
////////////////////////////////////////////////////////////////////////////////////////

// add event listener for click and event
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);



loadSong(songs[songIndex]);