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