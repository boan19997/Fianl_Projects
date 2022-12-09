import SongCard from "../Card/SongCard";

function SongContainer({data}) {
    return ( 
        <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
            {data && data.map((song, i) => (
                <SongCard key={song._id} data={song} index={i} type="song" />
            ))}
        </div>
     );
}

export default SongContainer;