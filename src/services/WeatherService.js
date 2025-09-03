
import api from "./api";

export async function getWeather(county, constituency, ward) {
  try {
    const response = await api.get("/weather", {
      params: {
        county: county || "",
        constituency: constituency || "",
        ward: ward || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
}
 