import multer from "multer";
const storage = multer.memoryStorage() // The memory storage engine stores the files in memory as Buffer objects. It doesn't have any options.
const upload = multer({
    storage: storage,
    limits:{
        fieldSize: 5*1024*1024,
    }  
})

export default upload;
