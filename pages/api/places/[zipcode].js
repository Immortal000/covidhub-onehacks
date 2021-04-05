import axios from "axios";

export default async (req, res) => {
  let API_KEY = process.env.yelp;

  let yelpREST = axios.create({
    baseURL: "https://api.yelp.com/v3/",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-type": "application/json",
    },
  });

  yelpREST("/businesses/search", {
    params: {
      location: `${req.query.zipcode}`,
      term: "Convince Store",
      limit: 5,
    },
  }).then(({ data }) => {
    let { businesses } = data;
    let finalData = [];
    businesses.forEach((b) => {
      let newSearch = {
        name: b.name,
        address: `${b.location.address1}, ${b.location.city}`,
        url: `${b.url}`,
        contact: `${b.phone}`,
      };
      finalData.push(newSearch);
    });
    res.json({ data: finalData });
  });
};
