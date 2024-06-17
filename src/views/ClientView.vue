<template>
    <div>
        <h1>Live Location Tracker with Leaflet</h1>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import { nanoid } from "nanoid";

export default {
    setup() {
        let idUser = null;
        let map = null;
        let marker = null;
        let watchId = null;

        const updateMap = (lat, lon) => {
            marker.setLatLng([lat, lon]);
            map.setView([lat, lon], 13);
        };

        const startTracking = () => {
            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;

                        axios
                            .post(
                                "https://api-palembang.teknosof.com/kas_palembang/PostLoc/locationLongLat",
                                {
                                    id: idUser,
                                    long: lon,
                                    lat: lat,
                                },
                                {
                                    headers: {
                                        "disini-key": "accessapidisini",
                                    },
                                }
                            ).then((res) => { // Correct syntax for then
                                console.log("Success");
                            })
                            .catch((err) => { // Correct syntax for catch
                                console.log(err);
                            });
                    },
                    (error) => {
                        console.error('Error Code = ' + error.code + ' - ' + error.message);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 0,
                    }
                );
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        };
        onMounted(() => {
            startTracking();
            idUser = nanoid();

            // Initialize map when component is mounted
            const initialPosition = { lat: 0, lon: 0 }; // Initial position can be any default value
        });

        return { startTracking };
    }
}
</script>
