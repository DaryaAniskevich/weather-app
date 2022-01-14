export const setFavoriteCitiesType = "SET_FAVORITE_CITIES";

export const setFavoriteCities = (city) => ({
  type: setFavoriteCitiesType,
  payload: city,
});
