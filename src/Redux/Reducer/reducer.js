
let initialData = {
    movies : [] 
} ;

export const reducer = (store = initialData, action)=>{
    if(action.type === "MOVIE"){
        return(
            store = {
                movies : action.payload 
            }
        )
    }
    return store ;
} 