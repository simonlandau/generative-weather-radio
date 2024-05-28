# Generative Weather Radio

Generative Weather Radio is a web app which uses the OpenWeather API and OpenAI's GPT3.5 and TTS model to generate audio weather reports for any city.

## Running the Application

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:
* OPENWEATHER_API_KEY=your_key_goes_here
* OPENAI_API_KEY=your_key_goes_here

## Backlog

- [ ] clean weather data (round tempatures, remove unused data, fix time data, etc.)
- [ ] clean air quality data (remove unused data, etc.)
- [ ] explore other api endpoints for expanding report (news, traffic, sports, etc.)
- [ ] deploy to Vercel (set up sentry for error tracking?)
- [ ] uses google places api for location input autocomplete?
- [ ] build custom audio player component?
- [ ] clerk user authentication?

