let pokemon1 = []

let pokemon2 = []


document.getElementById("battle1").addEventListener('click', function () {

function getPokemon(url) {
    return new Promise((resolve, reject) => {
         fetch(url)
            .then(res => {
                if (!res.ok) {
                    if (res.status == 404) {
                        alert("pokemon not in pokedex - try again")
                    }
                }
                return res.json()
            })
            .then(json => {
                resolve(json)
            })
            .catch(err => {
                reject(err)
            })
    })
}

    getPokemon('https://pokeapi.co/api/v2/pokemon')
        .then(pokemon => {
            let pokeurl1 = findPokemon(pokemon.count)
            getPokemon(pokeurl1)
                .then(pokemon => {
                    pokemon1 = pokemon;
                    content('poke-1', pokemon1)
                })
        })
        .catch(err => {
            console.log(err)
        })
})

document.getElementById("battle2").addEventListener('click', function () {
    function getPokemon(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        console.log(res.status)
                        if (res.status == 404) {
                            alert("pokemon not in pokedex - try again")
                        }
                    }
                    return res.json()
                })
                .then(json => {
                    resolve(json)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    getPokemon('https://pokeapi.co/api/v2/pokemon')
        .then(pokemon => {

            let pokeurl2 = findPokemon(pokemon.count)

            getPokemon(pokeurl2)
                .then(pokemon => {
                    pokemon2 = pokemon;
                    content('poke-2', pokemon2)
                })
        })
        .catch(err => {
            console.log(err)
        })

})

document.getElementById("attack-1").addEventListener('click', function () {
    var container = document.getElementById('poke-2')
    var health = container.querySelector('.health span')
    health.textContent -= Math.round(pokemon1.base_experience / 3)

    let max = Math.floor(pokemon1.moves.length);
    let num = Math.floor(Math.random() * max);

    alert(pokemon1.name + ' has used ' + pokemon1.moves[num].move.name)

    if (health.textContent <= 0) {
        health.textContent = 0
        alert(pokemon2.name + ' has fainted! Choose a new pokemon!')

    }

})

document.getElementById("attack-2").addEventListener('click', function () {
    var container = document.getElementById('poke-1')
    var health = container.querySelector('.health span')
    health.textContent -= Math.round(pokemon2.base_experience / 3)
    let max = Math.floor(pokemon1.moves.length);
    let num = Math.floor(Math.random() * max);

    alert(pokemon2.name + ' has used ' + pokemon2.moves[num].move.name)
    if (health.textContent <= 0) {
        health.textContent = 0
        alert(pokemon1.name + ' has fainted! Choose a new pokemon!')
    }
})






function findPokemon(max) {
    min = Math.ceil(0);
    max = Math.floor(max);
    num = Math.floor(Math.random() * max);
    return 'https://pokeapi.co/api/v2/pokemon/' + num.toString()
}

function content(user, data) {
    var container = document.getElementById(user)
    var snapshot = container.querySelector('.snapshot')
    var name = container.querySelector('.name span')
    var type = container.querySelector('.type span')
    var health = container.querySelector('.health span')
    var attack = container.querySelector('.attack span')



    snapshot.src = data.sprites.front_default
    name.textContent = data.name
    type.textContent = data.types[0].type.name
    health.textContent = data.base_experience
    attack.textContent = Math.round(data.base_experience / 3)


}
