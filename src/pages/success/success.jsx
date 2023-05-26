import Link from "next/link"

export default function Success() {
    return (
        <>
            <h2>CheckOut Successfully!</h2>
            <Link href="/cart">Go to Order</Link>
        </>
    )
}