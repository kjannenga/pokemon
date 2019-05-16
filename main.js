let pokemon1 = []
let pokemon2 = []
document.getElementById("attack-1").style.display = "none"
document.getElementById("attack-2").style.display = "none"




document.getElementById("battle1").addEventListener('click', function () {
function getPokemon(url) {
    document.getElementById("alerts").innerHTML = "";
    return new Promise((resolve, reject) => {
         fetch(url)
            .then(res => {
                if (!res.ok) {
                    if (res.status == 404) {
                        var a = document.getElementById("alerts")
                        var p = document.createElement('p');
                        p.innerHTML = '<b>Pokemon not in pokedex! CHOOSE A NEW POKEMON!</b>';
                        a.append(p);
                        document.getElementById("attack-1").style.display = "none"
                        document.getElementById('img1').src = "http://placehold.it/100x100?text=Poke+1" 
                        var uk = document.querySelectorAll(".uk")
                        uk[0].textContent = "Unkown"
                        uk[1].textContent = "Unkown"
                        uk[2].textContent = "Unkown"
                        uk[3].textContent = "Unkown"
                        throw new Error("poke not found")
                    }
                }
                return res.json()
            })
            .then(json => {
                resolve(json)
            })
            .catch(err => {
                reject(err)
                console.log(err)
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
                    document.getElementById("attack-1").style.display = "inline"   
                })
        })
        .catch(err => {
            console.log(err)
        })
})

document.getElementById("battle2").addEventListener('click', function () {
    document.getElementById("alerts").innerHTML = "";
    function getPokemon(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        console.log(res.status)
                        if (res.status == 404) {
                            var a = document.getElementById("alerts")
                            var p = document.createElement('p');
                            p.innerHTML = '<b>Pokemon not in pokedex! CHOOSE A NEW POKEMON!</b>';
                            a.append(p);
                            document.getElementById("attack-2").style.display = "none"
                            document.getElementById('img2').src =  "http://placehold.it/100x100?text=Poke+2" 
                            var un = document.querySelectorAll(".un")
                            un[0].textContent = "Unkown"
                            un[1].textContent = "Unkown"
                            un[2].textContent = "Unkown"
                            un[3].textContent = "Unkown"
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
                    document.getElementById("attack-2").style.display = "inline"
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
    var a = document.getElementById("alerts")
    var p = document.createElement('p');
    p.innerHTML = `${pokemon1.name}  has used  ${pokemon1.moves[num].move.name}`

    a.prepend(p)

    if (health.textContent <= 0) {
        health.textContent = 0
        p.innerHTML = `<b>${pokemon2.name} has fainted! CHOOSE A NEW POKEMON!</b>`;
        p.className = "text-danger"
        a.prepend(p);
        document.getElementById("attack-2").style.display = "none"
       
    }
})

document.getElementById("attack-2").addEventListener('click', function () {
    var container = document.getElementById('poke-1')
    var health = container.querySelector('.health span')
    health.textContent -= Math.round(pokemon2.base_experience / 3)
    let max = Math.floor(pokemon1.moves.length);
    let num = Math.floor(Math.random() * max);
    var a = document.getElementById("alerts")
    var p = document.createElement('p');

    p.innerHTML = `${pokemon2.name}  has used  ${pokemon2.moves[num].move.name}`

    a.prepend(p)

    if (health.textContent <= 0) {
        health.textContent = 0
        p.className = "text-danger"
        p.innerHTML = `<b>${pokemon1.name} has fainted! CHOOSE A NEW POKEMON!</b>`
        a.prepend(p);
        document.getElementById("attack-1").style.display = "none"
    }
})

function findPokemon(max) {
    min = Math.ceil(0);
    max = Math.floor(max);
    num = Math.floor(Math.random() * max);
    return 'https://pokeapi.co/api/v2/pokemon/' + num.toString()
}

function content(poke, data) {
    var container = document.getElementById(poke)
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
