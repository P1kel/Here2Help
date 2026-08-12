// CREATES THE MAP

// Starts the map in New York City
let map = L.map("map").setView([40.7128, -74.0060], 12);


// Adds the OpenStreetMap design to the map
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
).addTo(map);



// RESOURCE INFORMATION

// This array stores the resources that will show on the website
let resources = [

    {
        name: "The Bowery Mission - Tribeca Campus",

        // Used by the dropdown filter
        type: "shelter",

        address: "90 Lafayette St, New York, NY",

        hours: "Open 24 Hours",

        // Latitude and longitude are used to place it on the map
        lat: 40.7173,
        lng: -74.0017
    },


    {
        name: "Xavier Mission",

        type: "food",

        address: "55 W 15th St, New York, NY",

        hours: "Food assistance available",

        lat: 40.7373,
        lng: -73.9956
    },


    {
        name: "Holy Apostles Soup Kitchen",

        type: "food",

        address: "296 9th Ave, New York, NY",

        hours: "Weekdays 10:30 AM - 12:30 PM",

        lat: 40.7492,
        lng: -73.9997
    }

];



// SHOW RESOURCE CARDS

function showResources() {

    // Finds the empty resource-list div in the HTML
    let list = document.getElementById("resource-list");


    // Gets the option the user chose from the dropdown
    let selected = document.getElementById("resources").value;


    // Clears the old resource cards
    list.innerHTML = "";


    // Goes through every resource in the array
    for (let i = 0; i < resources.length; i++) {


        // Saves the current resource into a shorter variable
        let resource = resources[i];


        // Shows it if "All Resources" is selected
        // OR if the resource matches the selected type
        if (selected == "all" || resource.type == selected) {


            // Adds a card to the resource list
            list.innerHTML += `

                <div class="resource-card">

                    <h3>${resource.name}</h3>

                    <p>📍 ${resource.address}</p>

                    <p>🕐 ${resource.hours}</p>

                </div>

            `;

        }

    }

}



// ADD MAP MARKERS

function addMarkers() {


    // Goes through every resource
    for (let i = 0; i < resources.length; i++) {


        let resource = resources[i];


        // Adds a marker using the resource's latitude and longitude
        L.marker([resource.lat, resource.lng])

            // Adds it to the map
            .addTo(map)

            // Shows the resource name when the marker is clicked
            .bindPopup(resource.name);

    }

}



// RESOURCE DROPDOWN

// Finds the dropdown
document
    .getElementById("resources")

    // Runs this when the user chooses a different option
    .addEventListener("change", function () {


        // Updates the resource cards
        showResources();

    });



// FIND NEARBY RESOURCES BUTTON

document
    .getElementById("find-nearby-resources")

    .addEventListener("click", function () {


        // Scrolls down to the main resource section
        document
            .getElementById("main-content")
            .scrollIntoView();

    });



// USE MY LOCATION BUTTON

document
    .getElementById("use-location")

    .addEventListener("click", function () {


        // Asks the browser for the user's location
        navigator.geolocation.getCurrentPosition(

            function (position) {


                // Gets the user's latitude
                let lat = position.coords.latitude;


                // Gets the user's longitude
                let lng = position.coords.longitude;


                // Moves the map to the user's location
                map.setView([lat, lng], 14);


                // Adds a marker showing the user's location
                L.marker([lat, lng])

                    .addTo(map)

                    .bindPopup("You are here")

                    .openPopup();

            }

        );

    });



// Shows the resource cards when the page first loads
showResources();


// Adds the resource markers when the page first loads
addMarkers();