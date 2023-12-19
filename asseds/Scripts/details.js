let id= new URLSearchParams (window.location.search).get("id");
let link = 'http://localhost:3000/card/';

let atak = document.querySelector(".card");


async function getid(id){
    let res= await axios.get(link + id)
    let data= await res.data 
    atak.innerHTML  +=`
    <div>
    <a href="#">${data.bas}</a>
    <img src="${data.image}" alt="">
    <p>${data.text}</p>
</div>
    `
};
getid(id);