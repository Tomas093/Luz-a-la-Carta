/**
 * Open Meteo Weather Service
 * Weather data fetching module for Luz a la Carta
 */

class WeatherService {
    /**
     * Fetch weather data for a specific location
     * @param {number} latitude - Location latitude
     * @param {number} longitude - Location longitude
     * @returns {Promise<Object>} Weather data object
     */
    static async getWeatherData(latitude = -34.4587, longitude = -58.9175) { // Default to Pilar, Argentina coordinates
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }

    /**
     * Get weather condition based on temperature and humidity
     * @param {number} temperature - Current temperature in Celsius
     * @param {number} humidity - Current relative humidity percentage
     * @returns {string} Weather condition description
     */
    static getWeatherCondition(temperature, humidity) {
        if (temperature > 30) return "Soleado y caluroso";
        if (temperature > 25) return "Soleado";
        if (temperature > 20) {
            return humidity > 70 ? "Nubes y sol" : "Parcialmente nublado";
        }
        if (temperature > 15) {
            return humidity > 80 ? "Nublado" : "Parcialmente nublado";
        }
        if (temperature > 10) return "Fresco";
        return "Frío";
    }

    /**
     * Get weather icon ID based on weather condition
     * @param {string} condition - Weather condition description
     * @returns {string} Weather icon ID
     */
    static getWeatherIconId(condition) {
        switch (condition) {
            case "Soleado y caluroso":
            case "Soleado":
                return "weather-icon-sunny";
            case "Nubes y sol":
                return "weather-icon-partly-cloudy";
            case "Parcialmente nublado":
                return "weather-icon-partly-cloudy";
            case "Nublado":
                return "weather-icon-cloudy";
            case "Lluvia":
                return "weather-icon-rain";
            case "Tormenta":
                return "weather-icon-storm";
            case "Tormenta Eléctrica":
                return "weather-icon-heavy-storm";
            default:
                return "weather-icon-sunny"; // Default icon
        }
    }
}

// Export for browser or Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WeatherService };
} else {
    window.WeatherService = WeatherService;
}
