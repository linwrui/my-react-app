import axios from 'axios';

export interface HourlyData {
  hours: string;
  wea: string;
  wea_img: string;
  tem: string;
  win: string;
  win_speed: string;
  air_level: string;
  aqi: string;
}

export interface AirQualityData {
  aqi: string;
  aqi_level: string;
  aqi_desc: string;
  pm25: string;
  pm10: string;
  o3: string;
  no2: string;
  so2: string;
  co: string;
  kouzhao: string;
  yundong: string;
  kaichuang: string;
  jinghuaqi: string;
}

export interface AlertData {
  alert_title: string;
  alert_level: string;
  alert_type: string;
  alert_content: string;
}

export interface DailyForecast {
  date: string;
  week: string;
  wea: string;
  wea_img: string;
  tem1: string;
  tem2: string;
  win: string;
  win_speed: string;
  air: string;
  air_level: string;
  air_tips: string;
  hours: HourlyData[];
  index: Array<{
    title: string;
    level: string;
    desc: string;
  }>;
}

export interface WeatherData {
  city: string;
  cityid: string;
  wea: string;
  wea_img: string;
  tem: string;
  tem1: string;
  tem2: string;
  humidity: string;
  win: string;
  win_speed: string;
  win_meter: string;
  air: string;
  air_level: string;
  air_tips: string;
  pressure: string;
  visibility: string;
  sun_rise: string;
  sun_set: string;
  update_time: string;
  forecast: DailyForecast[];
  hourly: HourlyData[];
  air_quality: AirQualityData;
  alerts: AlertData[];
  uv: string;
  uv_desc: string;
  rain: string;
}

export class WeatherService {
  private static readonly API_URL = '/weather/api';
  private static readonly APP_ID = '42734629';
  private static readonly APP_SECRET = 'MA2q7dbR';

  static async getWeatherData(): Promise<WeatherData> {
    const response = await axios.get(this.API_URL, {
      params: {
        version: 'v63',
        unescape: 1,
        appid: this.APP_ID,
        appsecret: this.APP_SECRET,
      },
    });
    console.log('原始API数据(v63):', response.data);
    const transformedData = this.transformData(response.data);
    console.log('转换后的数据(v63):', transformedData);
    return transformedData;
  }

  private static transformData(data: any): WeatherData {
    const hours = data.hours || data.hourly || [];
    const dailyForecast = (data.forecast || []).map((day: any) => ({
      ...day,
      hours: day.hours || [],
      index: day.index || day.indexes || [],
    }));

    return {
      city: data.city || '',
      cityid: data.cityid || '',
      wea: data.wea || '',
      wea_img: data.wea_img || '',
      tem: data.tem || '',
      tem1: data.tem1 || '',
      tem2: data.tem2 || '',
      humidity: data.humidity || '',
      win: data.win || '',
      win_speed: data.win_speed || '',
      win_meter: data.win_meter || '',
      air: data.air || '',
      air_level: data.air_level || '',
      air_tips: data.air_tips || '',
      pressure: data.pressure || '',
      visibility: data.visibility || '',
      sun_rise: data.sun_rise || data.sunrise || '',
      sun_set: data.sun_set || data.sunset || '',
      update_time: data.update_time || '',
      forecast: dailyForecast,
      hourly: hours,
      air_quality: {
        aqi: data.air || data.aqi || '',
        aqi_level: data.air_level || data.aqi_level || '',
        aqi_desc: data.air_tips || data.aqi_desc || '',
        pm25: data.pm25 || '',
        pm10: data.pm10 || '',
        o3: data.o3 || '',
        no2: data.no2 || '',
        so2: data.so2 || '',
        co: data.co || '',
        kouzhao: data.kouzhao || '',
        yundong: data.yundong || '',
        kaichuang: data.kaichuang || '',
        jinghuaqi: data.jinghuaqi || '',
      },
      alerts: data.alert || data.alerts || [],
      uv: data.uv || '',
      uv_desc: data.uv_desc || '',
      rain: data.rain || '',
    };
  }
}
