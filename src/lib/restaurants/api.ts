export async function fetchRamenRestaurants() {
  const url = "https://places.googleapis.com/v1/places:searchNearby";

  const apiKey = process.env.GOOGLE_API_KEY;

  const header = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey!,
    "X-Goog-FieldMask":
      "places.displayName,places.id,places.types,places.primaryType,places.photos",
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
  });

  const data = await response.json();
  console.log(data);
}
