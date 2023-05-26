import Link from "next/link"

export default function Cancel() {
    return (
        <>
            <h2>Cancel CheckOut!</h2>
            <Link href="/cart">Go back to Cart</Link>
        </>
    )
}