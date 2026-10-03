
// balloon emojis released when store button pressed (gemini)
function launchEmojis(buttonElement) {
    const emoji = '🎈';
    const count = 3;

    // get exact button position on screen
    const rect = buttonElement.getBoundingClientRect();
    const startX = rect.left + (rect.width / 2);
    const startY = rect.top;

    for (let i = 0; i < count; i++) {
        const emojiEl = document.createElement('span');
        emojiEl.classList.add('floating-emoji');
        emojiEl.innerText = emoji;

        // slight horizontal offset so all 3 are visible
        const offset = (i - 1) * 16; 

        emojiEl.style.left = `${startX + offset}px`;
        emojiEl.style.top = `${startY}px`;

        document.body.appendChild(emojiEl);

        // remove element after animation ends
        setTimeout(() => {
            emojiEl.remove();
        }, 1200);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("jan app loaded :-)");

    //adding sound when visitor hovers over balloon letters
    document.querySelectorAll('.balloon-letter').forEach(letter => {
        let audio;

        // play sound when mouse hovers over balloon letter
        letter.addEventListener('mouseenter', () => {
            const soundSrc = letter.getAttribute('data-sound');
            
            // create the audio object if it doesn't exist for this letter yet
            if (!audio) {
                audio = new Audio(soundSrc);
            }
            
            audio.currentTime = 0; 
            // rewind
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

    //using fetch to get the data from my local json file
    let button = document.getElementById('store-button');

    if (button) {
        button.addEventListener('click', function () {
            launchEmojis(this);

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

                        // --- IMAGE HANDLING LOGIC ---
                        let imgElement = document.getElementById('v-image');

                        // If <img id="v-image"> doesn't exist in HTML, create and insert it after address
                        if (!imgElement) {
                            imgElement = document.createElement('img');
                            imgElement.id = 'v-image';
                            addressElement.insertAdjacentElement('afterend', imgElement);
                        }

                        // Display the image
                        if (matchingVendor.image) {
                            imgElement.src = matchingVendor.image;
                            imgElement.alt = matchingVendor.name;
                            imgElement.style.display = 'block';
                        } else {
                            imgElement.style.display = 'none';
                        }

                    } else {
                        // to handle city not in dataset
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

                    // Hide image on error or when city is not found
                    let imgElement = document.getElementById('v-image');
                    if (imgElement) {
                        imgElement.style.display = 'none';
                    }
                });
        });
    }

    //using the tooltip function as instructions to webpage visitors
    document.querySelectorAll('.letter-p').forEach(el => {
        // pulls the text from the alt attribute in html and shows as a browser tooltip
        el.addEventListener('mouseenter', () => el.title = el.alt);
    });
});