import React, {useEffect, useState} from 'react'
import {
   TileLayer,
   FeatureGroup,
   LayersControl,
   MapContainer
} from 'react-leaflet'
import "../../node_modules/leaflet-minimap/dist/Control.MiniMap.min.css";
import MiniMap from "leaflet-minimap";
import {useDispatch, useSelector} from 'react-redux'
import L from 'leaflet'
import {getDataGeoJson} from '../redux/GeoJson/geoJsonAction'
import {filteredDataOnDate} from '../redux/GeoJson/geoJsonSelectors'
import {FullscreenControl} from 'react-leaflet-fullscreen'
import 'react-leaflet-fullscreen/dist/styles.css'
import {mapCenterUkraine} from '../Constants'
import {Player} from './Player/Player'
import {useParams} from "react-router-dom";


export const Map = ({startPlayer, setStartPlayer, mapRef}) => {

   let params = useParams();

   const geojsonData = useSelector(filteredDataOnDate)
   const dispatch = useDispatch()
   const selectedDate = useSelector((state) => state.date.selectedDate)
   const minimapLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 0,
      maxZoom: 13
   });

   const zoom = params.scale || 6
   const paramsDate = params.date || selectedDate.toLocaleDateString()


   const mediaScreen684 = window.matchMedia('(max-width: 684px)')

   const _onFeatureGroupReady = (reactFGref) => {
      let parsedGeoJSON = geojsonData ? JSON.parse(geojsonData) : null
      let leafletGeoJSON = new L.GeoJSON(parsedGeoJSON)

      if (!reactFGref) {
         return
      }

      reactFGref.clearLayers()

      let index = 0

      leafletGeoJSON.eachLayer((layer) => {
         // добавляем стилизацию слоёв в GeoJSON
         let color = parsedGeoJSON.features[index].properties?.fill
         // в случае polyline или polygon меняем цвет
         if (layer?.options?.color && color) {
            layer.options.color = color
         }
         // в случае point меняем иконку и цвет
         else if (layer?.options?.icon && color) {
         }
         reactFGref.addLayer(layer)
         index++
      })
   }

   useEffect(() => {
      dispatch(
        getDataGeoJson(paramsDate)
      ) // eslint-disable-next-line
   }, [paramsDate])

   useEffect(() => {
      mapRef.current && new L.Control.MiniMap(minimapLayer, {
         position: "bottomright",
         minimized: mediaScreen684.matches,
         toggleDisplay: true,
         width: 200,
         height: 150,
         zoomLevelFixed: false,
         zoomAnimation: true,
         aimingRectOptions: {color: "#ff7800", weight: 1, clickable: false},
         collapsedWidth: 30,
         collapsedHeight: 30,

      }).addTo(mapRef.current);

   }, [mapRef.current])

   return (
     <MapContainer
       className={'map'}
       center={!(params.latitude && params.longitude) ? mapCenterUkraine : [+params.latitude, +params.longitude]}
       zoom={zoom}
       zoomControl={true}
       whenCreated={(mapInstance) => {
          mapRef.current = mapInstance
       }}
     >
        <LayersControl position='topleft' collapsed={false}>
           <LayersControl.BaseLayer
             checked={true}
             name='OpenStreetMap'
             group='BaseLayers'
           >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
           </LayersControl.BaseLayer>
           <LayersControl.BaseLayer
             checked={false}
             name='Mapbox'
             group='BaseLayers'
           >
              <TileLayer
                attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://www.mapbox.com/map-feedback/"><b>Improve this map</b></a>'
                url='https://api.mapbox.com/styles/v1/victorbyte/cl3yglzkr000114lpkrtdfo8y/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidmljdG9yYnl0ZSIsImEiOiJjbDN5Y3Y5bm4wNmlyM3Btd3Q5M3IyYzJ4In0.-DuPfSA_dInLUba4GyDfpw'
              />
           </LayersControl.BaseLayer>
           <LayersControl.BaseLayer
             checked={false}
             name='Jawg Matrix'
             group='BaseLayers'
           >
              <TileLayer
                attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=ThdhHbVb7Rah2j5HbyhbYhG3DSZpQ2UDqOmj6aeqAsGKg6dSyrqltzOJSGrrQZEh'
              />
           </LayersControl.BaseLayer>
        </LayersControl>
        <FeatureGroup
          ref={(item) => _onFeatureGroupReady(item)}
        />
        <FullscreenControl position='bottomleft'/>
        <Player startPlayer={startPlayer} setStartPlayer={setStartPlayer} />
     </MapContainer>
   )
}
