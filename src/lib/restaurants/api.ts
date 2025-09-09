import { GooglePlacesSearchApiResponse } from "@/types";
import { transformPlaceResults } from "./utils";

//近くのレストラン
export async function fetchRestaurants() {
  // throw new Error("test");
  const url = "https://places.googleapis.com/v1/places:searchNearby";

  const apiKey = process.env.GOOGLE_API_KEY;

  const header = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey!,
    "X-Goog-FieldMask":
      "places.displayName,places.id,places.primaryType,places.photos",
  };

  const desiredTypes = [
    "japanese_restaurant",
    "cafe",
    "cafeteria",
    "coffee_shop",
    "chinese_restaurant",
    "fast_food_restaurant",
    "hamburger_restaurant",
    "french_restaurant",
    "pizza_restaurant",
    "ramen_restaurant",
    "sushi_restaurant",
    "korean_restaurant",
    "indian_restaurant",
  ];

  const requestbody = {
    includedPrimaryTypes: desiredTypes,
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude: 35.666855, //시부야
          longitude: 139.6514156,
        },
        radius: 500.0,
      },
    },
    languageCode: "ja",
    rankPreference: "DISTANCE",
  };

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(requestbody),
    headers: header,
    next: { revalidate: 86400 }, //24時間キャッシュ更新
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error();
    return { error: `NearbySearch fail:${response.status}` };
  }

  const data: GooglePlacesSearchApiResponse = await response.json();
  console.log(data);

  if (!data.places) {
    return { data: [] };
  }
  const nearbyPlaces = data.places;

  const matchingPlaces = nearbyPlaces.filter(
    (place) => place.primaryType && desiredTypes.includes(place.primaryType)
  );

  const Restaurants = await transformPlaceResults(matchingPlaces);
  console.log(Restaurants);

  return { data: Restaurants };
}

// 近くのラーメン店
export async function fetchRamenRestaurants() {
  const url = "https://places.googleapis.com/v1/places:searchNearby";

  const apiKey = process.env.GOOGLE_API_KEY;

  const header = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey!,
    "X-Goog-FieldMask":
      "places.displayName,places.id,places.primaryType,places.photos",
  };

  const requestbody = {
    includedPrimaryTypes: ["ramen_restaurant"],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude: 35.666855, //시부야
          longitude: 139.6514156,
        },
        radius: 500.0,
      },
    },
    languageCode: "ja",
    rankPreference: "DISTANCE",
  };

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(requestbody),
    headers: header,
    next: { revalidate: 86400 }, //24時間キャッシュ更新
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error();
    return { error: `NearbySearch fail:${response.status}` };
  }

  const data: GooglePlacesSearchApiResponse = await response.json();
  console.log(data);

  if (!data.places) {
    return { data: [] };
  }
  const nearbyRamenPlaces = data.places;

  const RamenRestaurants = await transformPlaceResults(nearbyRamenPlaces);
  console.log(RamenRestaurants);

  return { data: RamenRestaurants };
}

// カテゴリ検索機能
export async function fetchCategoryRestaurants(category: string) {
  const url = "https://places.googleapis.com/v1/places:searchNearby";

  const apiKey = process.env.GOOGLE_API_KEY;

  const header = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey!,
    "X-Goog-FieldMask":
      "places.displayName,places.id,places.primaryType,places.photos",
  };

  const requestbody = {
    includedPrimaryTypes: [category],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude: 35.666855, //시부야
          longitude: 139.6514156,
        },
        radius: 500.0,
      },
    },
    languageCode: "ja",
    rankPreference: "DISTANCE",
  };

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(requestbody),
    headers: header,
    next: { revalidate: 86400 }, //24時間キャッシュ更新
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error();
    return { error: `NearbySearch fail:${response.status}` };
  }

  const data: GooglePlacesSearchApiResponse = await response.json();
  console.log(data);

  if (!data.places) {
    return { data: [] };
  }
  const categoryPlaces = data.places;

  const categoryRestaurants = await transformPlaceResults(categoryPlaces);
  console.log(categoryRestaurants);

  return { data: categoryRestaurants };
}

export async function getPhotoUrl(name: string, maxWidth = 400) {
  "use cache";
  console.log("getPhotoUrl実行");
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://places.googleapis.com/v1/${name}/media?key=${apiKey}&maxWidthPx=${maxWidth}`;

  return url;
}
