require("dotenv").config();
require("./config/mongo").config();
const _ = require("lodash");

const Place = require("./models/Place");
const Extraction = require("./models/Extraction");
const Extractor = require("./services/Extractor");

const storePlaces = async (places) => {
  // Fetch existing places and filter new ones
  const existingPlaces = await Place.find();
  let newPlaces = places.filter(({ name }) => {
    return !existingPlaces.some((x) => x.name === name);
  });

  // Store new places
  if (newPlaces.length) {
    newPlaces = await Place.create(newPlaces);
  }

  return [...existingPlaces, ...newPlaces];
};

const main = async () => {
  // Extract COVID-19 data
  const items = await Extractor.extract();

  // Store and fetch places
  let places = items.map(({ place: name }) => ({ name }));
  places = await storePlaces(places);

  // Map places by their names
  const mappedPlaces = _.mapKeys(places, "name");

  // Finally, store extracted data
  items.forEach((item) => (item.place = mappedPlaces[item.place]._id));
  await Extraction.create(items);
};

main().then(process.exit);
