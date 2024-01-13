
const data = fetch("https://restcountries.com/v3.1/all").then(res => res.json())

var map = document.querySelector('svg');
var title = document.getElementById('title');
var tooltip = document.getElementById('tooltip');

map.addEventListener('mousemove', mouseEntered);
map.addEventListener('mouseout', mouseLeft);


async function find_country(name){
  let tmp
  let response = await data.then((res)=> {return res} )
  response.map((country)=>{
    if (country.name.common === name) {
      tmp = country
    }
  })
  return tmp
}

async function mouseEntered(e){
    var target = e.target;
    var details = target.attributes
    if (target.nodeName == "path") {
      target.style.fill = "#3468C0"
      target.style.opacity = 0.6;
      tooltip.style.transform = `translate(${e.offsetX + 200}px, ${e.offsetY - 30}px)`;
      tooltip.style.display="block"
      let country = await find_country(details.title.value)
      console.log(country)
      tooltip.innerHTML = `
        <p>official name: ${country.name.official}</p>
        <p>common name: ${country.name.common}</p>
        <p>capital: ${country.capital}</p>
        <p>region (subregion): ${country.region} (${country.subregion})</p>
        `;
  
    }
}
function mouseLeft(e){
    var target = e.target;
    if (target.nodeName == "path") {
      target.style.opacity = 1;
      tooltip.style.display="none"
      tooltip.innerHTML=""
      target.style.fill ="black"
    }
}
