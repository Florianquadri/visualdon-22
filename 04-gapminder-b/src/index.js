import * as d3 from 'd3'

let div = d3.select("#place");

//d3.json() remplace l'étape du fetch + de parser

//Promise.all permet de charger plusieurs Fetch en même temps, ce qui évite de faire d3.json dans un autre d3.json dans un


let docEsperanceVie = "/life_expectancy_years.csv";
let donneesMonde = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
const files = [docEsperanceVie, donneesMonde];

//placer svg et créer groupe avec marge

let svg = d3.select("#place")
    .append('svg')

const margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "append")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let svgWithMarge = svg.select("#append");
let groupe = svgWithMarge.append("g")

// Map and projection
let projection = d3.geoMercator([0, 20])
    .scale(150)
    .translate([width / 2, height / 2]);
//creer mon path et assigner la projection au path

let path = d3.geoPath()
    .projection(projection)

const data = new Map();
const colorScale = d3.scaleThreshold()
    .domain([0, 20, 40, 60, 70, 80])
    .range(d3.schemeBlues[7]);

//penser à mettre le function(d) dans la parenthèse csv aussi !!
Promise.all([
    d3.json(donneesMonde),
    d3.csv(docEsperanceVie, function (d) {
        data.set(d.country, d.annee2021)
    })
])
    .then(function (loadDatas) {

        let topo = loadDatas[0];
        console.log(topo.features)

        let esperance = loadDatas[1];
        console.log(esperance)
        console.log(data)

        let mouseOver = function (event, d, i) {

            d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", .5)

            d3.select(this)
                .transition()
                .duration(200)
                .style("opacity", 1)
                .style("stroke", "black")

            let divTool = d3.select("." + d.properties.name);
            let esperance = data.get(d.properties.name);
            console.log(esperance)

            divTool
                .style("opacity", 0)
                .style("color", "black")
                .attr("width", "50")
                .attr("height", "30")
            divTool.transition()
                .duration(200)
                .style("opacity", 1);

            divTool.html("Espérance de vie : " + esperance + "<br/>"
                + "Pays : " + d.properties.name)
                .style("left", (event.pageX + 30) + "px")
                .style("top", (event.pageY - 30) + "px")

            console.log("hello")



        }

        let mouseLeave = function (event, d, i) {

            d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", .8)

            d3.select(this)
                .transition()
                .duration(200)
                .style("stroke", "transparent")

                let divTool = d3.select("." + d.properties.name);

                divTool.transition()
                .duration(200)
                .style("opacity", 0);
            divTool.html("")
                .style("left", "-500px")
                .style("top", "-500px");


            console.log("hi")

        }




        groupe.selectAll("path")
            .data(topo.features)
            .join(enter => enter.append("path")
                .attr("d", path)
                //le map lié au csv permet de rechercher grâce à la fonction data, liée à topo features, de chercher dans le map la valeur
                //liée à la clé qu'on cherche. Donc on remplit en fonction du pays. d.properties.name = le nom du pays dans le doc geojson
                //et on utilise le nom pour récupérer la clé dans le map qui est le même pays (et donc la valeur de la clé)
                //la clé du map étant le nom du pays, d.properties.name cherche sa clé (pays) correspondant dans le map lié au doc csv
                //et récupère la valeur de l'espérance de vie liée
                .attr("fill", function (d) {
                    d.total = data.get(d.properties.name) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .style("opacity", .8)
                .attr("class", function (d) { return "Country" })
                .on("mouseover", mouseOver)
                .on("mouseleave", mouseLeave))

        groupe.selectAll("div")
            .data(topo.features)
            .join(enter => enter.append("div")
                .attr("width", 50)
                .attr("height", 30)
                //le map lié au csv permet de rechercher grâce à la fonction data, liée à topo features, de chercher dans le map la valeur
                //liée à la clé qu'on cherche. Donc on remplit en fonction du pays. d.properties.name = le nom du pays dans le doc geojson
                //et on utilise le nom pour récupérer la clé dans le map qui est le même pays (et donc la valeur de la clé)
                //la clé du map étant le nom du pays, d.properties.name cherche sa clé (pays) correspondant dans le map lié au doc csv
                //et récupère la valeur de l'espérance de vie liée
                .attr("fill", "green")
                .style("stroke", "transparent")
                .style("opacity", 0)
                .attr("class", function (d) { return d.properties.name })

                /*                 .on("mousemove", mouseMove) */
            )




    })
    .catch(function (err) {
        console.error("erreur");
    })
