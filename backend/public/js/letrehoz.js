async function letrehoz(event) {
    event.preventDefault();
    const cim = document.querySelector('#cim').value;
    const szerzok = document.querySelector('#szerzok').value;
    const oldalszam = document.querySelector('#oldalszam').value;
    const tartalom = document.querySelector('#tartalom').value;
    const ar = document.querySelector('#ar').value;
    const kep = document.querySelector('#kep').value;

    const response = await fetch('/api/new-book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cim, szerzok, oldalszam, tartalom, ar, kep }),
    });

    console.log(response);

    if (response.ok) {
        const resp = await response.json();
        window.alert(resp.msg);
        window.location.href = '/api/books-backend';
    }
}
