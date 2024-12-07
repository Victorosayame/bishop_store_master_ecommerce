"use client"


import Image from "next/image"
import Link from "next/link"
import Heart from "./heart"

interface ProductCardProps {
  product: ProductType
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard:React.FC<ProductCardProps> = ({
  product,
  updateSignedInUser
}) => {
  return (
    <Link href={`/products/${product._id}`} className="w-[220px] flex flex-col gap-2 cursor-pointer">
      <Image 
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div className="mt-2">
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">${product.price}</p>
        <Heart product={product} updateSignedInUser={updateSignedInUser} />
      </div>
    </Link>
  )
}

export default ProductCard