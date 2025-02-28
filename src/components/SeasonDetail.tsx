import { useEpisodes } from "@/hooks/useSerie";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function SerieDetail() {
  const { serieSlug, seasonNumber } = useParams();
  const { data: episodes } = useEpisodes(serieSlug, seasonNumber);

  return (
    <ul>
      {episodes.map((e) => (
        <li id={e._id}>{e.title}</li>
      ))}
    </ul>
  );
}
