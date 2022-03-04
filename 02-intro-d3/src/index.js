import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!
d3.select('div#ex1')
    .append('p')
    .text("nouveau paragraphe")

// exo part 1
//1e methode : faire 3 cercles séparément --> comment les faire dans le même espace ?
let nombre = 0;
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


//2e méthode : créer les 3 cercles automatiquement avec enter en fonction de d (datas)
//pq je mets 4 données et ca me sort 3 cercles ? seul moyen trouvé pour faire cette technique // comment mettre dans la div car la ca me le sort du body
let data = [{ cx: 0, cy: 0, r: 40 },
{ cx: 50, cy: 50, r: 40 },
{ cx: 150, cy: 150, r: 40 },
{ cx: 250, cy: 250, r: 40 }];

let body = d3.select('body')
let cercle = body.select('div#ex1bisTest')
    .data(data)
    .enter().append("svg")
    .attr("width", 400)
    .attr("height", 400)
    .append("circle")
    .attr("cx", function (d) { return d.cx })
    .attr("cy", function (d) { return d.cy })
    .attr("r", function (d) { return d.r })
    .attr("id", function (d, i) {
        let chaine1 = "monCercle";
        let nomId = chaine1.concat(i);
        console.log(i)
        return nomId;
    })
    .attr("class", "cercles")

//exo part 2 : les attributs
function definirClasseCercle() {
    nombre++;
    let nomClasse1 = "cercle"
    let nomClasseFinal = nomClasse1.concat(nombre);
    return (nomClasseFinal);
}

cercle2 = d3.select("#cercle2");

cercle2.attr("fill", function () {
    return "hsl(" + Math.random() * 360 + ",1100%,50%";
})

cercle1 = d3.select("#cercle1");
//comment récupérer cx et faire cx+=100 ?
cercle1.attr("cx", function (d, i) {
    cxC1 += 50;
    return cxC1;
})

cercle1.on("click", () => {
    cxC1 += 50;
    cercle1.attr("cx", cxC1)
})

// exo_part 2 avec 2è essai des cercles automatisés --> besoin de les avoir créer avec data --> bcp plus simple !
let monCercle1 = d3.select('#monCercle1');
monCercle1.attr("cx", function (d, i) {
    console.log(d.cx)
    d.cx = d.cx + 50;
    return d.cx;
})

let monCercle2 = d3.select('#monCercle2');
monCercle2.attr("cx", function (d, i) {
    console.log(d.cx)
    d.cx = d.cx + 50;
    return d.cx;
})


//exo append

d3.selectAll('svg')
    .append('p')
    .text('hello').attr('font-size', '30px')

// événements --> les aligne à cx= 50 chacun mais pas dans la même div... comment les mettre dans la même div ?
let monCercle3 = d3.select('#monCercle3');
monCercle3.on('click', function () {
    d3.selectAll('.cercles')
        .attr("cx", "50")
    console.log("click")

})

//données

let dataExo = [20, 5, 25, 8, 15];


// questions : comment mettre svg dans body / comment mettre les 3 svg dans la même div (dans le body) / comment récupérer cx avec méthode 1 / pq besoin mettre 4 datas pour avoir 3 cercle ?

