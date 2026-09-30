window.addEventListener('load', function () {
    console.log("jan app loaded :-)");

    //adding sound when visitor hovers over balloon letters
    document.querySelectorAll('.balloon-letter').forEach(letter => {
        let audio;

        // play sound when mouse hovers over balloon letter
        letter.addEventListener('mouseenter', () => {
            const soundSrc = letter.getAttribute('data-sound');
            
            // Create the audio object if it doesn't exist for this letter yet
            if (!audio) {
                audio = new Audio(soundSrc);
            }
            
            audio.currentTime = 0; // Rewind to the start (allows fast rapid hovering)
            audio.play().catch(error => {
                console.log("Audio playback blocked until you click on the page first!");
            });
        });

        // stop the sound effect if the mouse leaves balloon letter early
        letter.addEventListener('mouseleave', () => {
            if (audio) {
                audio.pause();
            }
        });
    });
});

//using fetch to get the data from my local json file
let button = document.getElementById('store-button');

button.addEventListener('click', function () {
    let inputText = document.getElementById("city-input").value.trim();

    fetch("vendors.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load vendors.json");
            }
            return response.json();
        })
        .then(data => {
            // matching the vendor to the city input and being case-insensitive
            let matchingVendor = data.find(v => v.city.toLowerCase() === inputText.toLowerCase());

            if (matchingVendor) {
                // populates the vendor info
                let nameElement = document.getElementById('v-name');
                nameElement.innerHTML = matchingVendor.name;

                let productElement = document.getElementById('v-product');
                productElement.innerHTML = matchingVendor.product;

                let addressElement = document.getElementById('v-address');
                addressElement.innerHTML = matchingVendor.address;
            } else {
                // to handle city not in dataset
                // this is needed because this is a static json file local search
                // vs the poke api example the server searched
                throw new Error("City not found");
            }
        })
        //error messages
        .catch(err => {
            console.log("Error: " + err);

            let nameElement = document.getElementById('v-name');
            nameElement.innerHTML = "city not available yet :-(";

            let productElement = document.getElementById('v-product');
            productElement.innerHTML = "";

            let addressElement = document.getElementById('v-address');
            addressElement.innerHTML = "";
        });
});

//using the tooltip function to as instructions to webpage visitors
document.querySelectorAll('.letter-p').forEach(el => {
  // pulls the text from the alt attribute in html and shows as a browser tooltip
  el.addEventListener('mouseenter', () => el.title = el.alt);
});
