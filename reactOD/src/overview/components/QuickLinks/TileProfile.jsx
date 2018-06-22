import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'


class TileProfile extends Component {
     componentDidMount() {
    //console.log('*** Devices: this.props:', this.props);
    // this.props.actions.fetchDeviceTiles()
  }
    render() {
        let profile_object=this.props.profile;
        return (
<div className={`tileprofile_wrapper col-sm-4`}>            
                <a href={`${this.props.urlPath}`} aria-label="click to Change email address" role="button" >
                    <img className="icon" src={`${this.props.imagePath}`}  alt="Icon" />
                    <h3 className="a-subhead-md a-caret-right">{this.props.title}</h3>
            <p>{this.props.subheader} </p>
                </a>               
                </div>
                 )
    }
}

const mapStateToProps = state => {

   return {
    isFetching: state.overview.isFetching,
    deviceTiles: state.overview.deviceTiles,
    visible: state.overview.visible,
  }
}
const mapDispatchToProps = dispatch => ({

                })

export default connect(mapStateToProps, mapDispatchToProps)(TileProfile)