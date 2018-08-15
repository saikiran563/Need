import axios from 'axios';
import react, { Component } from 'react';

import { getDeviceType } from '../../util/DeviceType';

const ONED = "1D";

export default class VendorScripts extends Component {

    static vzwDLPagePCI(index, page, level, position, tileKey, cta) {
        if(tileKey !== undefined) {
            const contentCategory = tileKey.split('_')[3];
            const vzwDLPagePCI = VendorScripts.PCIString(page, level, position, contentCategory, tileKey, cta)
            reactGlobals.perContentImpression.push({index: index+String(position), PCI: vzwDLPagePCI});

            return vzwDLPagePCI;
          }
    }

    static PCIString(page, level, position, contentCategory, tileKey, cta) {
        let ctaLink = '';
        if(cta && cta.length > 1) {
            ctaLink = cta.join('|');
        }
        else {
            if(cta[0] !== '' && cta[0] !== undefined)
                ctaLink = cta[0];
        }
        return page + ":" + level + ":" + "P" + (position + 1) + ":" + contentCategory + ":" + tileKey + ":" + ctaLink;
    }

    static sort(a, b)  {
        if (a.index < b.index)
            return -1;
        if (a.index > b.index)
            return 1;
        return 0;
    }

    componentDidMount() {

        const initializeVZWDL = (response) => {
            window.vzwDL.page = response.data.ensightenDto.page;
            window.vzwDL.authentication = response.data.ensightenDto.authentication;

            const deviceType = getDeviceType();
            if(!reactGlobals.customProps){
                window.vzwDL.page.condition = "";
                window.vzwDL.page.pageName = "/" + deviceType + "/my verizon/postpay/overview";
                window.vzwDL.page.hier1 = deviceType + "/my verizon/postpay/overview";
                window.vzwDL.page.selfServiceType = deviceType + ": overview page: view"; 
                window.vzwDL.page.platform = deviceType;
                window.vzwDL.page.mlsExp = ONED + ":" + deviceType;
                window.vzwDL.page.section2 = response.data.ensightenDto.page.section2 + "/postpay";
                window.vzwDL.page.section3 = "";
                window.vzwDL.authentication.prepayInd = "";
            }
        }

        const checkCompletedAPICount = () => {
            var apiCountCheckInterval = setInterval(function() {
                if(reactGlobals.completedAPICount === 0) {
                    reactGlobals.perContentImpression.sort(VendorScripts.sort);
                    window.vzwDL.page.perContentImpression = reactGlobals.perContentImpression.map(PCI => PCI.PCI).join(",")
                    if(reactGlobals.customProps){
                        _.map(reactGlobals.customProps,function(value,key){
                            window.vzwDL.page[key]=value;
                        });
                    }
                    clearInterval(apiCountCheckInterval);
                 }
            }, 500);
         }
        
        const injectEnsightenScripts = () => {
            let tealiumScript = document.createElement("script");
            tealiumScript.type = "text/javascript";
            tealiumScript.src = reactGlobals.analytics.utagSync;
            document.getElementsByTagName('head')[0].appendChild(tealiumScript);

            tealiumScript = document.createElement("script");
            tealiumScript.type = "text/javascript";
            let re = /(\/+)/g;
            tealiumScript.innerHTML = ' (function(a,b,c,d) { a=\'' + '\\/' + reactGlobals.analytics.utagAsync.replace(re,'\\/') + '\';b=document;c=\'script\';d=b.createElement(c);d.src=a;d.type=\'text/java\'+c;d.async=true; a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a); })();'
            document.getElementsByTagName('head')[0].appendChild(tealiumScript);
        }

        axios.get(reactGlobals.analytics.ensightenAPIURL)
            .then(initializeVZWDL)
            .then(injectEnsightenScripts)
            .then(checkCompletedAPICount)
    }

    render() {
        return null;
    }
}
