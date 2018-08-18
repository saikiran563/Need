import React from 'react';
import Modal from "../Modal/modal";
import { getErrorMsgByCode,WARNING_TIMEOUT,LOGOUT_TIMEOUT,LOGOUT_URL } from "../../../utils/config";


export  default function(ComposedClass) {

 return class Timeout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       warningTime: WARNING_TIMEOUT,
      signoutTime: LOGOUT_TIMEOUT,
      diff:LOGOUT_TIMEOUT- WARNING_TIMEOUT,
      warn:false
      };
      this.seconds =LOGOUT_TIMEOUT- WARNING_TIMEOUT;
    }

    componentDidMount() {
      this.events = [
        'load',
        'mousemove',
        'mousedown',
        'click',
        'scroll',
        'keypress'
      ];

      for (var i in this.events) {
        window.addEventListener(this.events[i], this.resetTimeout);
      }

      this.setTimeout();
    }

    clearTimeoutFunc = () => {
      if (this.warnTimeout) clearTimeout(this.warnTimeout);
      if(this.timer) clearInterval(this.timer);
      if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
     
    };

    setTimeout = () => {
      this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
      this.logoutTimeout = setTimeout(this.logout, this.state.signoutTime);
    };

    resetTimeout = () => {
       
      this.clearTimeoutFunc();
      this.setTimeout();
    };

    warn = () => {
      this.setState({modalStatus:true, warn:true});
      this.timer = setInterval(this.incrementSeconds, 1000);
      console.log('You will be logged out automatically in 1 minute.');
    };

    logout = () => {
      for (var i in this.events) {
        window.removeEventListener(this.events[i], this.resetTimeout);
      }
       this.setState({ warn:false});
      // Send a logout request to the API
      console.log('Sending a logout request to the API...');
      
    };

    destroy = () => {
     console.log(LOGOUT_URL);
     this.clearTimeoutFunc();
      this.setState({ warn:false});
      window.location.assign(LOGOUT_URL);
    };

   closeModal = () => {
    this.setState({
      modalStatus: false,
      warn: false,
    })
     this.seconds =this.state.diff;
      clearInterval(this.timer);
   this.resetTimeout()
  }
   incrementSeconds=()=> {
 
    this.seconds = this.seconds-1000;
    const timerString =  this.convert(this.seconds)
    
    if(this.seconds < 0) {
      this.seconds =this.state.diff;
      clearInterval(this.timer);
    }
    this.setState({timer:timerString});
}
 
  convert=(millisec)=> {
        var seconds = (millisec/1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
            return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
    } 
    renderModalContent() {
      let {modalStatus,warn,timer} = this.state;
      const header = warn ? "Are you still there?" : "logged Out";
      const content = warn ? "Due to inactivity, you will be logged out in approximately" :"Due to inactivity, you have been logged out";
      return  <div>
            <h1 className="title title--lg">
             {header}
            </h1>
            <p>
              {content}
            </p>
             { warn && 
              <p><strong>{timer}</strong></p>
             }
           
            { warn &&
            <div>
            <button
              className="btn btn--round"
              style={{ marginRight: "10px" }}
              onClick={this.closeModal}
            >
              Extend my session
            </button>
            <button
              className="btn btn--round-invert"
              onClick={this.closeModal}
            >
              Cancel
            </button>
            </div>
            }
             {
                    !warn && 
                    <button className="btn btn--round"  onClick={this.destroy} analyticstrack="extent-session">Login </button>
                  }
          </div>;
    }
    render() {
       
      let {modalStatus,warn} = this.state;
      const header = warn ? "Are you still there?" : "logged Out";
      const content = warn ? "Due to inactivity, you will be logged out in approximately" :"Due to inactivity, you have been logged out";
      return (
        <div>
          <ComposedClass {...this.props} />
          {<Modal
                modalStatus={modalStatus}
                closeModal={this.closeModal}
                show="false">
             <div>{this.renderModalContent()}</div>
            </Modal>}
        </div>
      );
    }
  }
}