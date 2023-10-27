import * as THREE from 'three';

const loadingScreen = document.getElementById('loading-screen');
const loadingMessage = document.getElementById('loading-message');
const progressBar = document.getElementById('loading-bar');

THREE.DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};
THREE.DefaultLoadingManager.onLoad = function () {
    console.log('Loading Complete!');
    loadingScreen.remove();
};
THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    loadingMessage.innerHTML = 'Loaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'
    const progress = itemsLoaded / itemsTotal;
    progressBar.style.width = `${progress * 100}%`;
    // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};
THREE.DefaultLoadingManager.onError = function (url) {
    // console.log('There was an error loading ' + url);
    loadingMessage.innerHTML = 'There was an error loading ' + url;
};
