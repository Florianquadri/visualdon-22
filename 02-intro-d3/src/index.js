import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!
let bodyFichier = d3.select('body')


//fonctionne que si on met selectAll
let dataaa = [1,2,3,4,5];
bodyFichier.selectAll()
.data(dataaa)
    .enter().append('p')
    .text("1 paragraphe par data")

// exo manière non-automatisée

//1e methode : faire 3 cercles séparément --> comment les faire dans le même espace ?
/* let nombre = 0;
let cxC1 = 50;
let cxC2 = 150;
let cercle1 = d3.select('div#ex1')
    .append("svg")
    .attr("width", 400)
    .attr("height", 400)
    .append("circle")
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 40)
    .attr("id", definirClasseCercle())

let cercle2 = d3.select('div#ex1')
    .append("svg")
    .attr("width", 400)
    .attr("height", 400)
    .append("circle")
    .attr("cx", 150)
    .attr("cy", 150)
    .attr("r", 40)
    .attr("id", definirClasseCercle())

let cercle3 = d3.select('div#ex1')
    .append("svg")
    .attr("width", 400)
    .attr("height", 400)
    .append("circle")
    .attr("cx", 250)
    .attr("cy", 250)
    .attr("r", 40)
    .attr("id", definirClasseCercle())

    function definirClasseCercle() {
    nombre++;
    let nomClasse1 = "cercle"
    let nomClasseFinal = nomClasse1.concat(nombre);
    return (nomClasseFinal);
}

let cercle1 = d3.select("#cercle1");
cercle1.attr("cx", function (d, i) {
    cxC1 += 50;
    return cxC1;
})

cercle1.on("click", () => {
    cxC1 += 50;
    cercle1.attr("cx", cxC1)
})

 */
//2e méthode : créer les 3 cercles automatiquement avec enter en fonction de d (datas) --> mieux

let data = [
    { cx: 50, cy: 50, r: 40 },
    { cx: 150, cy: 150, r: 40 },
    { cx: 250, cy: 250, r: 40 }
];

let monSvg = bodyFichier.select('div#ex1bisTest')
    .append('svg')
    .attr("width", 400)
    .attr("height", 400)

let monGroupe = monSvg.selectAll('circle')
    .data(data)
    .enter().append('g')

monGroupe.append("circle")
    .attr("cx", function (d) { return d.cx })
    .attr("cy", function (d) { return d.cy })
    .attr("r", function (d) { return d.r })
    .attr("id", function (d, i) {
        let chaine1 = "monCercle";
        let nomId = chaine1.concat(i);
        console.log(nomId)
        return nomId;
    })
    .attr("class", "cercles")

monGroupe.append('p')
    .text("hello")


// exo_part 2 avec 2è essai des cercles automatisés --> besoin de les avoir créer avec data --> bcp plus simple !
let monCercle1 = d3.select('#monCercle0');
monCercle1.attr("cx", function (d, i) {
    console.log(d.cx)
    d.cx = d.cx + 50;
    return d.cx;
})

let monCercle2 = d3.select("#monCercle1");

monCercle2.attr("fill", function () {
    return "hsl(" + Math.random() * 360 + ",1100%,50%";
})

monCercle2.attr("cx", function (d, i) {
    console.log(d.cx)
    d.cx = d.cx + 50;
    return d.cx;
})


//exo append

d3.selectAll('circle')
    .append('p')
    .text('hello').attr('font-size', '30px')

//let groupe1 = monSvg.append('g');


// événements --> les aligne à cx= 50 chacun mais pas dans la même div... comment les mettre dans la même div ?
let monCercle3 = bodyFichier.select('#monCercle2');
monCercle3.on('click', function () {
    d3.selectAll('.cercles')
        .attr("cx", function (d, i) {
            console.log(d.cx)
            d.cx = 50;
            return d.cx;
        })
    console.log("click")

})

//données

const dataExo = [{ h: 20, w: 20 }, { h: 5, w: 20 }, { h: 25, w: 20 }, { h: 8, w: 20 }, { h: 15, w: 20 }];


// nouvelle sestion rectangle

let sectionRectange = d3.select("#exRect");
let svgRect = sectionRectange.append('svg')
    .attr("width", 400)
    .attr("height", 100)
    .attr("id", "svgRect")

svgRect.selectAll('rect')
    .data(dataExo)
    .enter().append('rect')
    .attr("width", "20px")
    .attr("height", function (d) { return d.h })
    .attr("fill", function () {
        return "hsl(" + Math.random() * 360 + ",1100%,50%";
    })
    .attr("x", function (d, i) {
        console.log(d, i)
        return d.w * i
    })
    .attr("y", function (d, i) {
        let hauteurSVG = svgRect.attr("height");
        return (hauteurSVG-d.h);
    })

// questions : comment mettre svg dans body / comment mettre les 3 svg dans la même div (dans le body) / comment récupérer cx avec méthode 1 / pq besoin mettre 4 datas pour avoir 3 cercle ?

