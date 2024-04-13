import React, { useState } from 'react';

const Create = ({supabase, among}) => {
    const [formData, setFormData] = useState({
        name: '',
        speed: 0,
        sus: "", 
        color: ''
    });
    const [pic, setPic] = useState("src/sus/crewmate-1.ce385016.png");

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (name === "sus") {
      
            setFormData(prev => ({
                ...prev,
                sus: value === "Sus"
            }));
        } else {

            setFormData(prev => ({
                ...prev,
                [name]: type === 'number' ? Number(value) : value
            }));
        }
        if (name === "color") {

            setPic(among[value.toLowerCase()]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const { data, error } = await supabase
            .from('Crewmates')
            .insert([formData]);

        if (error) {
            console.error('There was an error inserting the data:', error);
        } else {
            console.log('Data inserted successfully:', data);
            setFormData({
                name: '',
                speed: 0,
                sus: "", 
                color: ''
            });
            setPic("src/sus/crewmate-1.ce385016.png");
        }
    };

    return (
        <>
            <div className='ml-[176px]'>
                <h1 className='text-white font-bold text-center text-[40px] mx-16'>This is where you will create your crewmates</h1>
                <div className='bg-gray-300 rounded-md'>
                    <img className='w-44 h-44 m-auto' src={pic} alt="Crewmate"></img>
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
                                onClick={() => handleInputChange({ target: { name: "sus", value: "Sus" } })}
                            >
                                Sus
                            </button>
                            <button
                                type="button"
                                className={`text-lg mx-1 p-2 rounded-md my-2 ${formData.sus === false ? 'bg-green-500' : 'bg-blue-400'}`}
                                onClick={() => handleInputChange({ target: { name: "sus", value: "Not Sus" } })}
                            >
                                Not Sus
                            </button>
                        </div>
                        <div className='ml-2 flex flex-col bg-cyan-300 rounded-md p-3 mb-3 w-56'>
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
                    <button className='bg-red-400 p-2 rounded-md mb-4' type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
}

export default Create;
