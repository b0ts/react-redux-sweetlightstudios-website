import { AIR_QUALITY } from '../actions/index.js';
const AirQuality = (state = null, action) => 
	(action.type === AIR_QUALITY && action.payload.data) ? action.payload.data : state;
export default AirQuality;