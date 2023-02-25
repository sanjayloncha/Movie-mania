

export const movieAction = (data,dispatch)=>{
    dispatch({
        type : "MOVIE",
        payload : data 
    })
}