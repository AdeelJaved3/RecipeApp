
export default function sendAlert(body){
    let send = true
    if(!body.recipename && send) {
        alert("Fill out Recipe Name field")
        send = false
    }
    if(!body.ingredients && send){
        alert("Fill out Ingredients field")
        send = false
    }
    if(!body.instructions && send){
        alert("Fill out Ingredients field")
        send = false
    }
    if(!body.servingSize && send){
        alert("Fill out Serving Size field")
        send = false
    }
    if(!body.category && send){
        alert("Fill out Category field")
        send = false
    }
    return send
}