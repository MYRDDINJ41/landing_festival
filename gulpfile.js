const { src , dest , watch, parallel} = require("gulp");

// css
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber')
// inporamos ^ para manejar los archivos
// src identifica un archivo
// dest ayuda a almacenar la información

// Imagenes
const avif = require('gulp-avif')
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
function css(done) {

                // /**/*.scss ayuda a que se escuchan todas los archivos que se encuentran dentro de scss
    src('src/scss/**/*.scss') // Identificar el archivo SASS
        .pipe(plumber())    
        .pipe( sass()) // Compilarlo .pipe()
        .pipe(dest("build/css")); // Almacenarla en el disco duro 

    done(); // Este es un callback que avisa a gulp cuando llegamos al final

}

// Para imagenes 


// para hacer que las imagenes sean mas ligera pasandolo a un formato de webp

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe( cache(imagemin (opciones)) )
    .pipe( dest('build/img'))

    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe( dest('build/img'))

    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe( dest('build/img'))

    done();
}

function js(done){
    src('src/js/**/*.js')
    .pipe(dest('build/js'));
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    done();
}

exports.imagenes = imagenes;
exports.js = js;
exports.css = css;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionAvif, versionWebp, js, dev);