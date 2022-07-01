import React from "react";

export default function Meme() {
    const [meme, setMeme]=React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemeImages, setAllMemeImages]=React.useState()

    React.useEffect(()=> {
        fetch("https://api.imgflip.com/get_memes")
            .then(res=>res.json())
            .then(data=>setAllMemeImages(data.data.memes))
    }, [])

    function generateMeme() {
        // const memesArray=allMemeImages.data.memes
        let randomTemplate=Math.floor(Math.random()*allMemeImages.length)  
        const url=allMemeImages[randomTemplate].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event) {
        const {name, value}=event.target
        setMeme(prevMeme=> ({
            ...prevMeme,
            [name]: value
        }))
    }

    return(
        <main>
            <div className="form-el">
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder=" Top text"
                    name="topText"
                    value={meme.toptext}
                    onChange={handleChange}
                />

                <input
                    type="text"     
                    className="form-input"
                    placeholder=" Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />

                <button 
                    onClick={generateMeme}
                    className="form-btn">Get a new meme template
                </button>
            </div>

            <div className="meme">
                <img src={meme.randomImage} className='meme--image'/>   
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}
