// CREATES THE MAP

let map = L.map("map").setView([40.7128, -74.0060], 12);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
).addTo(map);


// RESOURCE INFORMATION

let resources = [

    {
        name: "The Bowery Mission - Tribeca Campus",
        type: "shelter",
        address: "90 Lafayette St, New York, NY",
        hours: "Open 24 Hours",
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


// STORES MAP MARKERS

let markers = [];


// SHOW RESOURCES

function showResources() {

    let list = document.getElementById("resource-list");

    let selected = document.getElementById("resources").value;

    list.innerHTML = "";


    // Removes old markers
    for (let i = 0; i < markers.length; i++) {

        map.removeLayer(markers[i]);

    }

    markers = [];


    // Goes through all resources
    for (let i = 0; i < resources.length; i++) {

        let resource = resources[i];


        if (selected == "all" || resource.type == selected) {

            // Adds resource card
            list.innerHTML += `

                <div class="resource-card">

                    <h3>${resource.name}</h3>

                    <p>📍 ${resource.address}</p>

                    <p>🕐 ${resource.hours}</p>

                </div>

            `;


            // Adds matching map marker
            let marker = L.marker([
                resource.lat,
                resource.lng
            ])

                .addTo(map)

                .bindPopup(resource.name);


            markers.push(marker);

        }

    }

}


// RESOURCE DROPDOWN

document
    .getElementById("resources")
    .addEventListener("change", showResources);


// FIND NEARBY RESOURCES BUTTON

document
    .getElementById("find-nearby-resources")
    .addEventListener("click", function () {

        document
            .getElementById("main-content")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


// USE MY LOCATION BUTTON

document
    .getElementById("use-location")
    .addEventListener("click", function () {

        navigator.geolocation.getCurrentPosition(

            function (position) {

                let lat = position.coords.latitude;

                let lng = position.coords.longitude;


                map.setView([lat, lng], 14);


                L.marker([lat, lng])

                    .addTo(map)

                    .bindPopup("You are here")

                    .openPopup();

            }

        );

    });


// SHOWS EVERYTHING WHEN PAGE LOADS

showResources();