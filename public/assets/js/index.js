let model;
const webcam = new Webcam(document.getElementById('wc'));
let isPredicting= false;

async function loadModel() {
    const model = await tf.loadLayersModel('/assets/model/rps/model.json');
    return model;
}

async function predict() {
    while (isPredicting) {
        const predictedClass = tf.tidy(() => {
            const img = webcam.capture();
            const predictions = model.predict(img);
            return predictions.as1D().argMax();
        })
    
        const classId = (await predictedClass.data())[0];
        console.log(classId);
        const viewPred = document.getElementById('view-predict');
        viewPred.innerText = `Prediksi : ${classId}`;
        predictedClass.dispose();
        await tf.nextFrame();
    }
}

function startPredicting() {
    isPredicting = true;
    predict();
}

function stopPredicting() {
    isPredicting = false;
    predict();
}

async function init() {
    await webcam.setup();
    model = await loadModel();
}

// EKSPERIMENTAL USE ML API
const video = document.getElementById('wc');
const canvas = document.getElementById('view-image');
const captureButton = document.getElementById('startPredicting');

async function setupWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
}

async function sendImageToApi(base64Image) {
    const apiUrl = 'https://kakanwar.pythonanywhere.com/rps';
    const formData = new FormData();
    formData.append('gambar', base64Image);

    try {
        document.getElementById('loading').classList.remove("hidden");
        document.getElementById('loading').classList.add("flex");
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });
        
        const data = await response.json();
        document.getElementById('loading').classList.remove("flex");
        document.getElementById('loading').classList.add("hidden");
        document.getElementById("hasil-pred").innerHTML = data['label'];
        console.log(data['label']);
    } catch (error) {
        console.error('Error sending image to API:', error);
    }
}


captureButton.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        const img_b64 = canvas.toDataURL('image/jpeg');
        const image_data = img_b64.split(',')[1];

        sendImageToApi(image_data);
    };
});

function cobaApi() {
    const Http = new XMLHttpRequest();
    let data = new FormData();
    const url='https://kakanwar.pythonanywhere.com/kampus';
    // const url='http://localhost:5000/kampus';
    Http.open("POST", url);
    data.append('alamat', 'tegal');
    Http.send(data);

    Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
    }
}


setupWebcam();