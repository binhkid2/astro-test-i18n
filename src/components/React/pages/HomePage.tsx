import React, { useEffect, useState } from "react";
import { SearchBar } from "@components/React/SearchBar";
import { HottestNewsWidget } from "@components/React/HottestNewsWidget";
import { WeatherWidget } from "@components/React/WeatherWidget";
import { WelcomeSection } from "@components/React/WelcomeSection";
import { CurrencyWidget } from "@components/React/CurrencyWidget";
import { DictionaryWidget } from "@components/React/DictionaryWidget";
import { QuickLinks } from "@components/React/QuickLinks";
import { ContentGrid } from "@components/React/ContentGrid";

export const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [locationPermission, setLocationPermission] = useState<"prompt" | "granted" | "denied">("prompt");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, [currentTime]);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission("granted");
          console.log("Location:", position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setLocationPermission("denied");
          console.error("Location error:", error);
        }
      );
    }
  };

  return (
    <main className="relative z-10 px-6 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <WelcomeSection currentTime={currentTime} greeting={greeting} />
          <WeatherWidget
            weatherData={{
              location: "Tokyo, Japan",
              temperature: 22,
              condition: "Partly Cloudy",
              humidity: 65,
              windSpeed: 12,
              visibility: 10,
              icon: "⛅",
            }}
            locationPermission={locationPermission}
            onRequestLocation={requestLocation}
          />
        </div>

        <SearchBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div data-widget="news">
            <HottestNewsWidget />
          </div>
          <CurrencyWidget />
          <div data-widget="dictionary">
            <DictionaryWidget />
          </div>
        </div>

        <QuickLinks />
        <ContentGrid />
      </div>
    </main>
  );
};

export default HomePage;
