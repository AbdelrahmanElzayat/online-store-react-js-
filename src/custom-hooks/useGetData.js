
import { useEffect, useState } from 'react';
// import {db} from '../firebase.config'
// import { collection , getDocs } from 'firebase/firestore';

const useGetData = (collectionName)=>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch(`https://firestore.googleapis.com/v1/projects/z-store-7a8d7/databases/(default)/documents/${collectionName}`)
        .then((res)=>res.json())
        .then((data)=>{
            setData(data.documents);
            setLoading(false);
        })
    },[])
    return {data , loading , setData , setLoading};
}

export default useGetData;