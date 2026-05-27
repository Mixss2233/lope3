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
    
    // LANGSUNG PINDAH INSTAN SEKETIKA TANPA DELAY
    if (messagePage) messagePage.style.setProperty('display', 'none', 'important');
    if (countdownPage) {
        countdownPage.style.setProperty('display', 'flex', 'important');
        countdownPage.classList.add('visible');
    }
    
    // Langsung jalankan hitungan murni total
    startCountdown();
}

function startCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    
    // Set tanggal jadian murni (14 Desember 2024)
    const startDate = new Date("12/14/2024 00:00:00");

    countdownInterval = setInterval(function() {
        const now = new Date();
        const diff = now.getTime() - startDate.getTime();

        if (diff < 0) return; // Mencegah eror jika waktu tidak valid

        // 1. Hitung total murni matematika dari milidetik murni keseluruhan
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        // 2. Hitung Total Bulan Murni Keseluruhan (Contoh: 1 tahun 5 bulan langsung terbaca murni 17 bulan)
        let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
        if (now.getDate() < startDate.getDate()) {
            months--;
        }

        // 3. Hitung Total Tahun Murni
        const years = Math.floor(months / 12);

        // Masukkan hasilnya langsung ke tampilan ID HTML bawaan kodemu
        if(document.getElementById("years")) document.getElementById("years").innerText = years;
        if(document.getElementById("months")) document.getElementById("months").innerText = months;
        if(document.getElementById("weeks")) document.getElementById("weeks").innerText = weeks;
        if(document.getElementById("days")) document.getElementById("days").innerText = days;
        if(document.getElementById("hours")) document.getElementById("hours").innerText = hours;
        if(document.getElementById("minutes")) document.getElementById("minutes").innerText = minutes;
        if(document.getElementById("seconds")) document.getElementById("seconds").innerText = seconds;
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
    if (!container) return;
    
    // Variasi simbol kosmik dan warna neon estetik
    const partikelKosmik = ['✨', '⭐', '☄️', '✦', '✧', '💫'];
    const kumpulanWarna = ['#ff1a40', '#ff758c', '#ffccd5', '#ffffff', '#ff8fa2', '#e0aaff'];
    const batasMaksimalPartikel = 180; 
    
    container.innerHTML = '';

    function buatBintangKosmik() {
        if (container.children.length >= batasMaksimalPartikel) return;

        const pembungkus = document.createElement('div');
        pembungkus.className = 'stacked-flower';

        const ikonBintang = document.createElement('span');
        ikonBintang.className = 'flower-icon';
        ikonBintang.innerText = partikelKosmik[Math.floor(Math.random() * partikelKosmik.length)];
        
        // Berikan warna neon acak dari daftar warna
        ikonBintang.style.color = kumpulanWarna[Math.floor(Math.random() * kumpulanWarna.length)];

        const posisiX = Math.random() * 110; // Rentang lebih lebar agar menutup seluruh sudut layar
        const ukuranFont = Math.random() * 16 + 12; // Ukuran bintang bervariasi (12px - 28px)
        const durasiJatuh = Math.random() * 2.5 + 2.5; // Melesat lebih dinamis (2.5s - 5s)
        const rotasiAwal = Math.random() * 360;

        pembungkus.style.left = posisiX + 'vw';
        pembungkus.style.top = '-60px';
        pembungkus.style.fontSize = ukuranFont + 'px';
        pembungkus.style.setProperty('--durasi-animasi', durasiJatuh + 's');

        ikonBintang.style.transform = `rotate(${rotasiAwal}deg)`;
        ikonBintang.setAttribute('data-rotasi', rotasiAwal);

        pembungkus.appendChild(ikonBintang);
        container.appendChild(pembungkus);

        setTimeout(() => {
            pembungkus.remove();
        }, durasiJatuh * 1000);
    }

    // Tembakkan 50 bintang instan di awal
    for(let i = 0; i < 50; i++) {
        buatBintangKosmik();
    }

    // Alirkan bintang baru terus-menerus setiap 60 milidetik agar lebat dan mewah
    if (flowerSpawnInterval) clearInterval(flowerSpawnInterval);
    flowerSpawnInterval = setInterval(buatBintangKosmik, 60);
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

// ======================== PARTIKEL NEMPEL KURSOR & BENTUK HATI ========================
let attachedParticles = [];     
let lastMouseX = 0, lastMouseY = 0;
let heartFormed = false;

function checkHeartShape() {
    const loveText = document.getElementById('love-text');
    if (attachedParticles.length >= 45 && !heartFormed) {
        heartFormed = true;
        loveText.innerHTML = '❤️ TERBENTUK HATI CINTA ❤️';
        loveText.style.fontSize = 'min(12vw, 60px)';
        loveText.style.textShadow = '0 0 20px #ff4d6d, 0 0 40px #ff1a40';
        for (let i = 0; i < attachedParticles.length; i++) {
            const p = attachedParticles[i];
            p.style.transition = 'transform 0.3s ease';
            p.style.transform = 'scale(1.3)';
            setTimeout(() => { if(p) p.style.transform = 'scale(1)'; }, 300);
        }
        createHeartExplosion();
    } else if (attachedParticles.length >= 25 && !heartFormed) {
        loveText.innerHTML = '💖 Semakin banyak... mendekati hati 💖';
    } else if (attachedParticles.length >= 10) {
        loveText.innerHTML = '✨ Kumpulkan lebih banyak ✨';
    }
}

function createHeartExplosion() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerText = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = lastMouseX + 'px';
        heart.style.top = lastMouseY + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10001';
        heart.style.opacity = '1';
        heart.style.transition = 'all 1s ease-out';
        document.body.appendChild(heart);
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 150;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        setTimeout(() => {
            heart.style.transform = `translate(${tx}px, ${ty}px)`;
            heart.style.opacity = '0';
        }, 10);
        setTimeout(() => heart.remove(), 1000);
    }
}

function attachParticle(particleElement, mouseX, mouseY) {
    if (particleElement.classList.contains('attached-particle')) return;
    particleElement.classList.add('attached-particle');
    particleElement.style.position = 'fixed';
    particleElement.style.left = mouseX + 'px';
    particleElement.style.top = mouseY + 'px';
    particleElement.style.margin = '0';
    particleElement.style.transform = 'translate(-50%, -50%) scale(1)';
    particleElement.style.animation = 'none';
    particleElement.style.transition = 'left 0.08s linear, top 0.08s linear';
    
    attachedParticles.push(particleElement);
    checkHeartShape();
    
    if (!window._cursorMoveHandler) {
        window._cursorMoveHandler = true;
        document.getElementById('love-page').addEventListener('mousemove', (e) => {
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            for (let p of attachedParticles) {
                p.style.left = e.clientX + 'px';
                p.style.top = e.clientY + 'px';
            }
        });
    }
}

function startParticleAttraction() {
    const lovePage = document.getElementById('love-page');
    let mouseX = 0, mouseY = 0;
    
    lovePage.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function checkNearbyParticles() {
        const particles = document.querySelectorAll('#flower-shower-container .stacked-flower:not(.attached-particle)');
        for (let p of particles) {
            const rect = p.getBoundingClientRect();
            const centerX = rect.left + rect.width/2;
            const centerY = rect.top + rect.height/2;
            const dist = Math.hypot(centerX - mouseX, centerY - mouseY);
            if (dist < 70) {
                attachParticle(p, mouseX, mouseY);
                break;
            }
        }
        requestAnimationFrame(checkNearbyParticles);
    }
    requestAnimationFrame(checkNearbyParticles);
}

// Simpan fungsi mulaiHujanBunga yang asli, lalu timpa dengan yang baru
const originalMulaiHujanBunga = window.mulaiHujanBunga;
window.mulaiHujanBunga = function() {
    if (originalMulaiHujanBunga) originalMulaiHujanBunga();
    startParticleAttraction();
};

// Perbarui fungsi bukaHalamanCinta agar reset partikel saat love page dibuka
const originalBukaHalamanCinta = window.bukaHalamanCinta;
window.bukaHalamanCinta = function() {
    const flowerPage = document.getElementById('flower-page');
    const lovePage = document.getElementById('love-page');
    if (flowerPage) {
        flowerPage.style.display = 'none';
        flowerPage.classList.remove('visible');
    }
    if (lovePage) {
        lovePage.style.display = 'flex';
        attachedParticles = [];
        heartFormed = false;
        document.getElementById('love-text').innerHTML = '✨ Gerakkan Kursor ke Partikel ✨';
        mulaiHujanBunga();
    }
};

// ======================== PERBAIKAN: Nonaktifkan efek menghindar di love-page ========================
// Simpan fungsi asli
const originalInitLovePageMouseEffect = initLovePageMouseEffect;

// Timpa fungsi initLovePageMouseEffect agar tidak berjalan saat love page aktif
window.initLovePageMouseEffect = function() {
    // Tetap panggil asli, tapi modifikasi event listener-nya agar bisa dimatikan
    const lovePage = document.getElementById('love-page');
    if (!lovePage) return;
    
    // Hapus semua event listener mousemove sebelumnya (jika ada)
    // Karena tidak bisa hapus secara spesifik, kita timpa dengan yang baru yang punya flag
    let isEnabled = true;
    
    function avoidanceHandler(e) {
        if (!isEnabled) return; // Jika dimatikan, tidak lari
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const semuaIkonBunga = document.querySelectorAll('#flower-shower-container .flower-icon');
        // Hanya jalankan jika container flower-shower-container masih ada dan partikel belum menempel
        semuaIkonBunga.forEach(bunga => {
            const parent = bunga.closest('.stacked-flower');
            if (parent && parent.classList.contains('attached-particle')) return; // partikel yang sudah menempel tidak usah dihindari
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
    }
    
    // Hapus event listener lama dengan cara mengambil referensi? Kita langsung replace
    lovePage.removeEventListener('mousemove', avoidanceHandler);
    lovePage.addEventListener('mousemove', avoidanceHandler);
    
    // Simpan fungsi untuk dinonaktifkan saat love page muncul
    window.disableAvoidance = function() {
        isEnabled = false;
    };
    window.enableAvoidance = function() {
        isEnabled = true;
    };
};

// Ubah fungsi bukaHalamanCinta agar menonaktifkan avoidance saat love page terbuka
const superBukaHalamanCinta = window.bukaHalamanCinta;
window.bukaHalamanCinta = function() {
    if (window.disableAvoidance) window.disableAvoidance(); // MATIKAN EFEK MENGHINDAR
    const flowerPage = document.getElementById('flower-page');
    const lovePage = document.getElementById('love-page');
    if (flowerPage) {
        flowerPage.style.display = 'none';
        flowerPage.classList.remove('visible');
    }
    if (lovePage) {
        lovePage.style.display = 'flex';
        attachedParticles = [];
        heartFormed = false;
        document.getElementById('love-text').innerHTML = '✨ Gerakkan Kursor ke Partikel ✨';
        mulaiHujanBunga();
    }
};

// Panggil ulang init agar event listener yang baru terpasang
if (typeof originalInitLovePageMouseEffect === 'function') {
    // Hapus event listener lama dengan cara me-reset love-page
    const lovePage = document.getElementById('love-page');
    if (lovePage) {
        const newLovePage = lovePage.cloneNode(true);
        lovePage.parentNode.replaceChild(newLovePage, lovePage);
        newLovePage.id = 'love-page';
        // Re-attach fungsi baru
        window.initLovePageMouseEffect();
    }
}
