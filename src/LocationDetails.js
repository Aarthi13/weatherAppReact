import React from 'react';
import SeasonDisplay from './SeasonDisplay';
import Spinner from  './Spinner';

class LocationDetails extends React.Component {
    constructor(props) {
        super(props);
        // This is the ONLY TIME we do direct assignment to the this.state
        this.state = { lat: null, errorMsg: '' };
    }

    //alternate way to decalre state. delete constructor fn compeltely
    
    //state = { lat: null, errorMsg: '' };
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                // here we can update
                this.setState({ lat: position.coords.latitude })
            },
            err => {
                this.setState({ errorMsg: err.message })
            }
        );
    }

    renderContent(){
        if (this.state.errorMsg && !this.state.lat) {
            return <div> Error : {this.state.errorMsg} </div>
        }
        if (this.state.lat && !this.state.errorMsg) {
            return <SeasonDisplay lat={this.state.lat}></SeasonDisplay>
        }
        return <Spinner msg="please accept location!"> Loading!! </Spinner>
    }
    render() {
       
        return(
            <div className="border red">
                 {this.renderContent()}
            </div>
        )
    }

}

export default LocationDetails;