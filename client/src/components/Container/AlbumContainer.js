import SongCard from "../Card/SongCard";

function AlbumContainer({data, user}) {
    return ( 
        <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
            {data && data.map((song, i) => (
                <SongCard key={song._id} data={song} index={i} type="album" user={user}/>
            ))}
        </div>
     );
}

export default AlbumContainer;