import firebase, { db } from '../firebase/config'
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import firebase from "./config";

function uploadVideo(file, setProgress, setVideoUrl) {

    if(file) {
      const storage = getStorage();

      let url

      /** @type {any} */
      const metadata = {
        contentType: file.type
      };
      
      const storageRef = ref(storage, 'video/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      
      const a = uploadTask.on('state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress)
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              return
          }
          return progress
        }, 
        (error) => {
          console.log(error)
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
            if(URL) {
                // console.log(URL)
                setVideoUrl(URL)
                // inputAvataRef.current.value = URL
            }
            // setIsLoading(false)
          });
        }
      );
  
    } else {
        alert('Only jpg files allowed!')
    }
  }

export default uploadVideo