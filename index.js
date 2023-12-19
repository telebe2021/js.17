let link = 'http://localhost:3000/card/';

let atak = document.querySelector(".card");
let searchInp = document.querySelector("#search");
let keshArr = [];
let fillterArr = [];
let maxS = 3;
let qayaBtn = document.querySelector(".load");


async function mars() {
    let res = await axios.get(link);
    let data = await res.data;
    keshArr = data;
    atak.innerHTML = "";
    fillterArr = fillterArr.length || searchInp.value ? fillterArr : data;

fillterArr.slice(0, maxS).forEach( azad => {
    atak.innerHTML +=`
    <div>
     <a href="#">${azad.bas}</a>
     <img src="${azad.image}" alt="">
     <p>${azad.text}</p>
<span>
<button class="delete" onclick = "deletebas(${azad.id})" ><i class="bi bi-trash"></i> Delete </button>
<button class="update"><i class="bi bi-arrow-clockwise"></i> update </button>
<a href="./details.html?id=${azad.id}"><button class="details"><i class="bi bi-info-circle-fill"></i> details </button></a>
</span>

    </div>
    `
    
});

}
mars();

   //-------load more --------//
   qayaBtn.addEventListener("click",()=>{
   maxS +=3;
   mars();
   });


// -------search------- //

searchInp.addEventListener("input", (e)=>{
fillterArr = keshArr;
fillterArr = fillterArr.filter((element) =>{
    return element.bas.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
})
mars();

})

// -------delete-----//

async function deletebas(id) {
let res = await axios.delete(link + id)
window.location.reload()
return res.data;
}
// -----------update---------//

