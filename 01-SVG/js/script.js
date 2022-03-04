
//changer couleur rectangle en cliquant dessus
let rect = document.querySelector("#rect");
let couleurBase = rect.getAttribute("fill");
console.log(couleurBase);
console.log(rect);
let click = 0;
rect.addEventListener("click", evt => {
    click++;
    /*    let couleur =  evt.target.getAttribute("fill");
        console.log(couleur); */
    if (click % 2 == 0) {
        evt.target.setAttribute("fill", couleurBase);
        console.log(evt.target.getAttribute("fill"));
    } else {
        evt.target.setAttribute("fill", "orange");
        console.log(evt.target.getAttribute("fill"));
    }
})

rect.addEventListener("mouseover", evt => {
    console.log("hello")
})

//pourquoi le hover fonctionne pas et c'est un click qui déclenche ?

//agrandir rayon extérieur donut en hover

//1e version ?
/* let cercleExtDonut = document.querySelector("#cercleExtDonut");
console.log(cercleExtDonut);
let rayonExt = document.querySelector("#cercleExtDonut").getAttribute("r");
console.log(rayonExt);

cercleExtDonut.addEventListener("mouseover", evt => {
    let ancienRayon = evt.target.getAttribute("r");
    let nouveauRayon = ancienRayon + 10;
    console.log("survol");
    evt.target.setAttribute("r", nouveauRayon);
})

cercleExtDonut.addEventListener("mouseout", evt => {
    evt.target.setAttribute("r", rayonExt);
}) */

//2è version

let cercleExtDonut = document.querySelector("#cercleExtDonut");
console.log(cercleExtDonut);
let rayonExt = document.querySelector("#cercleExtDonut").getAttribute("r");
console.log(rayonExt);

let svgDonut = document.getElementById('svgDonut');
console.log(svgDonut)
svgDonut.addEventListener("mouseover", evt => {
    let target = document.querySelector("#cercleExtDonut");
    let ancienRayon = target.getAttribute("r");
    let nouveauRayon = ancienRayon + 10;
    console.log("survol");
    target.setAttribute("r", nouveauRayon);
})

svgDonut.addEventListener("mouseout", evt => {
    let target = document.querySelector("#cercleExtDonut");
    console.log("bye");
    target.setAttribute("r", rayonExt);
})









