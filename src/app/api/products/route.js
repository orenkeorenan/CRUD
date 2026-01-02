import { db } from "@/lib/db"

export const runtime ="nodejs"


// CREATE
export async function POST(req) {
  const { id, name } = await req.json()

  await db.query(
    "INSERT INTO products (id, name) VALUES (?, ?)",
    [id, name]
  )

  return Response.json({ success: true })
}

// READ
// export async function GET() {
//   try {
//     const [rows] = await db.query("SELECT * FROM products")
//     return Response.json(rows)
//   } catch (err) {
//     console.error("GET /api/products ERROR:", err)
//     return Response.json(
//       { error: "Database error" },
//       { status: 500 }
//     )
//   }
// }
// READ
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM products")
    return Response.json(rows)
  } catch (err) {
    console.error("GET /api/products ERROR:", err)

    return Response.json(
      {
        error: err.message,
        code: err.code,
      },
      { status: 500 }
    )
  }
}



// UPDATE
export async function PUT(req) {
  const { id, name } = await req.json()

  await db.query(
    "UPDATE products SET name=? WHERE id=?",
    [name, id]
  )

  return Response.json({ success: true })
}

// DELETE
export async function DELETE(req) {
  const { id } = await req.json()

  await db.query(
    "DELETE FROM products WHERE id=?",
    [id]
  )

  return Response.json({ success: true })
}


// import { db } from "@/lib/db"

// export async function GET() {
//   const [rows] = await db.query("SELECT 1")
//   return Response.json(rows)
// }
