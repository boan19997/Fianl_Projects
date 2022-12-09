import PlayCardPlayList from "../../components/Card/PlayCardPlayList";


function PlayListContainer({data}) {
    return ( 
        <div className="mb-4 min-w-full">
            <div className="grid grid-cols-5 gap-x-6">
                {data && data.map((song, i) => (
                    // <h1>{song._id}</h1>
                    <PlayCardPlayList key={song._id} data={song} index={i}/>
                ))}
            </div>
        </div>
     );
}

export default PlayListContainer;
