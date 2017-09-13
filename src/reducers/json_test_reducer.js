import { TEST_JSON_GET } from '../actions/index.js';
const TestJsonGet = (state = null, action) => 
	(action.type === TEST_JSON_GET && action.payload.data) ? action.payload.data : state;
export default TestJsonGet;