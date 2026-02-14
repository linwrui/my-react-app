import axios from 'axios';

export interface WeatherData {
  city: string;
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
  pressure: string;
  visibility: string;
  update_time: string;
  forecast: Array<{
    date: string;
    week: string;
    wea: string;
    wea_img: string;
    tem1: string;
    tem2: string;
  }>;
  life_index: {
    uv: string;
    uv_desc: string;
    dress: string;
    dress_desc: string;
    wash_car: string;
    wash_car_desc: string;
    travel: string;
    travel_desc: string;
    exercise: string;
    exercise_desc: string;
  };
}

export class WeatherService {
  private static readonly API_URL = '/weather/api';
  private static readonly APP_ID = '42734629';
  private static readonly APP_SECRET = 'MA2q7dbR';

  static async getWeatherData(): Promise<WeatherData> {
    const response = await axios.get(this.API_URL, {
      params: {
        version: 'v63',
        life: true,
        appid: this.APP_ID,
        appsecret: this.APP_SECRET,
      },
    });
    return this.transformData(response.data);
  }

  private static transformData(data: any): WeatherData {
    return {
      city: data.city || '',
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
      pressure: data.pressure || '',
      visibility: data.visibility || '',
      update_time: data.update_time || '',
      forecast: data.forecast || [],
      life_index: {
        uv: data.uv || '',
        uv_desc: data.uv_desc || '',
        dress: data.dress || '',
        dress_desc: data.dress_desc || '',
        wash_car: data.wash_car || '',
        wash_car_desc: data.wash_car_desc || '',
        travel: data.travel || '',
        travel_desc: data.travel_desc || '',
        exercise: data.exercise || '',
        exercise_desc: data.exercise_desc || '',
      },
    };
  }
}
