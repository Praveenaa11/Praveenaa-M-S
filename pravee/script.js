const API = "https://src.drmcet.ac.in/api/"
const btn = document.querySelector('.input-btn')
const input = document.querySelector('.input')
const cardwrap = document.querySelector('.card-wrap')


btn.addEventListener('click', ()=>{
    if (input.value === '') return null
    else
    {
        cardwrap.innerHTML = ''
        const response = fetch(API, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({value: input.value})
        })

        response.then((e)=>{
            e.json().then((f)=>{
                console.log(f)
                f.suggestions.forEach(element => {
                    CreateCard(element[0],element[1], element[2], element[3], element[4])
                });
            })
        })
    }
})


function CreateCard(title, author, category, price, links)
{
    card = document.createElement('div')
    card.className = 'card'

    p1 = document.createElement('p')
    p1.className = 'title'
    p1.textContent = title

    p2 = document.createElement('p')
    p2.className = 'author'
    p2.textContent = author

    p3 = document.createElement('p')
    p3.className = 'category'
    p3.textContent = category

    p4 = document.createElement('p')
    p4.className = 'price'
    p4.textContent = price

    p5 = document.createElement('p')
    p5.className = 'links'
    p5.textContent = links

    card.appendChild(p1)
    card.appendChild(p2)
    card.appendChild(p3)
    card.appendChild(p4)
    card.appendChild(p5)

    cardwrap.appendChild(card)
}
