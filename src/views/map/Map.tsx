import { Button, Col, Form, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FormBox, InputBox } from "../../components/AntdAddons";
import useStore from "../../store";
import "./Map.less";

interface IMap {
  mapType?: google.maps.MapTypeId;
  mapTypeControl?: boolean;
  setMapPolygonCord?: any;
  hasPolygonCord: any;
  latitudeVal?: number;
  longitudeVal?: number;
  zoomLevel?: number;
  close?: any;
  type: string;
  // setDistanceInKm: React.Dispatch<React.SetStateAction<number>>;
}

// const defaultProps: IMap = {
//   mapType: google.maps.MapTypeId.ROADMAP,
//   mapTypeControl: false,
//   zoomLevel: 14,
// }
// interface IMarker {
//   address: string;
//   latitude: number;
//   longitude: number;
// }

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleDrawingMap = google.maps.drawing.DrawingManager;
// type GoogleMarker = google.maps.Marker;
// type GooglePolyline = google.maps.Polyline;
// type GoogleGeocoder = google.maps.Geocoder;

const Map: React.FC<IMap> = ({
  mapType = google.maps.MapTypeId.ROADMAP,
  // mapTypeControl = false,
  setMapPolygonCord,
  hasPolygonCord,
  latitudeVal,
  longitudeVal,
  zoomLevel = 14,
  close,
  type,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { AUTH } = useStore();
  const [form] = Form.useForm();

  const [map, setMap] = useState<GoogleMap>();
  const [drawingMap, setDrawingMap] = useState<GoogleDrawingMap>();
  const [polygonCord, setPolygonCord] = useState<any>();
  // const [marker, setMarker] = useState<IMarker>();
  // const [homeMarker, setHomeMarker] = useState<GoogleMarker>();
  // const [googleMarkers, setGoogleMarkers] = useState<GoogleMarker[]>([]);
  // const [listenerIdArray, setListenerIdArray] = useState<any[]>([]);
  // const [LastLineHook, setLastLineHook] = useState<GooglePolyline>();

  const defaultLatitude = latitudeVal ? latitudeVal : AUTH.latitudeVal;
  const defaultLongitude = longitudeVal ? longitudeVal : AUTH.longitudeVal;

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    } else {
      // const homeLocation = new google.maps.LatLng(28.6517178, 77.2219388);
      // setHomeMarker(addHomeMarker(homeLocation));
      initEventListener();
    }
  };
  useEffect(startMap, [map]);

  const defaultMapStart = (): void => {
    const defaultAddress = new google.maps.LatLng(
      defaultLatitude,
      defaultLongitude
    );
    // initMap(zoomLevel, defaultAddress);

    if (hasPolygonCord) {
      setPolygonCord(hasPolygonCord);
      const formatArr = hasPolygonCord.map(
        (cord: any) => new google.maps.LatLng(cord[0], cord[1])
      );

      const mapOptions = {
        zoom: zoomLevel,
        center: defaultAddress,
        mapTypeId: mapType,
      };
      // const map1 = new google.maps.Map(
      //   document.getElementById("map-container__map") as HTMLElement,
      //   mapOptions
      // );

      const map1 = new google.maps.Map(ref.current as HTMLElement, mapOptions);

      const myPolygon = new google.maps.Polygon({
        paths: formatArr,
        draggable: type === "view" ? false : true,
        editable: type === "view" ? false : true,
      });
      setMap(map1);
      myPolygon.setMap(map1);

      google.maps.event.addListener(
        myPolygon.getPath(),
        "insert_at",
        function () {
          getPolygonCordinate(myPolygon);
        }
      );

      google.maps.event.addListener(myPolygon, "dragend", function () {
        getPolygonCordinate(myPolygon);
      });
    } else {
      initMap(zoomLevel, defaultAddress);
    }
  };

  const initEventListener = (): void => {
    // if (map) {
    //   console.log("initEventListener : map");
    //   google.maps.event.addListener(map, "click", function (e: any) {
    //     coordinateToAddress(e.latLng);
    //   });
    // }
    if (drawingMap) {
      google.maps.event.addListener(
        drawingMap,
        "polygoncomplete",
        function (polygon: any) {
          getPolygonCordinate(polygon);
        }
      );
    }
  };
  useEffect(initEventListener, [map, drawingMap]);

  const getPolygonCordinate = (polygon: any) => {
    const cordArray: any = [];
    for (let i = 0; i < polygon.getPath().getLength(); i++) {
      // console.log(polygon.getPath().getAt(i).toUrlValue());
      const cord = polygon.getPath().getAt(i).toUrlValue().split(",");
      cordArray.push([Number(cord[0]), Number(cord[1])]);
    }

    setPolygonCord(cordArray);
    // setMapPolygonCord(cordArray);
  };

  // const coordinateToAddress = async (coordinate: GoogleLatLng) => {
  //   console.log("coordinateToAddress");
  //   const geocoder = new google.maps.Geocoder();
  //   await geocoder.geocode(
  //     { location: coordinate },
  //     function (results, status) {
  //       if (status === "OK") {
  //         setMarker({
  //           address: results ? results[0].formatted_address : "",
  //           latitude: coordinate.lat(),
  //           longitude: coordinate.lng(),
  //         });
  //       }
  //     }
  //   );
  // };

  // useEffect(() => {
  //   if (marker) {
  //     addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
  //   }
  // }, [marker]);

  // const addMarker = (location: GoogleLatLng): void => {
  //   console.log("addMarker");
  //   const marker: GoogleMarker = new google.maps.Marker({
  //     position: location,
  //     map: map,
  //     icon: getIconAttributes("#000000"),
  //   });

  //   setGoogleMarkers((googleMarkers) => [...googleMarkers, marker]);

  //   const listenerId = marker.addListener("click", () => {
  //     const homePos = homeMarker?.getPosition();
  //     const markerPos = marker.getPosition();
  //     if (homePos && markerPos) {
  //       const distanceInMeters =
  //         google.maps.geometry.spherical.computeDistanceBetween(
  //           homePos,
  //           markerPos
  //         );
  //       // setDistanceInKm(Math.round(distanceInMeters / 1000));

  //       if (LastLineHook) {
  //         LastLineHook.setMap(null);
  //       }

  //       const line = new google.maps.Polyline({
  //         path: [
  //           { lat: homePos.lat(), lng: homePos.lng() },
  //           { lat: markerPos.lat(), lng: markerPos.lng() },
  //         ],
  //         icons: [
  //           {
  //             icon: {
  //               path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
  //             },
  //             offset: "100%",
  //           },
  //         ],
  //         map: map,
  //       });

  //       setLastLineHook(line);
  //     }
  //   });

  //   setListenerIdArray((listenerIdArray) => [...listenerIdArray, listenerId]);
  // };

  // useEffect(() => {
  //   listenerIdArray.forEach((listenerId) => {
  //     google.maps.event.removeListener(listenerId);
  //   });

  //   setListenerIdArray([]);
  //   setGoogleMarkers([]);
  //   googleMarkers.forEach((googleMarker) => {
  //     const markerPosition = googleMarker.getPosition();
  //     if (markerPosition) {
  //       addMarker(markerPosition);
  //     }
  //   });
  // }, [LastLineHook]);

  const searchAddress = (address: any) => {
    // var address = document.getElementById('zone_geo_address').value;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results && map) {
          console.log("view location");
          map.setCenter(results[0].geometry.location);
          map.fitBounds(results[0].geometry.viewport);
        }

        /*var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
              });*/
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  // const addHomeMarker = (location: GoogleLatLng): GoogleMarker => {
  //   console.log("addHomeMarker");
  //   const homeMarkerConst: GoogleMarker = new google.maps.Marker({
  //     position: location,
  //     map: map,
  //     icon: {
  //       url: window.location.origin + "/assets/images/homeAddressMarker.png",
  //     },
  //   });

  //   homeMarkerConst.addListener("click", () => {
  //     map?.panTo(location);
  //     map?.setZoom(6);
  //   });

  //   return homeMarkerConst;
  // };

  // const getIconAttributes = (iconColor: string) => {
  //   console.log("getIconAttributes");
  //   return {
  //     path: "M11.0639 15.3003L26.3642 2.47559e-05L41.6646 15.3003L26.3638 51.3639L11.0639 15.3003 M22,17.5a4.5,4.5 0 1,0 9,0a4.5,4.5 0 1,0 -9,0Z",
  //     fillColor: iconColor,
  //     fillOpacity: 0.8,
  //     strokeColor: "pink",
  //     strokeWeight: 2,
  //     anchor: new google.maps.Point(30, 50),
  //   };
  // };

  const initDrawingManager = () => {
    return new google.maps.drawing.DrawingManager({
      // map:map,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
    });
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      console.log("initmap");
      const map1 = new google.maps.Map(ref.current, {
        zoom: zoomLevel,
        center: address,
        mapTypeId: mapType,
        // mapTypeControl: mapTypeControl,
        // streetViewControl: false,
        // rotateControl: false,
        // scaleControl: true,
        // fullscreenControl: false,
        // panControl: false,
        // zoomControl: true,
        // gestureHandling: 'cooperative',
        // draggableCursor: 'pointer',
      });
      setMap(map1);
      const drawingManager = initDrawingManager();
      drawingManager.setMap(map1);
      setDrawingMap(drawingManager);
      // const creator = new PolygonCreator(map);
    }
  };

  const submitClick = () => {
    close();
    setMapPolygonCord(polygonCord);
  };

  return (
    <div className="map-container">
      {type !== "view" && (
        <FormBox
          form={form}
          id={"geoAreaMap"}
          onFinish={() => searchAddress(form.getFieldValue("location"))}
        >
          <Row gutter={15}>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <InputBox.Text
                label="Location"
                placeholder="Location"
                name="location"
                // onBlur={(e) => searchAddress(e.target.value)}
              />
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 8 }}
              className="align-items-center d-flex"
            >
              <Button
                key="1"
                form="geoAreaMap"
                htmlType="submit"
                type="primary"
              >
                Search
              </Button>
            </Col>
          </Row>
        </FormBox>
      )}
      <div
        ref={ref}
        className="map-container__map"
        id="map-container__map"
      ></div>
      {type !== "view" && (
        <Button
          key="1"
          type="primary"
          htmlType="submit"
          onClick={submitClick}
          className="submitBtn"
        >
          Submit
        </Button>
      )}
    </div>
  );
};

// Map.defaultProps = defaultProps;

export default Map;
