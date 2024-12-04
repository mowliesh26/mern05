import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api'

const containerStyle = {
  width: '100vw',
  height: '100vh',
}

const center = {
  lat: 11.410000,
  lng: 76.699997,
}
const points = [
  {
    lat: 11.410000,
    lng: 76.699997,
  },
  {
    lat: 11.0168,
    lng: 76.9558,
  },
  {
    lat: 11.1085,
    lng: 77.3411,
  },
  {
    lat: 11.3410,
    lng: 77.7172,
  },
  {
    lat: 11.6643,
    lng: 78.1460,
  }
]
export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAZvbg8UabGmAdx-Qq6nAWFoG5HnwCYboc',
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
      
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false
      }}
    > {points.map((point, i) => (

      <MarkerF position={point}>  </MarkerF>
    ))
      }


      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}
