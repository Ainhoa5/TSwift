class CustomPlayer {
    constructor() {
        this.playlist = [];
        this.currentMediaIndex = -1;
    }

    // devuelve la variable playlist
    getPlayList() {
        return this.playlist;
    }

    // Añade medio a la playlist de la clase
    addToPlaylist(mediaItem) {
        this.playlist.push(mediaItem);
        this.updatePlaylistSelector();
    }

    // Selecciona y reproduce un medio de la lista de reproducción por índice
    selectMedia(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentMediaIndex = index;
            const mediaItem = this.playlist[index];
            this.setMedia(mediaItem);
        }
    }

    // Actualiza el medio actual basado en el objeto mediaItem
    setMedia(mediaItem) {
        // Asegúrate de limpiar cualquier listener anterior para evitar duplicados
        if (this.currentMedia) {
            this.currentMedia.removeEventListener('timeupdate', this.updateProgress);
        }

        const mediaContainer = document.getElementById('mediaContainer');
        mediaContainer.innerHTML = ''; // Limpia el contenedor actual

        // Asume que mediaItem tiene un método createMediaElement
        this.currentMedia = mediaItem.createMediaElement();
        mediaContainer.appendChild(this.currentMedia);

        // Configura el indicador de progreso
        this.setupProgressIndicator();

    }

    // Crea la barra de indicacion de progreso
    setupProgressIndicator() {
        const progressBar = document.getElementById('progressBar');
        this.currentMedia.addEventListener('timeupdate', () => {
            const value = (this.currentMedia.currentTime / this.currentMedia.duration) * 100;
            progressBar.value = value;
        });

        // Opcional: Permitir buscar en el medio al mover el indicador de progreso
        progressBar.addEventListener('input', () => {
            const time = (progressBar.value / 100) * this.currentMedia.duration;
            this.currentMedia.currentTime = time;
        });
    }

    // añade todos los objetos al select#playlistSelector de la vista
    updatePlaylistSelector() {
        const selector = document.getElementById('playlistSelector');
        selector.innerHTML = ''; // Limpia el selector

        this.playlist.forEach((item, index) => {
            const option = document.createElement('option');
            option.text = item.title; // Asume que cada item de la playlist tiene una propiedad 'title'
            option.value = index;
            selector.appendChild(option);
        });

        // Añade un manejador de eventos para seleccionar medios desde el selector
        selector.onchange = (e) => this.selectMedia(e.target.value);
    }

    /* ACTIONS */
    play() {
        if (this.currentMedia) this.currentMedia.play();
    }

    pause() {
        if (this.currentMedia) this.currentMedia.pause();
    }

    stop() {
        if (this.currentMedia) {
            this.currentMedia.pause();
            this.currentMedia.currentTime = 0;
        }
    }
    end() {
        if (this.currentMedia) {
            this.currentMedia.currentTime = this.currentMedia.duration - 0.1;
        }
    }

    rewind(seconds = 10) {
        if (this.currentMedia) this.currentMedia.currentTime -= seconds;
    }

    fastForward(seconds = 10) {
        if (this.currentMedia) this.currentMedia.currentTime += seconds;
    }
    setVolume(volumeLevel) {
        if (this.currentMedia) {
            this.currentMedia.volume = volumeLevel;
        }
    }
    toggleFullscreen() {
        if (this.currentMedia) {
            if (this.currentMedia.requestFullscreen) {
                this.currentMedia.requestFullscreen();
            } else if (this.currentMedia.webkitRequestFullscreen) { // Safari
                this.currentMedia.webkitRequestFullscreen();
            } else if (this.currentMedia.mozRequestFullScreen) { // Firefox
                this.currentMedia.mozRequestFullScreen();
            } else if (this.currentMedia.msRequestFullscreen) { // IE11
                this.currentMedia.msRequestFullscreen();
            }
        }
    }
}
