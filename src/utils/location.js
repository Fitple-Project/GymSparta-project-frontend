export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
      );
    }
  });
}

export async function getAddressFromCoordinates(latitude, longitude) {
  const apiKey = 'AIzaSyAWbTMbQni2k1rhRNxtJX7iUsRFl5fR3ss';  // 여기에 새로 생성한 올바른 API 키를 입력합니다.
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
    const data = await response.json();
    if (data.status === 'OK' && data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      const gu = addressComponents.find(component => component.types.includes('sublocality_level_1') || component.types.includes('locality'));
      const dong = addressComponents.find(component => component.types.includes('sublocality_level_2') || component.types.includes('political'));
      const detailedAddress = `${gu ? gu.long_name : ''} ${dong ? dong.long_name : ''}`;
      return detailedAddress;
    } else {
      console.error('Geocoding API response:', data);
      throw new Error('Failed to get address from coordinates');
    }
  } catch (error) {
    console.error('Geocoding API request failed:', error);
    throw new Error('Geocoding API request failed');
  }
}

export async function getCoordinatesFromAddress(address) {
  const apiKey = 'AIzaSyAWbTMbQni2k1rhRNxtJX7iUsRFl5fR3ss';  // 여기에 유효한 Google Maps API 키를 입력하세요.
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const data = await response.json();
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng
      };
    } else {
      console.error('Geocoding API response:', data);
      throw new Error('Failed to get coordinates from address');
    }
  } catch (error) {
    console.error('Geocoding API request failed:', error);
    throw new Error('Geocoding API request failed');
  }
}