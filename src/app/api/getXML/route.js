

import xml2js from "xml2js";

let urlStorage = {
  url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
};

export async function PUT(request) {
  try {
    const data = await request.json();

    if (data && typeof data.url === "string") {
      urlStorage.url = `${data.url}?nocache=${Date.now()}`;
      return new Response("URL updated successfully", { status: 200 });
    } else {
      return new Response("Invalid input data", { status: 400 });
    }
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

export async function GET() {
  // let url = hardCodedURL;
  const url = urlStorage.url;
  const response = await fetch(url);
  const xmlData = await response.text();
  const jsonData = await xml2js.parseStringPromise(xmlData, {
    explicitArray: false,
    mergeAttrs: true,
  });

  return new Response(JSON.stringify(jsonData));
}

