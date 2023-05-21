const player = document.querySelector('.player'), 
        playPauseBtn = document.querySelector('.play_pause'),
        prevBtn = document.querySelector('.prev'),
        nextBtn = document.querySelector('.next'),
        audio = document.querySelector('.audio'),
        slider = document.querySelector('.slider > input[type=range]'),
        progress = document.querySelector('.progress'),
        img = document.querySelector('.img'),
        passed = document.querySelector('.passed'),
        dura = document.querySelector('.duration');

// названия песен
const songs = [`Shawn Mendes Wonder`, 
                `Justin Bieber Holy`,
                `Shawn Mendes Imagination`, 
                `SOCRAT Где Ты`,
                `Shawn Mendes It'll Be Okay`,
                `Justin Bieber Ghost`];

// текущая песня
let songIndex = 0;

function setDuration(aud) {
    let a;
    $(aud).on("loadedmetadata", function(){
        a = aud.duration;
        dura.textContent = formatDuration(a);
        slider.value = 0;
    });
    
}

function formatDuration(s) {
    let minutes = Math.floor(s / 60);
    let seconds = Math.round(s % 60);

    let formatted =
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0');

    return formatted;
}

function loadSong(song) {
    audio.src = `audio/${song}.mp3`;
    img.src = `images/img${songIndex + 1}.jpg`;
    setDuration(audio);
}

loadSong(songs[songIndex]);

function playPause(clicked_class) {
    if (clicked_class === 'play_pause') { 
        event.target.classList.add('pressed'); 
        audio.play(); 
    } else {
        event.target.classList.remove('pressed'); 
        audio.pause(); 
    }
    
}

function nextSong() {
    if (++songIndex > songs.length - 1) {
        songIndex = 0;
    }

    slider.value = 0;
    loadSong(songs[songIndex]);
    if (playPauseBtn.classList.contains('pressed')) {
        audio.play();
    }
}

function prevSong() {
    if (--songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    if (playPauseBtn.classList.contains('pressed')) {
        audio.play();
    }
}

// update
audio.addEventListener('timeupdate', () => {
    passed.innerHTML = formatDuration(audio.currentTime);
    console.log(slider.value);
    slider.value = (audio.currentTime * 100) / audio.duration;

    if(audio.currentTime === audio.duration) {
        nextSong();
    }
});

// slider
slider.addEventListener('input', (e) => {
    const currentPlace = e.target.value;
    const currentTime = (currentPlace * audio.duration)/100;
    passed.innerHTML = formatDuration(currentTime);
    audio.currentTime = currentTime;
});