const firstDivNode = document.getElementById('main-content');
const pinkdivNode = document.getElementById('pinkdiv');
const daftPunkDivNode = document.getElementById('daftPunkDiv');
const metallicaDivNode = document.getElementById('metallicaDiv');
const modalBodyNode = document.querySelector('.modal-body');
const btnsongs = document.getElementById('btnsongs');
let songlist;

btnsongs.addEventListener('click', () => {
    songlist.map((d, i) => {
        let h5 = document.createElement('h5');
        h5.innerText = `${i + 1}. ${d.album.title}`;
        h5.className = 'border-bottom';
        modalBodyNode.appendChild(h5);
    })
})
pinkdivNode.addEventListener('click', () => {
    searchAPI('pink floyd');
})
daftPunkDivNode.addEventListener('click', () => {
    searchAPI('daft punk');
})
metallicaDivNode.addEventListener('click', () => {
    searchAPI('metallica');
})
const searchAPI = (name) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7b30b9fc0fmsh3d27e8873d00596p1a601cjsn72842e9b2fab',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${name}`, options)
        .then(response => response.json())
        .then(response => {
            firstDivNode.innerHTML = '';
            const { data } = response;
            songlist = data;
            data.map((obj, i) => {
                return firstDivNode.innerHTML +=
                    `<div class="col-sm-6 col-md-4 col-xl-3 px-1 mb-3 mb-sm-2 mb-md-0 mb-xl-2">
                        <div class="card" style="width: 18rem">
                            <img src=${obj.artist.picture} class="card-img-top" alt="..." />
                            <div class="card-body">
                            <h5 class="card-title">${obj.title_short}</h5>
                            <p class="card-text">${obj.title}</p>
                            <a href="#" class="btn btn-primary">${obj.rank}</a>
                        </div>
                    </div>`
            })
        })
        .catch(error => {
            console.error(error)
            firstDivNode.innerHTML = `<div class="d-flex justify-content-center">
                                        <span class="font-weight-bolder">Data Not Found</span>
                                      </div>`
        });
}
window.onload = () => {
    firstDivNode.innerHTML = `<div class="d-flex justify-content-center align-items-center">
                                <div class="d-flex spinner-border text-success" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                              </div>`
    searchAPI('pink floyd');
}