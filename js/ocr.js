let selectedFile;

// Handle file input
document.getElementById('fileInput').addEventListener('change', function(e) {
    selectedFile = e.target.files[0];
    showPreview(selectedFile);
});

// Drag & drop
const dropArea = document.getElementById('dropArea');
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.background = 'rgba(255,255,255,0.1)';
});
dropArea.addEventListener('dragleave', () => {
    dropArea.style.background = 'transparent';
});
dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    selectedFile = e.dataTransfer.files[0];
    showPreview(selectedFile);
});

// Preview image
function showPreview(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}

function startOCR() {
    if (!selectedFile) {
        alert("Please upload a file first!");
        return;
    }
    document.getElementById('loader').style.display = 'block';
    document.getElementById('ocrResult').value = "";
    
    Tesseract.recognize(
        selectedFile,
        'eng',
        { logger: info => console.log(info) }
    ).then(({ data: { text } }) => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('ocrResult').value = text;
    });
}