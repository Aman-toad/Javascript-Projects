// all needed api's

const CONFIG = {
  APOD_API: "https://api.nasa.gov/planetary/apod",
  DONKI_FLARE_API: "https://api.nasa.gov/DONKI/FLR",
  AURORA_API: "https://services.swpc.noaa.gov/products/aurora-forecast.json",
  SOLAR_WIND_API: "https://services.swpc.noaa.gov/products/solar-wind.json",
  DONKI_GST_API: "https://api.nasa.gov/DONKI/GST",
  NASA_API_KEY: "hCAcPQwJ55fyfc1ApHrkJdOv2qPJf9vtsbaIbFyQ",
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

window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const main = document.querySelector('.main');
    const stars = document.querySelector('.stars');
    const movingStars = document.querySelector('.moving-stars')

    if (stars && main && movingStars) {
      stars.style.transform = `translateY(${scrolled * 0.5}px)`;
      movingStars.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  })

  // observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const animateElements = document.querySelectorAll(".weather-card, .eclipse-card, .planet-card, .event-item")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // loading all the content on scrolling and show

  //main image
  loadAstronomyPictureOfDay();

  // space weather data
  loadSpaceWeatherData();
})

async function loadAstronomyPictureOfDay() {
  try {
    const res = await fetch(`${CONFIG.APOD_API}?api_key=${CONFIG.NASA_API_KEY}`)
    const data = await res.json();

    if (data.medi_type === "image") {
      const mainSection = document.querySelector('.main')
      mainSection.style.backgroundImage = `linear-gradient(rgba(10, 10, 20, 0.8), rgba(10, 10, 20, 0.9)), url(${data.url})`
      mainSection.style.backgroundSize = 'cover';
      mainSection.style.backgroundPosition = 'center';

      // image attributes
      const attribution = document.createElement("div")
      attribution.className = "apod-attribution";
      attribution.innerHTML = `
          <p>Background: NASA APOD - ${data.title}</p>
        `
      mainSection.appendChild(attribution)
    }
  } catch (err) {
    console.error("Error Loading APOD: ", err)
  }
}

async function loadSpaceWeatherData() {
  //loading state
  document.querySelectorAll('.card-data').forEach((card) => {
    card.innerHTML = `
      <div class="loading-animation">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
      <p>Fetching data from NASA...</p>
    `
  })

  loadSolarFlareData();

  // loadAuroraForecast();

  // loadSolarWindData();

  // loadGeomagneticStormData();
}

function getDateRange(days) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days)
  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  }
}

function formatFlareClass(flareClass) {
  const flareLevels = {
    X: { level: "Extreme", color: "#ef4444" },
    M: { level: "Severe", color: "#f97316" },
    C: { level: "Moderate", color: "#fbbf24" },
    B: { level: "Minor", color: "#4ade80" },
    A: { level: "Minimal", color: "#60a5fa" },
  }
  const level = flareLevels[flareClass.charAt(0)] || flareLevels["A"]
  return {
    class: flareClass,
    level: level.level,
    color: level.color,
  }
}

function formatDisplayDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

async function loadSolarFlareData() {
  try {
    const dateRange = getDateRange(7)
    const res = await fetch(`${CONFIG.DONKI_FLARE_API}?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&api_key=${CONFIG.NASA_API_KEY}`)

    const data = await res.json();

    const solarFlareCard = document.querySelector(".solar-flare .card-data");
    const statusIndicator = document.querySelector(".solar-flare .status-indicator");
    const statusText = document.querySelector('.solar-flare .card-status span:last-child')

    if (data.length > 0) {
      //most recent first
      data.sort((a, b) => new Date(b.beginTime) - new Date(a.beginTime))

      const latestFlare = data[0]
      const flareInfo = formatFlareClass(latestFlare.classType)

      // Update status indicator
      statusIndicator.style.background = flareInfo.color
      statusText.textContent = flareInfo.level.charAt(0).toUpperCase() + flareInfo.level.slice(1)

      // Format the data for display
      solarFlareCard.innerHTML = `
        <div class="data-item">
          <span class="data-label">Latest Flare:</span>
          <span class="data-value flare-class ${flareInfo.level}">${flareInfo.class}</span>
        </div>
        <div class="data-item">
          <span class="data-label">Begin:</span>
          <span class="data-value">${formatDisplayDate(latestFlare.beginTime)}</span>
        </div>
        <div class="data-item">
          <span class="data-label">Peak:</span>
          <span class="data-value">${formatDisplayDate(latestFlare.peakTime)}</span>
        </div>
        <div class="data-item">
          <span class="data-label">Source:</span>
          <span class="data-value">${latestFlare.sourceLocation || "Unknown"}</span>
        </div>
        <div class="data-item">
          <span class="data-label">Active Region:</span>
          <span class="data-value">${latestFlare.activeRegionNum || "N/A"}</span>
        </div>
      `
    } else {
      solarFlareCard.innerHTML = `<p>No recent solar flare data available.</p>`
      statusText.textContent = "Quiet"
    }

  } catch (err) {
    console.error("Error loading solar flare data:", err)
    document.querySelector(".solar-flare .card-data").innerHTML = `
      <p class="error-message">Error loading solar flare data. Please try again later.</p>
    `
  }
}

// load aurora forecast
