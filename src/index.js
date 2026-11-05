const { ipcRenderer, webUtils } = require('electron');
const url = require('url');

//ensure html is ready
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    //the buttonzone:
    document.getElementById('close-button').addEventListener('click', () => {
        ipcRenderer.send('close-window');
    });
    document.getElementById('min-button').addEventListener('click', () => {
        ipcRenderer.send('min-window');
    });
    document.getElementById('max-button').addEventListener('click', () => {
        ipcRenderer.send('max-window');
    });
    document.getElementById('pin-button').addEventListener('click', () => {
        ipcRenderer.send('pin-window');
        document.getElementById('pin-button').classList.toggle('active');
    });
    document.getElementById('dev-button').addEventListener('click', () => {
        //window.electronAPI.toggleDevTools();
        ipcRenderer.send('dev-clicked');
    });

    // drag in images:
    window.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    //adds image on image drop in
    window.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!canvas) return;
    
    //for positioning
    const rect = canvas.getBoundingClientRect();
    const dropX = e.clientX - rect.left;
    const dropY = e.clientY - rect.top;

    //local files dragged from disk:
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
        for (const file of files) {
            console.log("Disk file path:", webUtils.getPathForFile(file));

            const ext = webUtils.getPathForFile(file).split('.').pop().toLowerCase();
            const validImageType = ['png', 'jpg', 'jpeg', 'webm', 'gif'];

            if (validImageType.includes(ext)) {
                const mockUrl = url.pathToFileURL(webUtils.getPathForFile(file)).href;
                console.log("Generated URL:", mockUrl);
                createReferenceImage(mockUrl, dropX, dropY);
            } else {
                console.log("Invalid image extension:", ext);
            }
        }
    }

    //files dragged from browser:
    const webUrl = e.dataTransfer.getData('URL') || e.dataTransfer.getData('text/uri-list');
    if (webUrl) {
        createReferenceImage(webUrl, dropX, dropY);
    }
    });
});

function createReferenceImage(src, x, y) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('reference-image');
    
    //revisit positioning later
    img.style.left = `${x - 100}px`;
    img.style.top = `${y - 100}px`;

    canvas.appendChild(img);
}






