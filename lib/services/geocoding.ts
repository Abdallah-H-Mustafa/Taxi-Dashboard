"use client";

// Using OpenStreetMap's Nominatim service with proper headers and error handling
export async function geocodeTown(townName: string): Promise<{ lat: number; lng: number } | null> {
  try {
    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(townName)}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'DispatchCenter/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const results = await response.json();
    
    if (results && results.length > 0) {
      return {
        lat: parseFloat(results[0].lat),
        lng: parseFloat(results[0].lon)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}