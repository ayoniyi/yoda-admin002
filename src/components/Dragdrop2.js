import React, {useState} from 'react'

//import './Dragdrop2.css'

function Dragdrop2() {
    
    //
    const [post, setPost] = useState({
        title:" ",
        desc: " ",
        photos:[]
    });
    
    //
    const [highlight, setHighlight] = useState(false);
    const {title,desc,photos} = post;
    const handlechange = e => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    
    //
    const handlefilechange = e => {
        let files = e.target.files;
        handfiles(files);
      
    }
    const handfiles = files => {
        let photosArr = [];
        for(let file of files) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load',()=>{
                let fileobj={
                    name:file.name,
                    type:file.type,
                    size:file.size,
                    src:reader.result
                }
                photosArr.push(fileobj);
                setPost({
                    ...post,
                    photos:[...photos, ...photosArr]
                })

            });
        }
        console.log(photos)
    }
    
    //
    const handlehighlight = e => {
        e.preventDefault();
        e.stopPropagation();
        setHighlight(true);
    }
    const handleunhighlight = e => {
        e.preventDefault();
        e.stopPropagation();
        setHighlight(false); // for the highlight animation
    }
    const handledrop = e => {
        e.preventDefault();
        e.stopPropagation();
        setHighlight(false);
        
        let dt = e.dataTransfer;
        let files = dt.files;

        handfiles(files);

        console.log(files); // something has changed
    }


    return (
        <div>
                <div className="file-upload">
                <h2>Image Drag & Drop & Preview</h2>
                <form className="" encType="multipart/form-data">
                    <div className="custom-form-group" >
                        <input type="text" name="title" placeholder="Title" value={title} onChange={handlechange} />
                    </div>
                    <div className="custom-form-group">
                        <input type="text" name="desc" placeholder="Description" value={desc} onChange={handlechange} />
                    </div>
                    <div className="custom-form-group">
                        <div className={highlight ? "custom-file-drop-area highlight" : "custom-file-drop-area"} 
                        onDragEnter={handlehighlight}
                        onDragOver={handlehighlight}
                        onDragLeave={handleunhighlight}
                        onDrop={handledrop}
                        >
                            <input type="file"name="photos" placeholder="Enter photos" multiple id="filephotos" onChange={handlefilechange}/>
                            <label htmlFor="filephotos">Drag & Drop</label>
                        </div>
                        <div className="custom-file-preview">
                            {photos.length > 0 && photos.map((item, index) => (
                                 <div className="prev-img" key={index} data-imgindex={index}>
                                    <span>&times;</span>
                                    <img src={item.src} alt={item.name}/>
                                    <p>{console.log(item.src)}</p>

                                </div>
                            ))}
                           
                           
                        </div>
                    </div>
                    <button type="submit" className="btn-submit">Submit</button>
                </form>
            </div>

        </div>

    )

}

export default Dragdrop2;