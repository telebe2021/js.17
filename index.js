let link = 'http://localhost:3000/card';

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


// -----------update---------//