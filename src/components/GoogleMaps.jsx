import { React, useState } from "react";
import { useTranslation } from 'react-i18next';
import {
  GoogleMap,
  Marker,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";


const containerStyle = {
  width: "800px",
  height: "600px",
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

const GoogleMapsComponent = ({ places, apiKey, markerIcon }) => {
  const { t } = useTranslation();
  // console.log('apiKey', apiKey);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);

  const handleMarkerClick = async (place) => {
    setSelectedPlace(place);

    try {
      const response = await fetch(
        `http://localhost:3001/placeDetails?key=${apiKey}&place_id=${place.place_id}`
      );
      console.log("Raw response:", response);
      const data = await response.json();
      console.log("Parsed data:", data);
      setSelectedPlaceDetails(data.result);
    } catch (err) {
      // Handle non-JSON response
      console.log("Error parsing response:", err);
      setSelectedPlaceDetails(null);
    }
  };

  const handleCloseInfoWindow = () => {
    setSelectedPlace(null);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} loading="async">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {places.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            }}
            title={place.name}
            onClick={() => handleMarkerClick(place)}
            options={{ icon: markerIcon }}
          />
        ))}
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.geometry.location.lat,
              lng: selectedPlace.geometry.location.lng,
            }}
            onCloseClick={handleCloseInfoWindow}
          >
            <div>
              {selectedPlaceDetails ? (
        <>
        <p>{t("infoWindow.name")}: {selectedPlaceDetails.name}</p>
        <p>{t("infoWindow.address")}: {selectedPlaceDetails.formatted_address}</p>
        {selectedPlaceDetails.formatted_phone_number && (
          <p>{t("infoWindow.phone")}: {selectedPlaceDetails.formatted_phone_number}</p>
        )}
        <p>{t("infoWindow.rating")}: {selectedPlaceDetails.rating}</p>
        {selectedPlaceDetails.website && (
          <p>{t("infoWindow.website")}: {selectedPlaceDetails.website}</p>
        )}

        {selectedPlaceDetails.opening_hours && (
          <>
            <p>{t("infoWindow.openingHours")}:</p>
            <ul>
              {selectedPlaceDetails.opening_hours.weekday_text.map((hours, index) => (
                <li key={index}>{hours}</li>
              ))}
            </ul>
          </>
        )}

                  {selectedPlaceDetails.photos &&
                    selectedPlaceDetails.photos.length > 0 && (
                      <img
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${selectedPlaceDetails.photos[0].photo_reference}&key=${apiKey}`}
                        alt="Place Photo"
                      />
                    )}
                </>
              ) : (
                <p>{t("infoWindow.noDetails")}</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsComponent;
