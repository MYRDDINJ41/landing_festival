function crearGaleria() {
    
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const img = document.createElement('picture');

        img.innerHTML = `
            <source srcset = "build/img/thumb/${i}.avif" type="image/avif">
            <source srcset = "build/img/thumb/${i}.webp" type="image/webp">
            <img loading = "lazy" height="300" width="200" src="build/img/thumb/${i}.jpg" alt"Imagen galería">
        `;

        img.onclick = function () {
            mostrarImg(i);
        }
        galeria.appendChild(img)
    }

    return

}

function mostrarImg(id) {
    
    const img = document.createElement('picture');

    img.innerHTML = `
        <source srcset = "build/img/grande/${id}.avif" type="image/avif">
        <source srcset = "build/img/grande/${id}.webp" type="image/webp">
        <img loading = "lazy" height="300" width="200" src="build/img/grande/${id}.jpg" alt"Imagen galería">
    `


    //Creaa el overlay con la imagen
    const  overlay = document.createElement('DIV');
    overlay.appendChild(img);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    }

    // Boton para centrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);


    // Añadiendo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')
    

}


crearGaleria();