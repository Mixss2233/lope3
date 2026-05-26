// ======================== GLOBAL VARIABLES ========================
let audio;
let countdownInterval = null;
let flowerSpawnInterval = null;

// ======================== GIFT PAGE FUNCTIONS ========================
function animateAndOpenGift() {
    const giftBox = document.getElementById('gift-box');
    const giftPage = document.getElementById('gift-page');
    const messagePage = document.getElementById('message-page');
    
    if (giftBox.classList.contains('open')) return;
    
    giftBox.classList.add('open');

    setTimeout(() => {
        giftPage.classList.add('hidden');
    }, 800);

    setTimeout(() => {
        messagePage.classList.add('visible');
    }, 1200);
}

// ======================== COUNTDOWN FUNCTIONS ========================
function showCountdown() {
    const messagePage = document.getElementById('message-page');
    const countdownPage = document.getElementById('countdown-page');
    
    messagePage.classList.remove('visible');
    
    setTimeout(() => {
        countdownPage.classList.add('visible');
        startCountdown();
    }, 800);
}

function startCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    
    const startDate = new Date("12/14/2024 00:00:00");

    countdownInterval = setInterval(function() {
        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        let weeks = Math.floor(days / 7);
        days = days % 7;

        document.getElementById("years").innerText = years;
        document.getElementById("months").innerText = months;
        document.getElementById("weeks").innerText = weeks;
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    }, 1000);
}

// ======================== FLOWER & MUSIC PAGE ========================
function showFlowerPage() {
    const countdownPage = document.getElementById('countdown-page');
    const flowerPage = document.getElementById('flower-page');
    
    countdownPage.classList.remove('visible');
    
    setTimeout(() => {
        flowerPage.classList.add('visible');
    }, 800);
}

// ======================== MUSIC PLAYER FUNCTIONS ========================
function togglePlay() {
    const playIcon = document.getElementById('play-icon');
    const albumArt = document.getElementById('album-art');
    const turntableArm = document.getElementById('turntable-arm');
    const visualizer = document.getElementById('visualizer');
    
    if (audio.paused) {
        audio.play().catch(error => {
            alert("Gagal memutar lagu. Pastikan file 'Smpai Jadi Debu.mp3' di folder yang sama.");
        });
        playIcon.innerHTML = "⏸";
        playIcon.style.marginLeft = "0px";
        albumArt.classList.add('playing');
        turntableArm.classList.add('playing');
        visualizer.classList.add('playing');
    } else {
        audio.pause();
        playIcon.innerHTML = "▶";
        playIcon.style.marginLeft = "2px";
        albumArt.classList.remove('playing');
        turntableArm.classList.remove('playing');
        visualizer.classList.remove('playing');
    }
}

function setActiveLyric(index) {
    const lines = document.querySelectorAll('.lyric-row');
    lines.forEach((line, idx) => {
        if (idx === index) {
            if (!line.classList.contains('active')) {
                line.classList.add('active');
                line.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            line.classList.remove('active');
        }
    });
}

function resetPlayer() {
    const playIcon = document.getElementById('play-icon');
    const albumArt = document.getElementById('album-art');
    const turntableArm = document.getElementById('turntable-arm');
    const visualizer = document.getElementById('visualizer');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    
    playIcon.innerHTML = "▶";
    playIcon.style.marginLeft = "2px";
    albumArt.classList.remove('playing');
    turntableArm.classList.remove('playing');
    visualizer.classList.remove('playing');
    if (progressBar) progressBar.style.width = "0%";
    if (currentTimeEl) currentTimeEl.innerText = "0:00";
    setActiveLyric(0);
}

function changeVolume(amount) {
    if (!audio) return;
    let newVolume = audio.volume + amount;
    if (newVolume > 1.0) newVolume = 1.0;
    if (newVolume < 0.0) newVolume = 0.0;
    audio.volume = newVolume;
}

// ======================== FLOWER SHOWER & LOVE PAGE ========================
function mulaiHujanBunga() {
    const container = document.getElementById('flower-shower-container');
    const kumpulanBunga = ['🌸', '🌷', '🌹', '🌺', '🌻', '💝'];
    let jumlahBunga = 0;
    const batasBunga = 450;

    if (flowerSpawnInterval) clearInterval(flowerSpawnInterval);
    
    flowerSpawnInterval = setInterval(() => {
        if (jumlahBunga >= batasBunga) { 
            clearInterval(flowerSpawnInterval);
            setTimeout(() => {
                document.getElementById('love-text').classList.add('reveal');
            }, 1200);
            return;
        }

        for (let i = 0; i < 2; i++) {
            if (jumlahBunga >= batasBunga) break;

            const pembungkus = document.createElement('div');
            pembungkus.className = 'stacked-flower';

            const ikonBunga = document.createElement('span');
            ikonBunga.className = 'flower-icon';
            ikonBunga.innerText = kumpulanBunga[Math.floor(Math.random() * kumpulanBunga.length)];

            const urutanX = Math.random() * 96;
            const ukuran = Math.random() * 16 + 20;
            const titikBerhentiY = Math.random() * 92;
            const durasiJatuh = Math.random() * 1.8 + 2.2;
            const rotasiAwal = Math.random() * 360;

            pembungkus.style.left = urutanX + 'vw';
            pembungkus.style.fontSize = ukuran + 'px';
            pembungkus.style.setProperty('--stop-y', titikBerhentiY + 'vh');
            pembungkus.style.setProperty('--fall-duration', durasiJatuh + 's');

            ikonBunga.style.transform = `rotate(${rotasiAwal}deg)`;
            ikonBunga.setAttribute('data-rotasi', rotasiAwal);

            pembungkus.appendChild(ikonBunga);
            container.appendChild(pembungkus);
            jumlahBunga++;
        }
    }, 30);
}

function bukaHalamanCinta() {
    const flowerPage = document.getElementById('flower-page');
    const lovePage = document.getElementById('love-page');

    if (flowerPage) {
        flowerPage.style.display = 'none';
        flowerPage.classList.remove('visible');
    }

    if (lovePage) {
        lovePage.style.display = 'flex';
    }
    
    mulaiHujanBunga();
}

// ======================== HEART BACKGROUND ========================
function createHearts() {
    const heartContainer = document.getElementById('heart-container');
    const heartsCount = 42;
    const heartIcons = ['🌸', '💖', '💕', '✨', '💗', '💞', '🌸', '🌷', '🌺', '💝'];

    for (let i = 0; i < heartsCount; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 4 + 3.5 + 's';
        heart.style.animationDelay = Math.random() * 7 + 's';
        heart.style.fontSize = Math.random() * 16 + 16 + 'px';
        heartContainer.appendChild(heart);
    }
}

// ======================== MOUSE AVOIDANCE FOR FLOWERS ========================
function initLovePageMouseEffect() {
    const lovePage = document.getElementById('love-page');
    if (!lovePage) return;
    
    lovePage.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const semuaIkonBunga = document.querySelectorAll('.flower-icon');

        semuaIkonBunga.forEach(bunga => {
            const koordinat = bunga.getBoundingClientRect();
            const bungaX = koordinat.left + koordinat.width / 2;
            const bungaY = koordinat.top + koordinat.height / 2;

            const selisihX = bungaX - mouseX;
            const selisihY = bungaY - mouseY;
            const jarak = Math.sqrt(selisihX * selisihX + selisihY * selisihY);
            const radiusHindar = 100;
            const rotasiAsli = bunga.getAttribute('data-rotasi') || 0;

            if (jarak < radiusHindar) {
                const kekuatan = (radiusHindar - jarak) / radiusHindar;
                const lariX = (selisihX / jarak) * kekuatan * 45;
                const lariY = (selisihY / jarak) * kekuatan * 45;
                bunga.style.transform = `translate(${lariX}px, ${lariY}px) rotate(${rotasiAsli}deg)`;
            } else {
                bunga.style.transform = `translate(0px, 0px) rotate(${rotasiAsli}deg)`;
            }
        });
    });
}

// ======================== DOM CONTENT LOADED INIT ========================
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi audio
    audio = document.getElementById('music-track');
    if (audio) {
        audio.volume = 0.7;
        
        audio.addEventListener('timeupdate', function() {
            const progressBar = document.getElementById('progress-bar');
            const currentTimeEl = document.getElementById('current-time');
            
            if (progressBar && audio.duration) {
                let progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = progress + "%";
            }
            
            if (currentTimeEl) {
                let currentSecs = Math.floor(audio.currentTime);
                let mins = Math.floor(currentSecs / 60);
                let secs = currentSecs % 60;
                currentTimeEl.innerText = mins + ":" + (secs < 10 ? "0" : "") + secs;
            }
            
            // Highlight lyric berdasarkan waktu
            let currentSecs = Math.floor(audio.currentTime);
            if (currentSecs >= 75) {
                setActiveLyric(3);
            } else if (currentSecs >= 50) {
                setActiveLyric(2);
            } else if (currentSecs >= 25) {
                setActiveLyric(1);
            } else {
                setActiveLyric(0);
            }
        });
        
        audio.addEventListener('ended', resetPlayer);
    }
    
    // Inisialisasi background hearts
    createHearts();
    
    // Inisialisasi efek mouse untuk love page
    initLovePageMouseEffect();
});