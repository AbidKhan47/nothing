import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Gallery = ({supabase, among}) => {
    const [members, setMembers] = useState([])
    useEffect(() => {
        const fetchCrew = async () => {
            const {data, error} = await supabase.from("Crewmates").select("*")
            setMembers(data)
        }
        fetchCrew()
    }, [supabase])
    return (
        <>
        <div className="ml-[176px] flex flex-col items-center">
            <h1 className='text-white font-bold text-center text-[40px] mx-16'>This is where you can see the crewmates you made</h1>
            <div className="flex justify-center flex-wrap">
                {members.length > 0 ? (
                            members.map((crew, index) => (
                                <div className="bg-white w-64 h-72 flex flex-col justify-center items-center mx-4 my-4 rounded-lg p-4" key={index}>
                                    <img className="w-40 h-40 mt-2" src={among[crew.color.toLowerCase()]} alt={`Crewmate ${crew.name}`} />
                                    <p>Name: {crew.name}</p>
                                    <p>Speed: {crew.speed}</p>
                                    <p>Sus? {crew.sus ? 'Yes' : 'No'}</p>
                                    <p>Color: {crew.color}</p>
                                    <Link to={`/update/${crew.id}`}>
                                        <button className="mb-6 bg-yellow-300 p-2 rounded-md">Update</button>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="flex flex-col">
                                    <h1 className="text-white font-bold text-lg mt-10">No crewmates found. Start adding some!</h1>
                                    <Link to='/create'>
                                                <button className="mb-6 mt-6 bg-yellow-300 p-2 rounded-md">Create!</button>
                                    </Link>
                                </div>
                            </>
                    )}
            </div>
        </div>
    </>
    
    
    )
}

/*
               
*/

export default Gallery