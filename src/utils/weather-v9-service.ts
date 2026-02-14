import axios from 'axios';

export interface V9DailyForecast {
  date?: string;
  week?: string;
  wea?: string;
  wea_img?: string;
  tem1?: string;
  tem2?: string;
  win?: string;
  win_speed?: string;
  air?: string;
  air_level?: string;
  air_tips?: string;
  hours?: Array<{
    hours?: string;
    wea?: string;
    wea_img?: string;
    tem?: string;
    win?: string;
    win_speed?: string;
  }>;
  index?: Array<{
    title?: string;
    level?: string;
    desc?: string;
  }>;
  [key: string]: any;
}

export interface V9WeatherData {
  city?: string;
  cityid?: string;
  update_time?: string;
  forecast?: V9DailyForecast[];
  [key: string]: any;
}

export class WeatherV9Service {
  private static readonly API_URL = '/weather/api';
  private static readonly APP_ID = '42734629';
  private static readonly APP_SECRET = 'MA2q7dbR';

  static async getWeeklyForecast(): Promise<V9DailyForecast[]> {
    try {
      const response = await axios.get(this.API_URL, {
        params: {
          version: 'v9',
          unescape: 1,
          appid: this.APP_ID,
          appsecret: this.APP_SECRET,
        },
      });
      console.log('原始API数据(v9):', response.data);
      
      const forecast = this.extractForecast(response.data);
      console.log('提取的七日预报数据(v9):', forecast);
      
      return forecast;
    } catch (error) {
      console.error('获取 v9 七日预报失败:', error);
      return [];
    }
  }

  private static extractForecast(data: any): V9DailyForecast[] {
    if (!data) return [];

    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.forecast)) {
      return data.forecast;
    }

    if (Array.isArray(data.data)) {
      return data.data;
    }

    const possibleKeys = ['forecast', 'data', 'list', 'days'];
    for (const key of possibleKeys) {
      if (Array.isArray(data[key])) {
        return data[key];
      }
    }

    console.warn('无法从 v9 数据中提取七日预报:', data);
    return [];
  }
}
