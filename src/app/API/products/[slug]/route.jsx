import data from "../../products.json";


export async function GET(req, {params}){
    console.log(data);
    const {slug} = await params;

    return Response.json(data.find((p) => p.slug == slug));
}