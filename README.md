# Weather app

Goals

- Write an app that shows current, future and past weather conditions using 3rd party apis
- Client-side only
- Utilises local storage/cookies to store user preferences
- React, redux
- Either styled components, reactstrap or material ui for the ui
- Semantic html

## APIs

OpenWeather
60 calls/min
1m calls/month
City name, id, lat/lon, zip,
Current weather
48h hourly forecast
5 day 3 hourly forecast
7 day daily forecast
5 day historical figures
Weather map overlays
Set weather triggers

Climacell
Current weather
6 hour forecast available minute by minute
nearterm forecast up to 96 hours
daily forecast up to 15 days with morning and evening breakdowns
detailed 6 hour historical figures
4 week historical figures

User stories

See the current weather in different locations

As a user,
So that I can see what weather different places is experiencing
I want to see the current weather at the location I choose

See forecasts at different 'distances'

As a user,
So that I can plan what I'm going to do in the future
I want to see the weather forecast at the location I choose

Compare weather between different locations

As a user,
So that I can plan my excursions,
I want to compare weather at different locations

Look at what the weather has been doing in the past

As a user,
To help me remember what I've been doing,
I want to see what the weather was at a particular location

Set triggers to warn if the weather is going to do something

As a user,
So that I can be warned if the weather does something unexpected,
I want to set triggers for specific locations

As a user,
So that I don't have to repeatedly type stuff in
I want to be able to store my favourite locations
