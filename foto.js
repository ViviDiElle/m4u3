const apiUrl1 =`https://api.pexels.com/v1/search?query=people`
const apiUrl2 =`https://api.pexels.com/v1/search?query=animal`
const  keyCitta = "city"    
const apiUrl3 = `https://api.pexels.com/v1/search?query=${keyCitta}`
const apiUrl4 = `https://api.pexels.com/v1/search?query=mountain`
const apiKey = 'E6WNtgMRgdr3RWVfDLhKzhnQzatmz5atrm6Gc1V3PUiRxbz89YOC95lh';


let risultato = null

function fetchData(apiUrl) {
    fetch(apiUrl, {
        headers: {
            Authorization: apiKey
        }
    }
        )
        .then(response => response.json())
        .then(data => {
            risultato = data
            console.log("funziona : ", risultato);
            // sostituzioni IMG
            changeImg()
            // inserimento di immagini nel html
            newImg()
        }) 
        
        .catch((error) => {
            erroreUrl(error)
            // console.error("abbiamo trovato un errore ", error)
        } )
}
function peolpe() {
fetchData(apiUrl1)
    
}
function animal() {
    fetchData(apiUrl2)
        
    }
// ALERT
function erroreUrl(x) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const alert = (message) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

        alertPlaceholder.append(wrapper)
    }

    const alertTrigger = document.querySelectorAll('.liveAlertBtn')
    for (let i = 0; i < alertTrigger.length; i++) {
        if (alertTrigger) {
            alertTrigger[i].addEventListener('click', () => {
                alert('ERRORE, Url non trovato!')
            })
            }
    }
    }


// function fetchData2() {
//     fetch(apiUrl2, {
//         headers: {
//             Authorization: apiKey
//         }
//     }
//         )
//         .then(response => response.json())
//         .then(data => {
//             risultato = data
//             console.log("funziona : ", risultato);
//             // sostituzioni IMG
//             changeImg()
//             // inserimento di immagini nel html
//             newImg()
//         })
// }

function changeImg() {
        // sostituzioni IMG
        const main = document.querySelector('main')
        const svgs = main.querySelectorAll('svg')
        svgs.forEach(svg => {
            let img = document.createElement('img')
            svg.parentNode.replaceChild(img, svg) 
        });
}

function newImg() {
            // inserimento di immagini nel html
            let imgs = document.querySelectorAll('.card img')
            imgs.forEach((img, i) => {
                img.setAttribute('src', risultato.photos[i].src.portrait)
            })

            let smalls = document.querySelectorAll('small')
            smalls.forEach((small, i)=> {
                small.innerHTML = risultato.photos[i].id
            })
}

// fetchData 2
let risultato2 = null
function fetchData2() {
    fetch(apiUrl4, {
        headers: {
            Authorization: apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        risultato2 = data
        changeImg2()
        imgMontagna()
    })
}


function imgMontagna() {
    let img = document.querySelectorAll('#carousel img')
    img.forEach((elem, i )=> {
        elem.setAttribute('src', risultato2.photos[i].src.landscape)
    })
}
function changeImg2() {
    // sostituzioni IMG
    const main = document.querySelector('main')
    const svgs = main.querySelectorAll('#carousel svg')
    svgs.forEach(svg => {
        let img = document.createElement('img')
        svg.parentNode.replaceChild(img, svg) 
    });
}



function cambioEdit() {
    // sostituzioni edit in nascondi
    const editButton = document.querySelectorAll('.btn-outline-secondary:nth-of-type(2)');
    for (let i = 0; i < editButton.length; i++) {
        editButton[i].innerHTML = "Nascondi"
    }
}

function clickNascondi() {
    let bottoneNascondi = document.querySelectorAll('.btn-group button:last-child');
    // console.log("bottone selezionato ",bottoneNascondi);
    for (let i = 0; i < bottoneNascondi.length; i++) {
        // console.log("vedi dettaglio bottoni ",bottoneNascondi[i]);
        bottoneNascondi[i].addEventListener('click', function(event) {
        // console.log("vedi dettaglio bottoni ",bottoneNascondi[i]);
            let card =  event.target.parentNode.parentNode.parentNode.parentNode;
            card.remove()
        })
    }
}

function newButton() {
    let bottoneTre = document.createElement('button');
        bottoneTre.classList = `liveAlertBtn btn btn btn-secondary my-2>`
        bottoneTre.innerText = "Città"
        bottoneTre.value = "apiUrl3"
        bottoneTre.addEventListener("click", function(){
            fetchData(apiUrl3)
        })
        let aggiungiBottone = document.getElementById('jumbo');
        aggiungiBottone.appendChild(bottoneTre)
    }


window.onload = function() {
    cambioEdit()
    newButton()
    clickNascondi()
    fetchData2()
}
