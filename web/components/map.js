import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

class Map extends React.Component {
  render() {
    const MyMapComponent = withScriptjs(withGoogleMap(() => {
        let markerItems;
        let polyLines;

        if(this.props.devices) {
          markerItems = this.props.devices.map((device) =>
          <MarkerWithLabel
            key={`label-${device.device_id}`}
            position={{ lat: _.get(device,'location.data.location.coordinates[1]'), lng: _.get(device,'location.data.location.coordinates[0]')}}
            labelAnchor={new google.maps.Point(100, -15)}>
            <div>{device.device_id}</div>
          </MarkerWithLabel>
          );
        }

        if(this.props.segments) {
          polyLines = this.props.segments.map((segment, s) => {
            const polyline = segment.polyline;
            let path = [];

            for (let i = 0; i < polyline.length; i++) {
              const coordinates = polyline[i];
              path.push({lat: coordinates[0], lng: coordinates[1]});
            }

            return (<Polyline
              path={path}
              key={`segment-${s}`}
            />);
          });
        }

        return (<GoogleMap
          defaultZoom={13}
          defaultCenter={ {lat: 37.7933412, lng: -122.3995876} } >
          {markerItems}
          {polyLines}
        </GoogleMap>);
      }
    ));

    const containerStyle = {
      height: this.props.segments ? `200px` :`100vh`
    };

    return (<div>
        <MyMapComponent
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyD6V1v4K6l_nm-W9KdCLMObqDgU0znIt-w&v=3.exp&libraries=geometry,drawing,places'
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={containerStyle} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    </div>);
  }
}

export default Map;