export async function PUT(req) {}
export async function DELETE(req) {}
export async function PATCH(req) {}
export async function GET(req, { params }) {
  const { id } = await params;

  const userList = [
    { id: 1, name: "Thien" },
    { id: 2, name: "Thai" },
    { id: 3, name: "tuan" },
    { id: 4, name: "thang" },
  ];
  const user = userList.find((u) => u.id == id);
  console.log(user);

  return Response.json(user);
}
