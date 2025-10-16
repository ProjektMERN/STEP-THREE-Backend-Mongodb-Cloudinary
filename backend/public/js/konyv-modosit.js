async function modosit(event, id) {
    event.preventDefault();
    const cim = document.querySelector('#cim').value;
    const szerzok = document.querySelector('#szerzok').value;
    const zsaner = document.querySelector('#zsaner').value;
    const oldalszam = document.querySelector('#oldalszam').value;
    const tartalom = document.querySelector('#tartalom').value;
    const ar = document.querySelector('#ar').value;
    const peldanySzam = document.querySelector('#peldanySzam').value;
    const kedvezmeny = document.querySelector('#kedvezmeny').value;
    const kep = document.querySelector('#kep').value;

    const response = await fetch(`/api/books-backend/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cim,
            szerzok,
            zsaner,
            oldalszam,
            tartalom,
            ar,
            peldanySzam,
            kedvezmeny,
            kep,
        }),
    });

    if (response.ok) {
        const resp = await response.json();
        window.alert(resp.msg);
        window.location.href = '/api/books-backend';
    }
}
