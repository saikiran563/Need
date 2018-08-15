import { desktop_min, tablet_min, mobile_max } from "./style";

const MOBILE = "mobile";
const TABLET = "tablet";
const DESKTOP = "desktop";

export const getDeviceType = () => {
    if (window.matchMedia("(max-width: " + mobile_max + "px)").matches) {
        return MOBILE;
    }
    if (window.matchMedia("(min-width: " + desktop_min + "px)").matches) {
        return DESKTOP;
    }
    if (window.matchMedia("(min-width: " + tablet_min + "px)").matches 
    && window.matchMedia("(max-width: " + desktop_min + "px)").matches) {
        return TABLET;
    }
}
