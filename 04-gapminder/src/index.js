import * as d3 from 'd3'



console.log("hiddeee")

let div = d3.select("#place");

//d3.json() remplace l'étape du fetch + de parser

//Promise.all permet de charger plusieurs Fetch en même temps, ce qui évite de faire d3.json dans un autre d3.json dans un

let docPib = "/income_per_person_gdppercapita_ppp_inflation_adjusted.csv";
let docEsperanceVie = "/life_expectancy_years.csv";
let docPopulation = "/population_total.csv"

Promise.all([d3.csv(docPib),
d3.csv(docEsperanceVie), d3.csv(docPopulation)])
    .then(function ([pib, esperanceVie, population]) {


        const pib2021 = pib.map(d => {
            // Trouver le format SI (M, B, k)
            let SI = d["2021"].substr(-1);
            let number = parseInt(d["2021"])
            if (SI == "M" || SI == "B" || SI == "k") {
                d["2021"].slice(-1)
                number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0, -1)) : d["2021"];
            }
            // Extraire la partie numérique

            // Selon la valeur SI, multiplier par la puissance
            switch (SI) {
                case 'M': {
                    return { "country": d.country, "pib_annee_2021": Math.pow(10, 6) * number };
                    break;
                }
                case 'B': {
                    return { "country": d.country, "pib_annee_2021": Math.pow(10, 9) * number };
                    break;
                }
                case 'k': {
                    return { "country": d.country, "pib_annee_2021": Math.pow(10, 3) * number };
                    break;
                }
                default: {
                    return { "country": d.country, "pib_annee_2021": number };
                    break;
                }
            }
        })



        let esperance2021 = esperanceVie.map((d, i) => {
            return { country: d.country, esperance_annee_2021: d.annee2021 }
        })

        const population2021 = population.map(d => {
            // Trouver le format SI (M, B, k)
            let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];
            // Extraire la partie numérique
            let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0, -1)) : d["2021"];
            // Selon la valeur SI, multiplier par la puissance
            switch (SI) {
                case 'M': {
                    return { "country": d.country, "population_annee_2021": Math.pow(10, 6) * number };
                    break;
                }
                case 'B': {
                    return { "country": d.country, "population_annee_2021": Math.pow(10, 9) * number };
                    break;
                }
                case 'k': {
                    return { "country": d.country, "population_annee_2021": Math.pow(10, 3) * number };
                    break;
                }
                default: {
                    return { "country": d.country, "population_annee_2021": number };
                    break;
                }
            }
        })

        /*   popTransformed.forEach((d) => {
              console.log(d)
          })
   */
        //parseFloat

        let datas = [];
        for (let i = 0; i < pib2021.length; i++) {
            let infosParCountry = { country: pib2021[i].country, pib_2021: pib2021[i].pib_annee_2021, esperance_2021: esperance2021[i].esperance_annee_2021, population_2021: population2021[i].population_annee_2021 };
            datas.push(infosParCountry);
        }

        datas.forEach((e) => { console.log(e) })

        console.log(datas)

        //dessin du svg, marges , 2 échelles et 2 axes

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

        const x = d3.scaleSqrt()
            .domain([0, d3.max(datas, function (d) { return d.pib_2021 })])
            .range([0, width])

        svgWithMarge.append('g')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));


        const y = d3.scaleLinear()
            .domain([0, d3.max(datas, function (d) { return d.esperance_2021 })])
            .range([height, 0])

        svgWithMarge.append('g')
            .call(d3.axisLeft(y));

        //échelle pour les cercles

        const z = d3.scaleSqrt()
            .domain([0, d3.max(datas, function (d) { return d.population_2021 })])
            .range([0, 50])


        //dessin cercles --> fonctionne sans les échelles mais sinon non

        svgWithMarge.selectAll("circle")
            .data(datas).enter()
            .append("g")
            .append("circle")
            .attr("cx", function (d) { return x(d.pib_2021) })
            .attr("cy", function (d) { return y(d.esperance_2021) })
            .attr("r", function (d) { return z(d.population_2021) })
            .attr("fill", function () {
                return "hsl(" + Math.random() * 360 + ",1100%,50%";
            })




    })

    .catch(function (err) {

    })



