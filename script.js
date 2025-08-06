// Snack 1

// Ottieni il titolo di un post con una Promise.

// Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
// 🎯 Bonus: Ottieni l'intero post con l'autore
// Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.


function getPostTitle(id){
    const promessa = new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
        .then(resp => resp.json())
        .then(obj => resolve(obj))
        .catch(reject)
    })

    return promessa
}

function getPost(id) {

    const promessa = new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
        .then(resp => resp.json())
        .then(post => {
            return fetch(`https://dummyjson.com/users/${post.userId}`)
            .then(res => res.json())
            .then(user => {
                post.user = user
                resolve(post)
            })
            .catch(reject)
        })
        .catch(reject)
    })

    return promessa
}

getPostTitle(1)
.then(obj => console.log(obj))
.catch(error => console.error(error))

getPost(1)
.then(post => console.log(post))
.catch(error => console.error(error))


// Snack 2

// Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
// 🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
// Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".

function creaLanciaDado() {
    let ultimoLancio = null

    return function() {
        return new Promise((resolve, reject) => {
        console.log('sto lanciando il dado')
        setTimeout(() => {
            let probabilitàPerdita = Math.random()
            if (probabilitàPerdita < 0.2) {
                ultimoLancio = null
                reject('Ops! Il dado si è incastrato! Ritenta.')
            }

            let num = Math.floor(Math.random() * 6) + 1
            console.log(num)

            if (num === ultimoLancio) {
                resolve(`Di nuovo ${num}! Che lancio incredibile!`)
            }
            
            ultimoLancio = num
            resolve(num)
        }, 3000)

    })
        
    } 
}


const lancio = creaLanciaDado()

lancio()
.then(result => {
    console.log('Il risultato è:', result)
    lancio()
    .then(result => console.log('Il risultato è:', result))
    .catch(error => console.error(error))
})
.catch(error => console.error(error))

