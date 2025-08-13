document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LÓGICA DE CARGA DINÁMICA DEL BOT ---
    const params = new URLSearchParams(window.location.search);
    const botId = params.get('bot') || 'bom-seok'; // Si no hay ID en la URL, carga 'bom-seok' por defecto

    // Busca el objeto del bot en nuestro array 'botsData' (que viene de bots-data.js)
    const botSeleccionado = botsData.find(b => b.id === botId);

    if (botSeleccionado) {
        pintarBotEnLaPagina(botSeleccionado);
    } else {
        // Si no se encuentra el bot, muestra un error
        document.body.innerHTML = '<h1>Error 404: Bot no encontrado</h1>';
        return; // Detiene la ejecución del resto del script
    }

    // --- 2. FUNCIÓN PARA "PINTAR" EL BOT ---
    function pintarBotEnLaPagina(bot) {
        // Datos generales
        document.getElementById('pagina-titulo').textContent = bot.tituloPagina;
        document.getElementById('bot-polaroid-img').src = bot.imagenPolaroid;
        document.getElementById('bot-polaroid-img').alt = `Imagen de ${bot.nombre}`;
        document.getElementById('bot-washi-tape').textContent = bot.washiTape;
        document.getElementById('bot-nombre').textContent = bot.nombre;
        document.getElementById('bot-cita').textContent = bot.cita;

        // Reproductor
        document.getElementById('song').src = bot.audioSrc;
        document.getElementById('bot-song-name').textContent = bot.nombreCancion;
        document.getElementById('bot-song-artist').textContent = bot.artistaCancion;

        // Ficha de datos
        document.getElementById('bot-ficha-nombre').innerHTML = bot.ficha.nombreCompleto;
        document.getElementById('bot-ficha-edad').innerHTML = bot.ficha.edad;
        document.getElementById('bot-ficha-genero').innerHTML = bot.ficha.genero;
        document.getElementById('bot-ficha-preferencia').innerHTML = bot.ficha.preferencia;

        // Etiquetas (se generan dinámicamente)
        const tagsContainer = document.getElementById('bot-tags-container');
        tagsContainer.innerHTML = ''; // Limpiar por si acaso
        bot.tags.forEach(tag => {
            tagsContainer.innerHTML += `<span><i class="fas fa-hashtag"></i> ${tag}</span>`;
        });

        // Textos largos
        document.getElementById('bot-tu-rol').innerHTML = bot.tuRol;
        document.getElementById('bot-historia').innerHTML = bot.historia;

        // Panel de Stats (se genera dinámicamente)
        const statsContainer = document.getElementById('stats-grid-container');
        statsContainer.innerHTML = '';
        for (const [nombre, porcentaje] of Object.entries(bot.stats)) {
            const claseCss = nombre.split(' ')[1].toLowerCase().replace('á','a'); // "🥀 Angst" -> "angst"
            statsContainer.innerHTML += `
                <div class="stat-item">
                    <span>${nombre}</span>
                    <div class="stat-bar"><div class="fill ${claseCss}" data-p="${porcentaje}"></div></div>
                    <span>${porcentaje}%</span>
                </div>`;
        }
        
        // Panel de Links (se genera dinámicamente)
        const linksContainer = document.getElementById('links-grid-container');
        linksContainer.innerHTML = '';
        // Mapeo de claves a clases e iconos para los links
        const linkDetails = {
            janitor: { class: 'link-janitor', icon: 'fa-robot', text: 'Janitor AI' },
            card: { class: 'link-card', icon: 'fa-download', text: 'Descargar Card' },
            haiku: { class: 'link-haiku', icon: 'fa-feather-alt', text: 'Poe Haiku' },
            sonnet: { class: 'link-sonnet', icon: 'fa-moon', text: 'Poe Sonnet' },
            chub: { class: 'link-chub', icon: 'fa-cubes', text: 'Chub' },
            caveduck: { class: 'link-caveduck', icon: 'fa-dungeon', text: 'Caveduck' }
        };
        for (const [key, url] of Object.entries(bot.links)) {
            if (linkDetails[key]) {
                const details = linkDetails[key];
                let linkTag = `<a href="${url}" class="${details.class}"`;
                if (key === 'card') {
                    linkTag += ` download="${bot.nombre}.png"`; // Añade el atributo download para la card
                }
                linkTag += `><i class="fas ${details.icon}"></i> ${details.text}</a>`;
                linksContainer.innerHTML += linkTag;
            }
        }

        // Una vez que todo el HTML está en su sitio, iniciamos los efectos
        iniciarEfectosEInteractividad();
    }

    // --- 3. TU CÓDIGO ORIGINAL, AHORA DENTRO DE UNA FUNCIÓN ---
    function iniciarEfectosEInteractividad() {
        const audio = document.getElementById('song');
        function unlockAudio() { if (audio.paused) { audio.play().catch(()=>{}); audio.pause(); } document.body.removeEventListener('click', unlockAudio); document.body.removeEventListener('touchstart', unlockAudio); }
        document.body.addEventListener('click', unlockAudio); document.body.addEventListener('touchstart', unlockAudio);

        const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
        const swooshSound = new Audio('https://www.fesliyanstudios.com/play-mp3/570');
        document.querySelectorAll('.tab-button, .close-btn, .play-button, .links-grid a').forEach(el => { el.addEventListener('click', () => { el.matches('.links-grid a') ? swooshSound.play() : clickSound.play(); }); });

        document.querySelectorAll('.typewriter').forEach((element, index) => { const text = element.innerHTML; element.innerHTML = ''; element.style.opacity = 1; let i = 0; setTimeout(() => { const typing = setInterval(() => { if (i < text.length) { element.innerHTML += text.charAt(i); i++; } else { clearInterval(typing); } }, 25); }, 500 + index * 100); });
        
        document.addEventListener('mousemove', e => { const { clientX, clientY } = e; const { innerWidth, innerHeight } = window; const x = (clientX / innerWidth - .5) * -2; const y = (clientY / innerHeight - .5) * -2; if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) { document.body.style.backgroundPosition = `calc(50% + ${x}%) calc(50% + ${y}%)`; } });

        const tabButtons = document.querySelectorAll('.tab-button'); const closeButtons = document.querySelectorAll('.close-btn');
        tabButtons.forEach(b => b.addEventListener('click', () => { const id = b.dataset.tab; document.getElementById(id).classList.add('active'); if (id === 'stats-tab') { animateStats(); } }));
        closeButtons.forEach(b => b.addEventListener('click', () => b.closest('.overlay-pane').classList.remove('active')));
        function animateStats() { document.querySelectorAll('.overlay-pane.active .fill').forEach(bar => { bar.style.width = '0%'; const p = bar.dataset.p; setTimeout(() => { bar.style.width = p + '%' }, 100) }); }

        const playPauseBtn = document.getElementById('play-pause-btn'); const spotifyIcon = document.querySelector('.spotify-icon');
        playPauseBtn.addEventListener('click', () => { if (audio.paused) { audio.play(); playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; spotifyIcon.classList.add('is-spinning'); } else { audio.pause(); playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; spotifyIcon.classList.remove('is-spinning'); } });
        audio.addEventListener('ended', () => { playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; spotifyIcon.classList.remove('is-spinning'); });

        const fnafSticker = document.getElementById('fnaf-sticker'); const honkSound = new Audio('https://www.myinstants.com/media/sounds/fnaf-nose-honk.mp3'); fnafSticker.addEventListener('click', () => { honkSound.currentTime = 0; honkSound.play(); });
        const copyBtn = document.getElementById('copy-link-btn'); const originalBtnText = copyBtn.innerHTML;
        copyBtn.addEventListener('click', e => { e.preventDefault(); navigator.clipboard.writeText(window.location.href).then(() => { copyBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!'; copyBtn.classList.add('copied'); swooshSound.play(); setTimeout(() => { copyBtn.innerHTML = originalBtnText; copyBtn.classList.remove('copied'); }, 2000); }); });
    }

    // --- El PRE-LOADER se queda fuera para que se ejecute inmediatamente ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('loaded');
    });
});
