import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Update = ({ supabase, among }) => {
const navigate = useNavigate();
const params = useParams();
const [formData, setFormData] = useState({
    name: '',
    speed: 0,
    sus: false,
    color: ''
});
const [pic, setPic] = useState("src/sus/crewmate-1.ce385016.png");
const [showDeleteAnimation, setShowDeleteAnimation] = useState(false);

useEffect(() => {
    const fetchCrew = async () => {
        const { data, error } = await supabase.from("Crewmates").select("*").eq('id', params.id);
        if (error) {
            console.error('Error fetching crewmate data:', error);
            return;
        }
        if (data.length === 0) {
            console.error('Crewmate not found');
            return;
        }
        setFormData(data[0]);
        const initialPic = among[data[0].color.toLowerCase()];
        console.log(initialPic)
        setPic(initialPic);

    };
    fetchCrew();
}, [params.id, supabase, among]);

const deleteMember = async () => {
    const { error } = await supabase
        .from('Crewmates')
        .delete()
        .eq('id', params.id);

    if (error) {
        console.error('Error deleting crewmate:', error);
        return;
    }
    
    console.log('Crewmate deleted successfully');
    navigate('/gallery')
    //setShowDeleteAnimation(true);
    /*setTimeout(() => {
        setShowDeleteAnimation(false);
        navigate('/gallery'); // Navigate after 3 seconds
    }, 3000);
    */
}

const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let newValue;
    if (type === 'checkbox') {
        newValue = e.target.checked;  
    } else if (type === 'button') {
        newValue = value === 'true';  
    } else {
        newValue = type === 'number' ? Number(value) : value;
    }
    setFormData(prevState => ({ ...prevState, [name]: newValue }));

    if (name === 'color') {
        const newPic = among[value.toLowerCase()];
        console.log("New image path:", newPic);  
        setPic(newPic);
    }
};

const handleSusChange = (value) => {
    setFormData(prevState => ({ ...prevState, sus: value }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
        .from('Crewmates')
        .update(formData)
        .eq('id', params.id);

    if (error) {
        console.error('Error updating crewmate:', error);
        return;
    }
    console.log('Crewmate updated successfully');
    navigate('/gallery')
};

return (
    <>
    <div className='ml-[176px]'>
        <h1 className='text-white font-bold text-center text-[40px] mx-16'>This is where you will update your crewmates</h1>
        <div className='bg-gray-300 rounded-md mt-8 p-8'>
            {//<img className='w-44 h-44 m-auto' src={pic} alt="Crewmate"></img>
            }
            <form className="flex flex-row justify-center" onSubmit={handleSubmit}>
                <div className='ml-2 flex flex-col bg-red-300 rounded-md p-3 mb-3 items-center'>
                    <label className='text-lg mb-10' htmlFor="name">Name:</label>
                    <input 
                        className="rounded-md" 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className='ml-2 flex flex-col bg-blue-300 rounded-md p-3 mb-3 items-center'>
                    <label className='text-lg mb-10' htmlFor="speed">Speed:</label>
                    <input 
                        className="rounded-md" 
                        type="number" 
                        name="speed" 
                        value={formData.speed} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className='ml-2 flex flex-col bg-purple-300 rounded-md p-3 mb-3'>
                    <h3 className='text-lg'>Sus?</h3>
                    <button
                        type="button"
                        className={`text-lg mx-1 p-2 rounded-md my-2 ${formData.sus ? 'bg-red-500' : 'bg-blue-400'}`}
                        onClick={() => handleSusChange(true)}
                    >
                        Sus
                    </button>
                    <button
                        type="button"
                        className={`text-lg mx-1 p-2 rounded-md my-2 ${!formData.sus ? 'bg-green-500' : 'bg-blue-400'}`}
                        onClick={() => handleSusChange(false)}
                    >
                        Not Sus
                    </button>
                </div>
                <div className='ml-2 flex flex-col bg-cyan-300 rounded-md p-3 w-56'>
                    <h3 className='text-lg'>Color:</h3>
                    <ul>
                        <li><input className='text-lg' type="radio" name="color" value="Red" onChange={handleInputChange}/> Red </li>
                        <li><input className='text-lg' type="radio" name="color" value="Blue" onChange={handleInputChange}/> Blue </li>
                        <li><input className='text-lg' type="radio" name="color" value="Green" onChange={handleInputChange}/> Green </li>
                        <li><input className='text-lg' type="radio" name="color" value="Purple" onChange={handleInputChange}/> Purple </li>
                        <li><input className='text-lg' type="radio" name="color" value="Yellow" onChange={handleInputChange}/> Yellow </li>
                        <li><input className='text-lg' type="radio" name="color" value="Orange" onChange={handleInputChange}/> Orange </li>
                        <li><input className='text-lg' type="radio" name="color" value="Pink" onChange={handleInputChange}/> Pink </li>
                    </ul>
                </div>
            </form>
            <button className='bg-red-400 p-2 rounded-md mb-2 mt-2 mx-2' type="submit" onClick={handleSubmit}>Submit</button>
            <button className='bg-red-400 p-2 rounded-md mb-2 mt-2 mx-2' onClick={deleteMember}>Remove</button>
        </div>
    </div>
    </>
);
}

export default Update;
