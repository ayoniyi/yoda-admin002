import React, {useState} from 'react'
import {useDropzone} from 'react-dropzone'


//asset
import icon from '../assets/png/profile.png'


function Dragdrop() {

    const [files, setFiles] = useState([])
    //const [ filebody, setFilebody] = useState(" j ")

    //let imagePath ="bla bla bla"

    const {getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) => Object.assign(file, {
                    //preview: URL.createObjectURL(file)
                    
                }))
            )
        }
        
    })
    
    if(files[0] !== undefined) {
        console.log(files[0])
        console.log(files[0].name)
        localStorage.setItem("filez", files[0])
        localStorage.setItem("filezName", files[0].name)
    }

    const images = files.map((file) => (
        <div key={file.name}>
            <div>
                <img src={file.preview} className="up-image1" alt="drag" />
                {console.log(file)}
                {localStorage.setItem("filezP", file.preview)}
                
            </div>
        </div>
    ))

    //let imagePath = files[0].path
    //console.log(localStorage.getItem("filezName") )
    //console.log(localStorage.getItem("filezPath") )

   
   // const uploadEvent  = (event) => { }

    return (
        <div>
            <div {...getRootProps()} className="upload-box">
                <input {...getInputProps()} 
                 />
                    {images.length === 0  && (
                         <img className="up-icon" src={icon} alt="upload" />
                    )}
                    {images.length !== 0 && (
                        images
                    )}
            </div>
            <div >
               
                
            </div>

        </div>
    )
}

export default Dragdrop;