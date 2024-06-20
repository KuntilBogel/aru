//Copyright (c) 2024
//Epik coder
// Don't remove this, please give credit 


import axios from "axios";
import fs from 'fs'
import cjson from './character.json'
let mdata : object[] = cjson
console.log(mdata.length)
for (let i = 0; i < 7; i++) {
  await run(i)
}
console.log(mdata.length)

async function run(index: Number) {
  const { data: apiresp } = await axios.post<ServerResponse>(
    "https://graphql.anilist.co/",
    {
      query: `query ($page: Int = ${index}, $id: Int, $type: MediaType, $isAdult: Boolean = true, $search: String, $format: [MediaFormat], $status: MediaStatus, $countryOfOrigin: CountryCode, $source: MediaSource, $season: MediaSeason, $seasonYear: Int, $year: String, $onList: Boolean, $yearLesser: FuzzyDateInt, $yearGreater: FuzzyDateInt, $episodeLesser: Int, $episodeGreater: Int, $durationLesser: Int, $durationGreater: Int, $chapterLesser: Int, $chapterGreater: Int, $volumeLesser: Int, $volumeGreater: Int, $licensedBy: [Int], $isLicensed: Boolean, $genres: [String], $excludedGenres: [String], $tags: [String], $excludedTags: [String], $minimumTagRank: Int, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {\n  Page(page: $page, perPage: 2000) {\n    media(id: $id, type: $type, season: $season, format_in: $format, status: $status, countryOfOrigin: $countryOfOrigin, source: $source, search: $search, onList: $onList, seasonYear: $seasonYear, startDate_like: $year, startDate_lesser: $yearLesser, startDate_greater: $yearGreater, episodes_lesser: $episodeLesser, episodes_greater: $episodeGreater, duration_lesser: $durationLesser, duration_greater: $durationGreater, chapters_lesser: $chapterLesser, chapters_greater: $chapterGreater, volumes_lesser: $volumeLesser, volumes_greater: $volumeGreater, licensedById_in: $licensedBy, isLicensed: $isLicensed, genre_in: $genres, genre_not_in: $excludedGenres, tag_in: $tags, tag_not_in: $excludedTags, minimumTagRank: $minimumTagRank, sort: $sort, isAdult: $isAdult) {\n      title {\n        userPreferred\n      }\n      characters {\n        edges {\n          node {\n            image {\n              large\n              medium\n            }\n            name {\n              first\n              middle\n              last\n              full\n              native\n              userPreferred\n            }\n          }\n        }\n      }\n    }\n  }\n}\n`,
      variables: null,
    },
    {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        origin: "https://anilist.co",
        pragma: "no-cache",
        priority: "u=1, i",
        referer: "https://anilist.co/",
        "sec-ch-ua":
          '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      },
    }
  );
  console.log(apiresp)
  let data = apiresp.data.Page.media;
  data.forEach(x => {
    let title = x.title
    x.characters.edges.forEach(edge => {
      const node = edge.node
      mdata.push({
        name: node.name,
        image: node.image.large || node.image.medium,
        title: title.userPreferred,
      })
    });
  })
  fs.writeFileSync("./character.json", JSON.stringify(mdata, undefined, " "))
}


export interface ServerResponse {
  data: Welcome5;
}
export interface Welcome5 {
  Page: Page;
}

export interface Page {
  media: Media[];
}

export interface Media {
  title: Title;
  characters: Characters;
}

export interface Characters {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  image: Image;
  name: Name;
}

export interface Image {
  large: string;
  medium: string;
}

export interface Name {
  first: null | string;
  middle: null | string;
  last: null | string;
  full: string;
  native: null | string;
  userPreferred: string;
}

export interface Title {
  userPreferred: string;
}
