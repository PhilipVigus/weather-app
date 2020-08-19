const londondWeatherForecast = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1597827600,
      main: {
        temp: 292.08,
        feels_like: 290.74,
        temp_min: 292.08,
        temp_max: 293.06,
        pressure: 1005,
        sea_level: 1004,
        grnd_level: 1002,
        humidity: 82,
        temp_kf: -0.98
      },
      weather: [
        { id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" }
      ],
      clouds: { all: 100 },
      wind: { speed: 4.64, deg: 169 },
      visibility: 10000,
      pop: 0.36,
      sys: { pod: "d" },
      dt_txt: "2020-08-19 09:00:00"
    },
    {
      dt: 1597838400,
      main: {
        temp: 292.85,
        feels_like: 290.56,
        temp_min: 292.85,
        temp_max: 293.32,
        pressure: 1004,
        sea_level: 1003,
        grnd_level: 1000,
        humidity: 78,
        temp_kf: -0.47
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" }
      ],
      clouds: { all: 100 },
      wind: { speed: 5.98, deg: 159 },
      visibility: 10000,
      pop: 0.8,
      rain: { "3h": 2.62 },
      sys: { pod: "d" },
      dt_txt: "2020-08-19 12:00:00"
    },
    {
      dt: 1597849200,
      main: {
        temp: 291.99,
        feels_like: 289.57,
        temp_min: 291.99,
        temp_max: 292.05,
        pressure: 1001,
        sea_level: 1001,
        grnd_level: 999,
        humidity: 85,
        temp_kf: -0.06
      },
      weather: [
        { id: 501, main: "Rain", description: "moderate rain", icon: "10d" }
      ],
      clouds: { all: 100 },
      wind: { speed: 6.44, deg: 168 },
      visibility: 10000,
      pop: 1,
      rain: { "3h": 4.07 },
      sys: { pod: "d" },
      dt_txt: "2020-08-19 15:00:00"
    },
    {
      dt: 1597860000,
      main: {
        temp: 293.1,
        feels_like: 291.67,
        temp_min: 293.1,
        temp_max: 293.12,
        pressure: 1000,
        sea_level: 1000,
        grnd_level: 997,
        humidity: 84,
        temp_kf: -0.02
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" }
      ],
      clouds: { all: 100 },
      wind: { speed: 5.54, deg: 187 },
      visibility: 10000,
      pop: 1,
      rain: { "3h": 0.62 },
      sys: { pod: "d" },
      dt_txt: "2020-08-19 18:00:00"
    },
    {
      dt: 1597870800,
      main: {
        temp: 293.19,
        feels_like: 292.8,
        temp_min: 293.19,
        temp_max: 293.19,
        pressure: 1000,
        sea_level: 1000,
        grnd_level: 997,
        humidity: 87,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" }
      ],
      clouds: { all: 99 },
      wind: { speed: 4.43, deg: 191 },
      visibility: 10000,
      pop: 0.31,
      rain: { "3h": 0.22 },
      sys: { pod: "n" },
      dt_txt: "2020-08-19 21:00:00"
    },
    {
      dt: 1597881600,
      main: {
        temp: 293.85,
        feels_like: 292.02,
        temp_min: 293.85,
        temp_max: 293.85,
        pressure: 999,
        sea_level: 999,
        grnd_level: 996,
        humidity: 84,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: "Clouds", description: "overcast clouds", icon: "04n" }
      ],
      clouds: { all: 100 },
      wind: { speed: 6.54, deg: 189 },
      visibility: 10000,
      pop: 0.22,
      sys: { pod: "n" },
      dt_txt: "2020-08-20 00:00:00"
    },
    {
      dt: 1597892400,
      main: {
        temp: 292.97,
        feels_like: 288.29,
        temp_min: 292.97,
        temp_max: 292.97,
        pressure: 1000,
        sea_level: 1000,
        grnd_level: 997,
        humidity: 61,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" }
      ],
      clouds: { all: 100 },
      wind: { speed: 7.6, deg: 231 },
      visibility: 10000,
      pop: 0.39,
      rain: { "3h": 0.23 },
      sys: { pod: "n" },
      dt_txt: "2020-08-20 03:00:00"
    },
    {
      dt: 1597903200,
      main: {
        temp: 289.96,
        feels_like: 286.75,
        temp_min: 289.96,
        temp_max: 289.96,
        pressure: 1002,
        sea_level: 1002,
        grnd_level: 1000,
        humidity: 65,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }
      ],
      clouds: { all: 67 },
      wind: { speed: 4.73, deg: 235 },
      visibility: 10000,
      pop: 0.21,
      sys: { pod: "d" },
      dt_txt: "2020-08-20 06:00:00"
    },
    {
      dt: 1597914000,
      main: {
        temp: 292.76,
        feels_like: 290.28,
        temp_min: 292.76,
        temp_max: 292.76,
        pressure: 1004,
        sea_level: 1004,
        grnd_level: 1001,
        humidity: 55,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
      ],
      clouds: { all: 0 },
      wind: { speed: 3.73, deg: 208 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-20 09:00:00"
    },
    {
      dt: 1597924800,
      main: {
        temp: 296.35,
        feels_like: 291.62,
        temp_min: 296.35,
        temp_max: 296.35,
        pressure: 1005,
        sea_level: 1005,
        grnd_level: 1002,
        humidity: 36,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
      ],
      clouds: { all: 0 },
      wind: { speed: 5.86, deg: 202 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-20 12:00:00"
    },
    {
      dt: 1597935600,
      main: {
        temp: 296.43,
        feels_like: 292.05,
        temp_min: 296.43,
        temp_max: 296.43,
        pressure: 1004,
        sea_level: 1004,
        grnd_level: 1001,
        humidity: 42,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
      ],
      clouds: { all: 0 },
      wind: { speed: 6.19, deg: 198 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-20 15:00:00"
    },
    {
      dt: 1597946400,
      main: {
        temp: 295.42,
        feels_like: 292.55,
        temp_min: 295.42,
        temp_max: 295.42,
        pressure: 1003,
        sea_level: 1003,
        grnd_level: 1001,
        humidity: 55,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
      ],
      clouds: { all: 0 },
      wind: { speed: 5.34, deg: 183 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-20 18:00:00"
    },
    {
      dt: 1597957200,
      main: {
        temp: 294.24,
        feels_like: 291.4,
        temp_min: 294.24,
        temp_max: 294.24,
        pressure: 1003,
        sea_level: 1003,
        grnd_level: 1001,
        humidity: 60,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" }
      ],
      clouds: { all: 2 },
      wind: { speed: 5.4, deg: 192 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2020-08-20 21:00:00"
    },
    {
      dt: 1597968000,
      main: {
        temp: 293.21,
        feels_like: 289.76,
        temp_min: 293.21,
        temp_max: 293.21,
        pressure: 1004,
        sea_level: 1004,
        grnd_level: 1001,
        humidity: 66,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03n"
        }
      ],
      clouds: { all: 31 },
      wind: { speed: 6.5, deg: 207 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2020-08-21 00:00:00"
    },
    {
      dt: 1597978800,
      main: {
        temp: 291.46,
        feels_like: 288.07,
        temp_min: 291.46,
        temp_max: 291.46,
        pressure: 1003,
        sea_level: 1003,
        grnd_level: 1001,
        humidity: 74,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" }
      ],
      clouds: { all: 9 },
      wind: { speed: 6.45, deg: 208 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2020-08-21 03:00:00"
    },
    {
      dt: 1597989600,
      main: {
        temp: 291.54,
        feels_like: 286.87,
        temp_min: 291.54,
        temp_max: 291.54,
        pressure: 1004,
        sea_level: 1004,
        grnd_level: 1001,
        humidity: 68,
        temp_kf: 0
      },
      weather: [
        { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
      ],
      clouds: { all: 17 },
      wind: { speed: 7.72, deg: 211 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-21 06:00:00"
    },
    {
      dt: 1598000400,
      main: {
        temp: 294.08,
        feels_like: 288.45,
        temp_min: 294.08,
        temp_max: 294.08,
        pressure: 1005,
        sea_level: 1005,
        grnd_level: 1003,
        humidity: 54,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
      ],
      clouds: { all: 5 },
      wind: { speed: 8.62, deg: 211 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-21 09:00:00"
    },
    {
      dt: 1598011200,
      main: {
        temp: 294.45,
        feels_like: 288.76,
        temp_min: 294.45,
        temp_max: 294.45,
        pressure: 1006,
        sea_level: 1006,
        grnd_level: 1003,
        humidity: 54,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d"
        }
      ],
      clouds: { all: 33 },
      wind: { speed: 8.84, deg: 214 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-21 12:00:00"
    },
    {
      dt: 1598022000,
      main: {
        temp: 295.1,
        feels_like: 289.56,
        temp_min: 295.1,
        temp_max: 295.1,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 1004,
        humidity: 56,
        temp_kf: 0
      },
      weather: [
        { id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" }
      ],
      clouds: { all: 88 },
      wind: { speed: 9.14, deg: 220 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-21 15:00:00"
    },
    {
      dt: 1598032800,
      main: {
        temp: 294.17,
        feels_like: 289.04,
        temp_min: 294.17,
        temp_max: 294.17,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 1004,
        humidity: 58,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }
      ],
      clouds: { all: 57 },
      wind: { speed: 8.41, deg: 220 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-21 18:00:00"
    },
    {
      dt: 1598043600,
      main: {
        temp: 292.02,
        feels_like: 287.97,
        temp_min: 292.02,
        temp_max: 292.02,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 1006,
        humidity: 70,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" }
      ],
      clouds: { all: 0 },
      wind: { speed: 7.24, deg: 221 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2020-08-21 21:00:00"
    },
    {
      dt: 1598054400,
      main: {
        temp: 291.42,
        feels_like: 287.83,
        temp_min: 291.42,
        temp_max: 291.42,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 1006,
        humidity: 72,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" }
      ],
      clouds: { all: 2 },
      wind: { speed: 6.52, deg: 222 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2020-08-22 00:00:00"
    },
    {
      dt: 1598065200,
      main: {
        temp: 290.87,
        feels_like: 287.7,
        temp_min: 290.87,
        temp_max: 290.87,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 1006,
        humidity: 73,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03n"
        }
      ],
      clouds: { all: 34 },
      wind: { speed: 5.78, deg: 227 },
      visibility: 10000,
      pop: 0.04,
      sys: { pod: "n" },
      dt_txt: "2020-08-22 03:00:00"
    },
    {
      dt: 1598076000,
      main: {
        temp: 290.26,
        feels_like: 286.67,
        temp_min: 290.26,
        temp_max: 290.26,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 1007,
        humidity: 73,
        temp_kf: 0
      },
      weather: [
        { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
      ],
      clouds: { all: 16 },
      wind: { speed: 6.12, deg: 230 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-22 06:00:00"
    },
    {
      dt: 1598086800,
      main: {
        temp: 293,
        feels_like: 288.7,
        temp_min: 293,
        temp_max: 293,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 1008,
        humidity: 58,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }
      ],
      clouds: { all: 53 },
      wind: { speed: 6.75, deg: 241 },
      visibility: 10000,
      pop: 0.14,
      sys: { pod: "d" },
      dt_txt: "2020-08-22 09:00:00"
    },
    {
      dt: 1598097600,
      main: {
        temp: 295.32,
        feels_like: 290.71,
        temp_min: 295.32,
        temp_max: 295.32,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 1009,
        humidity: 49,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" }
      ],
      clouds: { all: 53 },
      wind: { speed: 7.02, deg: 248 },
      visibility: 10000,
      pop: 0.7,
      rain: { "3h": 0.65 },
      sys: { pod: "d" },
      dt_txt: "2020-08-22 12:00:00"
    },
    {
      dt: 1598108400,
      main: {
        temp: 295.78,
        feels_like: 291.1,
        temp_min: 295.78,
        temp_max: 295.78,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1010,
        humidity: 47,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" }
      ],
      clouds: { all: 51 },
      wind: { speed: 7.04, deg: 252 },
      visibility: 10000,
      pop: 0.68,
      rain: { "3h": 0.52 },
      sys: { pod: "d" },
      dt_txt: "2020-08-22 15:00:00"
    },
    {
      dt: 1598119200,
      main: {
        temp: 293.52,
        feels_like: 288.52,
        temp_min: 293.52,
        temp_max: 293.52,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1010,
        humidity: 46,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" }
      ],
      clouds: { all: 53 },
      wind: { speed: 6.6, deg: 264 },
      visibility: 10000,
      pop: 0.59,
      rain: { "3h": 0.4 },
      sys: { pod: "d" },
      dt_txt: "2020-08-22 18:00:00"
    },
    {
      dt: 1598130000,
      main: {
        temp: 290.8,
        feels_like: 286.44,
        temp_min: 290.8,
        temp_max: 290.8,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 1012,
        humidity: 57,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03n"
        }
      ],
      clouds: { all: 31 },
      wind: { speed: 5.92, deg: 260 },
      visibility: 10000,
      pop: 0.19,
      sys: { pod: "n" },
      dt_txt: "2020-08-22 21:00:00"
    },
    {
      dt: 1598140800,
      main: {
        temp: 289.33,
        feels_like: 285.68,
        temp_min: 289.33,
        temp_max: 289.33,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1012,
        humidity: 67,
        temp_kf: 0
      },
      weather: [
        { id: 801, main: "Clouds", description: "few clouds", icon: "02n" }
      ],
      clouds: { all: 15 },
      wind: { speed: 5.3, deg: 249 },
      visibility: 10000,
      pop: 0.13,
      sys: { pod: "n" },
      dt_txt: "2020-08-23 00:00:00"
    },
    {
      dt: 1598151600,
      main: {
        temp: 288.3,
        feels_like: 284.71,
        temp_min: 288.3,
        temp_max: 288.3,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1011,
        humidity: 72,
        temp_kf: 0
      },
      weather: [
        { id: 801, main: "Clouds", description: "few clouds", icon: "02n" }
      ],
      clouds: { all: 14 },
      wind: { speed: 5.25, deg: 240 },
      visibility: 10000,
      pop: 0.12,
      sys: { pod: "n" },
      dt_txt: "2020-08-23 03:00:00"
    },
    {
      dt: 1598162400,
      main: {
        temp: 288.16,
        feels_like: 285.21,
        temp_min: 288.16,
        temp_max: 288.16,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1012,
        humidity: 78,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" }
      ],
      clouds: { all: 36 },
      wind: { speed: 4.76, deg: 259 },
      visibility: 10000,
      pop: 0.2,
      rain: { "3h": 0.18 },
      sys: { pod: "d" },
      dt_txt: "2020-08-23 06:00:00"
    },
    {
      dt: 1598173200,
      main: {
        temp: 291.63,
        feels_like: 288.98,
        temp_min: 291.63,
        temp_max: 291.63,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 1013,
        humidity: 62,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }
      ],
      clouds: { all: 66 },
      wind: { speed: 4.27, deg: 291 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-23 09:00:00"
    },
    {
      dt: 1598184000,
      main: {
        temp: 294.03,
        feels_like: 290.53,
        temp_min: 294.03,
        temp_max: 294.03,
        pressure: 1017,
        sea_level: 1017,
        grnd_level: 1014,
        humidity: 49,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }
      ],
      clouds: { all: 65 },
      wind: { speed: 4.97, deg: 298 },
      visibility: 10000,
      pop: 0.17,
      sys: { pod: "d" },
      dt_txt: "2020-08-23 12:00:00"
    },
    {
      dt: 1598194800,
      main: {
        temp: 294.59,
        feels_like: 291.76,
        temp_min: 294.59,
        temp_max: 294.59,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 1014,
        humidity: 44,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }
      ],
      clouds: { all: 56 },
      wind: { speed: 3.62, deg: 304 },
      visibility: 10000,
      pop: 0.19,
      sys: { pod: "d" },
      dt_txt: "2020-08-23 15:00:00"
    },
    {
      dt: 1598205600,
      main: {
        temp: 293.03,
        feels_like: 290.49,
        temp_min: 293.03,
        temp_max: 293.03,
        pressure: 1017,
        sea_level: 1017,
        grnd_level: 1014,
        humidity: 51,
        temp_kf: 0
      },
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10d" }
      ],
      clouds: { all: 70 },
      wind: { speed: 3.48, deg: 308 },
      visibility: 10000,
      pop: 0.27,
      rain: { "3h": 0.12 },
      sys: { pod: "d" },
      dt_txt: "2020-08-23 18:00:00"
    },
    {
      dt: 1598216400,
      main: {
        temp: 291.25,
        feels_like: 289.32,
        temp_min: 291.25,
        temp_max: 291.25,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 1015,
        humidity: 58,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04n" }
      ],
      clouds: { all: 54 },
      wind: { speed: 2.71, deg: 305 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2020-08-23 21:00:00"
    },
    {
      dt: 1598227200,
      main: {
        temp: 289.51,
        feels_like: 287.19,
        temp_min: 289.51,
        temp_max: 289.51,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 1015,
        humidity: 56,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03n"
        }
      ],
      clouds: { all: 31 },
      wind: { speed: 2.5, deg: 330 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2020-08-24 00:00:00"
    },
    {
      dt: 1598238000,
      main: {
        temp: 288.48,
        feels_like: 286.62,
        temp_min: 288.48,
        temp_max: 288.48,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 1015,
        humidity: 57,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04n" }
      ],
      clouds: { all: 52 },
      wind: { speed: 1.62, deg: 316 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2020-08-24 03:00:00"
    },
    {
      dt: 1598248800,
      main: {
        temp: 288.29,
        feels_like: 286.77,
        temp_min: 288.29,
        temp_max: 288.29,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 1015,
        humidity: 60,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }
      ],
      clouds: { all: 51 },
      wind: { speed: 1.32, deg: 259 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2020-08-24 06:00:00"
    }
  ],
  city: {
    id: 2643743,
    name: "London",
    coord: { lat: 51.5085, lon: -0.1257 },
    country: "GB",
    population: 1000000,
    timezone: 3600,
    sunrise: 1597812784,
    sunset: 1597864522
  }
};

export default londondWeatherForecast;
