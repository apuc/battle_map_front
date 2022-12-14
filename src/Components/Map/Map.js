import React, {useEffect} from 'react'
import {
   TileLayer,
   FeatureGroup,
   LayersControl,
   MapContainer, Marker
} from 'react-leaflet'
import "leaflet-minimap/dist/Control.MiniMap.min.css";
import MiniMap from "leaflet-minimap";
import {useDispatch, useSelector} from 'react-redux'
import L from 'leaflet'
import {getDataGeoJson} from '../../redux/GeoJson/geoJsonAction'
import {filteredDataOnDate} from '../../redux/GeoJson/geoJsonSelectors'
import {FullscreenControl} from 'react-leaflet-fullscreen'
import 'react-leaflet-fullscreen/dist/styles.css'
import {mapCenterDonbass} from '../../utils/Constants'
import {Player} from '../Player/Player'
import {useNavigate, useParams} from "react-router-dom";
import {isLoadingSelector, isShowEventsSelector, newsSelector} from "../../redux/News/newsSelectors";
import {setIdActiveNews, toggleNews} from "../../redux/News/newsAction";
import {expandTextEvent, timeConverter} from "../../utils/configData";


const Map = ({mapRef}) => {

   let params = useParams();

   const geojsonData = useSelector(filteredDataOnDate)
   const isShowEvents = useSelector(isShowEventsSelector)
   const isLoading = useSelector(isLoadingSelector)
   const dispatch = useDispatch()
   const selectedDate = useSelector((state) => state.date.selectedDate)
   const minimapLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 0,
      maxZoom: 13
   });

   const zoom = 7
   const paramsDate = params.date || selectedDate.toLocaleDateString()
   const news = useSelector(newsSelector)
   const mediaScreen684 = window.matchMedia('(max-width: 684px)')
   const navigate = useNavigate()

   let LeafIcon = L.Icon.extend({
      options: {
         iconSize: [38, 38],
         shadowAnchor: [2, 50]
      }
   });

   const _onFeatureGroupReady = (reactFGref) => {
      let parsedGeoJSON = geojsonData ? JSON.parse(geojsonData) : null
      let leafletGeoJSON = new L.GeoJSON(parsedGeoJSON)

      if (!reactFGref) {
         return
      }

      reactFGref.clearLayers()

      let index = 0

      leafletGeoJSON.eachLayer((layer) => {
         // ?????????????????? ???????????????????? ?????????? ?? GeoJSON
         let color = parsedGeoJSON.features[index].properties?.fill
         let fillColor = parsedGeoJSON.features[index].properties?.fillColor || color
         let fillOpacity = parsedGeoJSON.features[index].properties?.fillOpacity || '0.2'
         let weight = parsedGeoJSON.features[index].properties?.weight || '3'
         let opacity = parsedGeoJSON.features[index].properties?.opacity || '1'
         // ?? ???????????? polyline ?????? polygon ???????????? ????????????????
         if (layer?.options?.color && color) {
            layer.options.color = color
            layer.options.fillColor = fillColor
            layer.options.fillOpacity = fillOpacity
            layer.options.weight = weight
            layer.options.opacity = opacity
         }
         reactFGref.addLayer(layer)
         index++
      })
   }

   const clickMarker = (e, center, item) => {
      if (e.latlng.lat === +center[0] && e.latlng.lng === +center[1]) {
         const listEventsContainer = document.querySelector('.list-events__container')
         const listEvents = document.querySelector('.list-events')
         const headerEvents = document.querySelector('.list-events h3')
         console.log('map ', isShowEvents)
         if(!isShowEvents){
            dispatch(toggleNews())
            listEventsContainer.style.opacity = '1'
            listEvents.style.pointerEvents = 'all'
            listEvents.style.background = '#f9f9f9'
            headerEvents.style.opacity = '1'
         }
         dispatch(setIdActiveNews(item.id))
         if (item.id !== +params.id) navigate('/' + timeConverter(item.published_date) + '/' + item.id)
      }
   }

   useEffect(() => {
      dispatch(getDataGeoJson(paramsDate))
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
       center={mapCenterDonbass}
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
        {news.map(item => {
           if (item.coordinates) {
              const center = item.coordinates.split(',')
              let icon = new LeafIcon({iconUrl: 'https://front.dnr.one/' + item.event?.icon})
              if (item.id === +params.id) {
                 mapRef.current.setView(center, 13)
                 !isLoading&&expandTextEvent(item.id)
              }
              return item.event?.icon ? <Marker
                  position={center}
                  icon={icon}
                  key={item.id}
                  eventHandlers={{
                     click: (e) => clickMarker(e, center, item)
                  }}
                >
                </Marker>
                :
                <Marker
                  position={center}
                  key={item.id}
                  eventHandlers={{
                     click: (e) => clickMarker(e, center, item)
                  }}
                >
                </Marker>
           } else {
              if (item.id === +params.id) {
                 mapRef.current.setView(mapCenterDonbass, 7)
                 expandTextEvent(item.id)
              }
           }
        })}
        <FullscreenControl position='bottomleft'/>
        <Player/>
     </MapContainer>
   )
}

export default React.memo(Map)