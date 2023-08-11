// KODE JS UNTUK TOMBOL DARK MODE
const checkbox = document.querySelector('#toggle');
const tooltip = document.querySelector('#tooltip-left');
const html = document.querySelector('html');
const ikon = document.querySelector('#ikon');

checkbox.addEventListener('change', function(event) {
    // Mendapatkan status checked checkbox
    var isChecked = event.target.checked;

    // Melakukan sesuatu ketika status checked berubah
    if (isChecked) {
        console.log('Checkbox dicentang');
        sessionStorage.setItem('darkMode', 'true');
        console.log(sessionStorage.getItem('darkMode'));
        // Lakukan tindakan yang diinginkan ketika checkbox dicentang
    } else {
        console.log('Checkbox tidak dicentang');
        sessionStorage.removeItem('darkMode');
        sessionStorage.setItem('darkMode', 'false');
        console.log(sessionStorage.getItem('darkMode'));
        // Lakukan tindakan yang diinginkan ketika checkbox tidak dicentang
    }

    if (sessionStorage.getItem('darkMode') === 'true') {
        // Terapkan gaya dark mode
        html.classList.add('dark');
        tooltip.innerHTML = 'light';
        ikon.classList.replace('fa-moon', 'fa-lightbulb');
    } else {
        // Terapkan gaya light mode
        ikon.classList.replace('fa-lightbulb', 'fa-moon');
        tooltip.innerHTML = 'dark';
        html.classList.remove('dark');
    }
});