document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('map');
    const latLogInput = document.getElementById('lat-log');

    const BASE_COORDS = [-12.281717, -38.975114];
    const MAX_RADIUS_KM = 30;
    const MAP_RADIUS_METERS = 1000; // 1km de visão

    let map;

    // Função pra calcular distância entre dois pontos em km (haversine)
    function getDistanceKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // Atualiza input com centro atual do mapa
    function updateLatLogInput() {
        const center = map.getCenter();
        latLogInput.value = `${center.lat.toFixed(6)},${center.lng.toFixed(6)}`;
    }

    // Centraliza mapa com círculo de raio de 1km
    function centerMap(lat, lng) {
        map.setView([lat, lng], 16);
        L.circle([lat, lng], {
            radius: MAP_RADIUS_METERS,
            color: '#cd533b',
            fillOpacity: 0.1,
        }).addTo(map);
        updateLatLogInput();
    }

    // Inicializa mapa
    function initMap(coords) {
        map = L.map('map').setView(coords, 16);

        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; Stadia Maps',
            maxZoom: 20
        }).addTo(map);

        centerMap(coords[0], coords[1]);

        // Sempre que o mapa for movido, atualiza o input
        map.on('moveend', updateLatLogInput);
    }

    // Tenta pegar a localização do usuário
    function tryGeolocation() {
        if (!navigator.geolocation) {
            console.warn('Geolocalização não suportada.');
            initMap(BASE_COORDS);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                const dist = getDistanceKm(lat, lng, BASE_COORDS[0], BASE_COORDS[1]);
                console.log(`📍 Usuário localizado em ${lat}, ${lng} (distância: ${dist.toFixed(2)} km)`);

                if (dist > MAX_RADIUS_KM) {
                    console.warn('Fora do raio permitido. Usando localização padrão.');
                    initMap(BASE_COORDS);
                } else {
                    initMap([lat, lng]);
                }
            },
            (err) => {
                console.error('Erro ao obter localização:', err.message);
                initMap(BASE_COORDS);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }

    tryGeolocation();
});
