/**
 * Home page script for Luz a la Carta
 * Handles weather data display and device interactions
 */

// Coordinates for Pilar, Argentina
const PILAR_COORDS = {
    latitude: -34.4587,
    longitude: -58.9175
};

// DOM elements
let locationNameElement;
let currentTempElement;
let tempRangeElement;
let humidityElement;
let weatherStatusElement;

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    locationNameElement = document.querySelector('.location-name');
    currentTempElement = document.querySelector('.current-temp');
    tempRangeElement = document.querySelector('.temp-range');
    humidityElement = document.querySelector('.humidity');
    weatherStatusElement = document.querySelector('.weather-status div');
    
    // Initialize the weather display
    initWeatherDisplay();
    
    // Add event listeners for device controls
    setupDeviceControls();
});

/**
 * Initialize the weather display with data from the weather service
 */
async function initWeatherDisplay() {
    try {
        // Fetch weather data from the API
        const weatherData = await WeatherService.getWeatherData(
            PILAR_COORDS.latitude, 
            PILAR_COORDS.longitude
        );
        
        // Extract relevant information
        const currentTemp = weatherData.current.temperature_2m;
        const humidity = weatherData.current.relative_humidity_2m;
        const minTemp = weatherData.daily.temperature_2m_min[0];
        const maxTemp = weatherData.daily.temperature_2m_max[0];
        
        // Determine the weather condition
        const condition = WeatherService.getWeatherCondition(currentTemp, humidity);
        
        // Update the UI
        updateWeatherUI(currentTemp, humidity, minTemp, maxTemp, condition);
    } catch (error) {
        console.error('Failed to initialize weather display:', error);
    }
}

/**
 * Update the weather UI with the provided data
 * @param {number} currentTemp - Current temperature
 * @param {number} humidity - Current humidity
 * @param {number} minTemp - Minimum temperature for the day
 * @param {number} maxTemp - Maximum temperature for the day
 * @param {string} condition - Weather condition description
 */
function updateWeatherUI(currentTemp, humidity, minTemp, maxTemp, condition) {
    // Update temperature and humidity information
    document.querySelector('.current-temp').textContent = `${Math.round(currentTemp)}°`;
    document.querySelector('.temp-unit').textContent = 'C';
    document.querySelector('.temp-range').textContent = `${Math.round(minTemp)}° / ${Math.round(maxTemp)}°`;
    document.querySelector('.humidity').textContent = `Humedad: ${Math.round(humidity)}%`;
    
    // Update weather condition text
    const weatherConditionElement = document.getElementById('current-weather-condition');
    if (weatherConditionElement) {
        weatherConditionElement.textContent = condition;
    }
    
    // Get the appropriate icon ID for the condition
    const iconId = WeatherService.getWeatherIconId(condition);
    
    // Hide all weather status icons
    document.querySelectorAll('.weather-status').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show the appropriate icon
    const activeIcon = document.getElementById(iconId);
    if (activeIcon) {
        activeIcon.classList.add('active');
    }
}

/**
 * Setup event listeners for device controls
 */
function setupDeviceControls() {
    const addDeviceButton = document.querySelector('.add-device button');
    addDeviceButton.addEventListener('click', () => {
        alert('Funcionalidad para añadir dispositivo en desarrollo');
    });
    
    // Additional device control setup would go here
}
