let express = require('express');
let app = express ();
//adds express

let fish = {
    "data" : [
        {
            name: "arowana",
            info: "large, prehistoric fish",
            nickname: "dragon fish",
            found: "South America, Southeast Asia, and Australia",
            funfact: "valued as symbols of luck and prosperity",
        },
        {
            name: "guppy",
            info: "small, colorful fish",
            nickname: "rainbow fish",
            found: "South America, and parts of the Caribbean",
            funfact: "beginner-friendly fish to raise!",
        },
        {
            name: "goldfish",
            info: "round bodies, double tails, and slower swimming speeds",
            nickname: "goldie?",
            found: "China, and parts of eastern Asia",
            funfact: "released goldfish adapt quickly, survive in the mud, and can be an invasive species",
        },
        {
            name: "neon tetra",
            info: "small, iridescent blue stripes with bright red tails fish",
            nickname: "last of the mohicans",
            found: "Peru, Colombia, and Brazil",
            funfact: "peaceful schooling fish, but must be kept in groups of at least 5 to 6 (or stressed out)",
        }
    ]
}

app.get('/', (req,res) => {
	res.send("this is the root page");
	});
//the home page, will display this message

app.get('/about', (req,res) => {
	res.send("this is the about page :)");
	});
//the about page!

app.get('/fish', (req,res) => {
    res.json(fish);
});
// the fish page

app.get('/fish/:fish', (req,res) => {
    console.log(req.params.fish);
    let user_fish = req.params.fish;
    let user_obj;
    for(let i = 0; i < fish.data.length; i++) {
        console.log(user_fish);
        console.log(fish.data[i].name);
        if(user_fish === fish.data[i].name) {
            user_obj = fish.data[i];
        }
    }
    console.log(user_obj);
    if (user_obj) {
        res.json(user_obj);
    } else {
        res.json({status: "no info on that fish :("});
    }
    res.send("thanks for all the fish!");
});
// the fish parameter request

app.listen(3000, ()=> { 
	console.log("listening at localhost:3000");
	});
//where the server should listen to
//which is at -> localhost:3000

