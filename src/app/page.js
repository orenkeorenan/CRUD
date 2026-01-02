"use client"

import { useEffect, useState } from "react"

export default function Home() {

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [products, setProducts] = useState([])



    // READ
    async function loadProducts() {
        const res = await fetch("/api/products")

        if (!res.ok) {
        console.error("API failed", res.status)
        return
        }

        const data = await res.json()
        setProducts(data)

    }

    useEffect(() => {
        loadProducts()
    }, [])

    // CREATE
    async function handleCreate() {
        await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id), name }),
        })
        loadProducts()
    }

    // UPDATE
    async function handleUpdate() {
        await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id), name }),
        })
        loadProducts()
    }

    // DELETE
    async function handleDelete() {
        await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id) }),
        })
        loadProducts()
    }

  return (
    <div
        style={{
            display:"flex",
            alignItems:"center",
            flexDirection:"column",
            gap:"2rem"
        }}
    >
        <h1>BASIC CRUD OPERATIONSss</h1>
        {/* hero 1 */}
        <div
            style={{
                display:"flex",
                gap:"1.5rem",
                height:"5rem",
                alignItems:"center",
            }}
        >
            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:"1rem",
                }}
            >
                <input 
                    placeholder="ID number"
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input 
                    placeholder="Product name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:".5rem"
                }}
            >
                <button onClick={handleCreate} >Create</button>
                <button onClick={handleUpdate} >Update</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
        {/* hero 2 */}
        <div>
            <h2
                style={{
                    textAlign:"center"
                }}
            >
                Product List
            </h2>
            {
                products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            display:"flex",
                            gap:"5rem"
                        }}
                    >
                        <div>
                            <div>
                                Product ID
                            </div>
                            <div>
                                {product.id}
                            </div>
                        </div>
                        <div>
                            {product.name}
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  );
}
