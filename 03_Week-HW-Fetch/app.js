window.addEventListener('load', function () {
    console.log("jan app loaded :-)");
});

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