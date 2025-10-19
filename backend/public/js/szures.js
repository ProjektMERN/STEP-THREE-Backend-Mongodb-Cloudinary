let zsanerek = ['sci-fi', 'fantasy', 'krimi', 'szerelmes', 'történelmi'];
let kedvezmenyek = [0, 10, 20, 30];
let belsoZsanerek = document.querySelector('#belso-zsanerek');
let belsoKedvezmenyek = document.querySelector('#belso-kedvezmenyek');
let zsanerMind = document.querySelector('#zsaner-mind');
let kedvezmenyMind = document.querySelector('#kedvezmeny-mind');

zsanerMind.addEventListener('click', () => {
    if (belsoZsanerek.style.display === 'flex')
        belsoZsanerek.style.display = 'none';
    else belsoZsanerek.style.display = 'flex';
});

kedvezmenyMind.addEventListener('click', () => {
    if (belsoKedvezmenyek.style.display === 'flex')
        belsoKedvezmenyek.style.display = 'none';
    else belsoKedvezmenyek.style.display = 'flex';
});

if (!zsanerMind.checked) {
}

function szures() {
    let szuresek = [];
    if (zsanerMind.checked) {
        szuresek.push(zsanerek);
    } else {
        let tomb = [];
        for (let i = 0; i < zsanerek.length; i++) {
            let zsaner = document.querySelector(`#${zsanerek[i]}`);
            if (zsaner.checked) tomb.push(zsanerek[i]);
        }
        szuresek.push(tomb);
    }

    if (kedvezmenyMind.checked) {
        szuresek.push(kedvezmenyek);
    } else {
        let tomb = [];
        for (let i = 0; i < kedvezmenyek.length; i++) {
            let kedvezmeny = document.querySelector(
                `#kedvezmeny${kedvezmenyek[i]}`
            );
            if (kedvezmeny.checked) tomb.push(kedvezmenyek[i]);
        }
        szuresek.push(tomb);
    }

    if (zsanerMind.checked && kedvezmenyMind.checked) szuresek = [];

    const kuld = JSON.stringify({ szuresek });

    if (szuresek.length === 0) {
        window.location.href = `/api/books-backend`;
    } else {
        window.location.href = `/api/szures-book/${kuld}`;
    }
}
