export async function GET (req){
    // get all users
    const userList = [
        {id:1, name: 'Thien'},
        {id:2, name: 'Thai'},
        {id:3, name: 'tuan'},
        {id:4, name: 'thang'},
    ]
    return Response.json(userList);
}
export async function POST (req){
    
}
