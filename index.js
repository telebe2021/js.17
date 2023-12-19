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
<button class="update" onclick="updateatak(${azad.id})"><i class="bi bi-arrow-clockwise"></i> update </button>
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

let form = document.querySelector("form");
let fileInp = document.querySelector("#file");
let imageDiv = document.querySelector("#img2");
let textInp = document.querySelector("#text");
let nameInp = document.querySelector("#name");
let updateDiv = document.querySelector(".updated");
let closeBtn = document.querySelector(".bi-x");

fileInp.addEventListener("change", () => {
    let src = fileInp.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(src);
    reader.onload = function (e) {
        imageDiv.src = e.target.result
    }
})

closeBtn.addEventListener("click", () => {
    updateDiv.style.display = "none";
})

function updateatak(id) {
    updateDiv.style.display = "block"
    axios.get(link + id).then(res => {
        nameInp.value = res.data.bas,
        textInp.value = res.data.text,
        fileInp.value = res.data.image,
        imageDiv.src = res.data.image
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        axios.get(link + id).then(res => {
            nameInp.value = res.data.bas,
            textInp.value = res.data.text,
            imageDiv.src = res.data.image
        });
        let src = fileInp.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            let objetc = {
                bas: nameInp.value,
                image: e.target.result,
                text: textInp.value
            }
            axios.patch(link + id, objetc).then(() => {
                mars();
                updateDiv.style.display = "none"
            })
        }
        reader.readAsDataURL(src)
    })
};