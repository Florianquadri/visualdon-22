import * as d3 from 'd3';

let body = d3.select("body");

//d3.json() remplace l'étape du fetch + de parser

//Promise.all permet de charger plusieurs Fetch en même temps, ce qui évite de faire d3.json dans un autre d3.json dans un


Promise.all([d3.json("https://jsonplaceholder.typicode.com/users"),
d3.json("https://jsonplaceholder.typicode.com/posts")])
    //envoyer les 2 tableaux de données avec un nom attribué dans le then
    .then(function ([users, posts]) {

        console.log(users, posts);
        //users.map pour déterminer les données sélectionnées pour le nouveau tableau (nom, adresse...)

        let infoUsers = users.map((d, i) => {
            console.log(d.name, d.address.city, d.company.name, d.id)

            //j'envoie l'id de l'user et l'utilise pour filtrer le tableau posts (comme une requête SQL)
            let idUser = d.id;
            let mesPosts = posts.filter((d, i) => {
                return d.userId == idUser;
            })

            //je map pour n'avoir que le titre des posts
            let titrePosts = mesPosts.map((d, i) => { return d.title })

            //je définis l'objet de retour de mon map qui créera mon nouveau tableau qui me servira pour la suite de l'exo
            let ensembleInfo = {
                nom_utilisateur: d.username,
                ville: d.address.city,
                nom_compagnie: d.company.name,
                titres_posts: titrePosts
            }
            return ensembleInfo;
        })

        console.log(infoUsers)
        //pour exploiter ces données, je dois rester dans le promise All

        // 1 : calculer nombre post par users et mettre dans un tableau data pour l'afficher dans le DOM
        let datas = [];
        infoUsers.forEach((user) => {
            datas.push({ nombre_post: user.titres_posts.length, username: user.nom_utilisateur });
        })
        //2 : calculer moyenne de post par users
        const start = 0;
        //ne pas retourner dans {} sinon cela ne marche pas
        let totalPostsUsers = infoUsers.reduce((previousValue, currentValue) =>
            previousValue + currentValue.titres_posts.length, start
        );

        let moyennePostParUser = totalPostsUsers / infoUsers.length;
        console.log(moyennePostParUser)

        //3 : afficher les 2 résultats dans le DOM

        let maDiv = d3.select('div#ecriture')
        maDiv.append('p')
            .text("Moyenne de post par utilisateur : " + moyennePostParUser)

        //besoin du selectAll() faire enter(),append avec data
        maDiv.selectAll()
            .data(datas)
            .enter().append('p').text(function (d) {
                let chaine = "Username : " + d.username + " - nombre de post : " + d.nombre_post;
                return chaine;
            })

        //trouer user avec texte le plus long

        let infosPostUser = retournePostLePlusLongEtUserID(posts);
        let lengthMax = infosPostUser.postMaxLength;
        let userPostLengthMaxID = infosPostUser.user;

        // --> utiliser un filter pour trouver à quel user correspond l'id userPostLenghtMaxID

        let monUserProfile = users.filter((d, i) => {
            return d.id == userPostLengthMaxID;
        })
        console.log(monUserProfile);
        let userPostMaxLenght = monUserProfile[0].username;
        console.log(userPostMaxLenght)

        // afficher cet user dans le DOM 

        maDiv.append('p').text("L'utilisateur ayant écrit le post le plus long possède le username " + userPostMaxLenght + ", avec son post de " + lengthMax + " caractères");

        //graphique en baton --> rappel "datas" du dessus
        /*         let datas = [];
                infoUsers.forEach((user) => {
                    datas.push({ nombre_post: user.titres_posts.length, username: user.nom_utilisateur });
                })  on change nombre_post par height car graphique baton avec hauteur variant suivant nombres posts*/

        let datas2 = [];
        infoUsers.forEach((user) => {
            //racourcic les noms pour qu'ils ne prennent pas trop de place sur le graphique
            let usernameSubstr = user.nom_utilisateur.substr(0, 7)
            datas2.push({ height: user.titres_posts.length, username: usernameSubstr });
        })
        console.log(datas2)


        let divGraphe = d3.select("#graphique");
        let monSVG = divGraphe.append('svg')
            .attr("width", 1200)
            .attr("height", 400)
            .attr("id", "svgRect")


        let monGroupe = monSVG.selectAll()
            .data(datas2)
            .enter().append('g')

        monGroupe.append('rect')
            .attr("width", "70px")
            .attr("height", function (d) { return d.height * 30 })
            .attr("fill", function () {
                return "hsl(" + Math.random() * 360 + ",1100%,50%";
            })
            .attr("x", function (d, i) {
                console.log(d, i)
                return 100 + 80 * i
            })
            .attr("y", function (d, i) {
                let hauteurSVG = monSVG.attr("height");
                return (hauteurSVG - (d.height * 30) - 70);
            })


        monGroupe.append('text').text(function (d, i) { return d.username })
            .attr("y", function (d, i) {
                let hauteurSVG = monSVG.attr("height");
                return (hauteurSVG - 40);
            })
            .attr("x", function (d, i) {
                console.log(d, i)
                return 100 + 80 * i
            })

        monGroupe.append('text').text(function (d, i) {
            let chaine = d.height + " posts";
            return chaine
        })
            .attr("y", function (d, i) {
                let hauteurSVG = monSVG.attr("height");
                return (hauteurSVG - 10);
            })
            .attr("x", function (d, i) {
                console.log(d, i)
                return 100 + 80 * i
            })

            monGroupe.append('text').text(function (d, i) {
                let chaine = d.height + " posts";
                return chaine
            })
                .attr("y", function (d, i) {
                    let hauteurSVG = monSVG.attr("height");
                    return (hauteurSVG - d.height*30 -70);
                })
                .attr("x", function (d, i) {
                    console.log(d, i)
                    return 30
                })



    })
    .catch(function (err) {
        console.error("erreur");
    })


//je ne peux pas récupérer un tableau à utiliser en dehors du fetch car j'aurais seulement une promise


function retournePostLePlusLongEtUserID(posts) {
    let lengthMax = 0;
    let userPostLengthMaxID = 0;

    posts.forEach((post) => {
        let longueurPost = post.body.length;

        if (longueurPost > lengthMax) {
            lengthMax = longueurPost;
            userPostLengthMaxID = post.userId;
        }
    }
    )
    return { postMaxLength: lengthMax, user: userPostLengthMaxID }
}


