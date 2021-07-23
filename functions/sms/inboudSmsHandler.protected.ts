import '@twilio-labs/serverless-runtime-types';
import axios, { AxiosResponse } from 'axios';

import {
  Context,
  ServerlessCallback, 
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';

const airQualityApi = process.env.AIR_QUALITY_API  || 'https://www.airvisual.com/api/v2/node/';

interface AirQuality {
  settings : {
    node_name: string
  },
  current: Sample
}

interface Sample {
  ts: string,
  tp: number,
  hm: number,
  p2: number,
  p1: number,
  p01: number,
  co: number,
  errors: {
    voc: number
  }
}

export const handler: ServerlessFunctionSignature = async function(
  context: Context,
  event: any,
  callback: ServerlessCallback
) {
  const twiml = new Twilio.twiml.MessagingResponse();
  const { data } = await getAirQualityData(airQualityApi);
  const response:string = constructResponseMessage(data);
  twiml.message(response);
  console.log(event.Body);
  callback(null, twiml);
};

const constructResponseMessage = (data:AirQuality):string => {
  const response = `${data.settings.node_name} sample at ${data.current.ts}
    \n\n Temp: ${data.current.tp} C
    \n Humidity: ${data.current.hm}%
    \n PM2.5: ${data.current.p2} ug/m^3
    \n CO2: ${data.current.co} ppm`
  return response;
}

const getAirQualityData = async (url: string): Promise<AxiosResponse<AirQuality>> => {
  const nodeData = await axios.get(url);
  console.log(nodeData.data);
  return nodeData;
}