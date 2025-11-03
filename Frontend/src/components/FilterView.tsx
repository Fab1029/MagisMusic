import { filters, useSearchStore } from "@/store/useSearchStore"
import Filter from "./Filter"
import { CustomTable } from "./CustomTable";
import GridPanel from "./GridPanel";
import FilterGeneralPanel from "./FilterGeneralPanel";
import { useQueries } from "@tanstack/react-query";
import { getSearchAlbumnsByQuery, getSearchArtistsByQuery, getSearchPlayListsByQuery, getSearchTracksByQuery } from "@/services/deezer.service";
import { columns } from "@/models/Track";
import CustomTableSkeleton from "./CustomTableSkeleton";

function FilterView() {
  const { query } = useSearchStore();
  const { filter } = useSearchStore();
  
  const results = useQueries({
    queries: [
      {
        queryKey: ["searchTracks", query],
        queryFn: () => getSearchTracksByQuery(query),
      },
      {
        queryKey: ["searchArtists", query],
        queryFn: () => getSearchArtistsByQuery(query),
      },
      {
        queryKey: ["searchAlbums", query],
        queryFn: () => getSearchAlbumnsByQuery(query),
      },
      {
        queryKey: ["searchPlaylists", query],
        queryFn: () => getSearchPlayListsByQuery(query),
      },
    ],
  });

  const [tracks, artists, albums, playlists] = results;

  const handleView = () => {
    switch(filter) {
      case filters[1]:
        if (!tracks.isLoading && tracks.data)
          return <CustomTable columns={columns} data={tracks.data.map((item:any) => ({...item}) )}/>
        else
          return <CustomTableSkeleton rowsNumber={25}/>
          
      case filters[2]:
        return <GridPanel data={artists} isProfile/>
      
      case filters[3]:
        return <GridPanel data={albums}/>
      
      case filters[4]:
        return <GridPanel data={playlists}/>
      
      default:
        return <FilterGeneralPanel tracks={tracks} albums={albums} artists={artists} playlists={playlists}/>
    }      
  }

  return (
    <div className="gap-2 flex flex-col">
      <Filter/>
      {handleView()}
    </div>
  )
}

export default FilterView