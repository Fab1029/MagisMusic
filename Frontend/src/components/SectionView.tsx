import {
  getMostPopularAlbums,
  getMostPopularArtists,
  getMostPopularPlayLists,
  getMostPopularTracks
} from "@/services/deezer.service";
import { filters } from "@/store/useSearchStore";
import { useQuery } from "@tanstack/react-query";
import GridPanel from "./GridPanel";
import { useLocation } from "react-router-dom";

const SectionView = () => {
  const filter = useLocation().pathname.split('/')[2];


  const handleQuery = (limit: number = 25) => {
    switch (filter) {
      case filters[1]:
        return  getMostPopularTracks(limit);
      case filters[2]:
        return  getMostPopularArtists(limit);
      case filters[3]:
        return  getMostPopularAlbums(limit);
      case filters[4]:
        return  getMostPopularPlayLists(limit);
      default:
        return [];
    }
  };

  const data = useQuery({
    queryKey: ["dataContentView", filter],
    queryFn: () => handleQuery(),
  });

  return (
    <div className="gap-5 flex flex-col">
      <h1 className="font-bold text-3xl capitalize">{filter}</h1>
      <GridPanel data={data} isProfile={filter === filters[2]} />
    </div>
  );
};

export default SectionView;
