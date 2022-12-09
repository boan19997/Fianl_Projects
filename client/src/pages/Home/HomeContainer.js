import PlayCard from "../../components/Card/PlayCard";


function HomeContainer({data, rank}) {
    return ( 
        <div className="mb-4 min-w-full">
            <div className="grid grid-cols-5 gap-x-6">
                {data && data.map((song, i) => (
                    // <h1>{song._id}</h1>
                    <PlayCard key={song._id} data={song} index={i} id={song._id} rank={rank}/>
                ))}
            </div>
        </div>
     );
}

export default HomeContainer;
