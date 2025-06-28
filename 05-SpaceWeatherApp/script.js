// all needed api's

const CONFIG = {
  APOD_API: "https://api.nasa.gov/planetary/apod",
  DONKI_FLARE_API: "https://api.nasa.gov/DONKI/FLR",
  AURORA_API: "https://services.swpc.noaa.gov/products/aurora-forecast.json",
  SOLAR_WIND_API: "https://services.swpc.noaa.gov/products/solar-wind.json",
  DONKI_GST_API: "https://api.nasa.gov/DONKI/GST",
  NASA_API_KEY:  "hCAcPQwJ55fyfc1ApHrkJdOv2qPJf9vtsbaIbFyQ",
  SOLAR_SYSTEM_API: "https://api.le-systeme-solaire.net/rest/bodies",
  PLANET_API: "https://api.api-ninjas.com/v1/planets",
  NINJA_API_KEY: ""
}

// Add CSS for loading animation
const style = document.createElement("style")
style.textContent = `
    .loading-animation {
        display: flex;
        justify-content: center;
        gap: 5px;
        margin-bottom: 10px;
    }
    
    .loading-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #64ffda;
        animation: loading-bounce 1.4s ease-in-out infinite both;
    }
    
    .loading-dot:nth-child(1) { animation-delay: -0.32s; }
    .loading-dot:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes loading-bounce {
        0%, 80%, 100% {
            transform: scale(0);
        }
        40% {
            transform: scale(1);
        }
    }
`
document.head.appendChild(style)

// planet api request getting the data
async function fetchPlanetData(planetName, targetId) {
  const textContainer = document.getElementById(targetId)
  textContainer.textContent = 'Fetching Latest Data...'
  try {
    const response = await fetch(`${CONFIG.SOLAR_SYSTEM_API}/${planetName} `, {
      method: 'GET'
    });

    const data = await response.json();
    console.log(data);
    displayPlanetData(data, targetId);
  } catch (err) {
    textContainer.textContent = 'failed to fetch the data! Try Again !!'
    console.error("failed to fetch planet data", err);
  }
}

function displayPlanetData(planet, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <p><strong>Mass:</strong> ${planet.mass.massValue} × 10^${planet.mass.massExponent} kg</p>
    <p><strong>Radius:</strong> ${planet.meanRadius} km</p>
    <p><strong>Orbital Period:</strong> ${planet.sideralOrbit} days</p>
    <p><strong>Average Temperature:</strong> ${planet.avgTemp} K</p>
  `;
}
