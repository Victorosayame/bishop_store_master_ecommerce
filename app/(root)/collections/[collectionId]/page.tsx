import { getCollectionDetails } from '@/actions/get-collections'
import ProductCard from '@/components/product-card'
import Image from 'next/image'
import React from 'react'

const CollectionDetailsPage = async (
  { params }: { params: { collectionId: string }}
) => {
  const collectionDetails = await getCollectionDetails(params.collectionId)

  return (
    <div className='px-10 py-5 flex flex-col items-center gap-8'>
      <Image 
        src={collectionDetails.image}
        width={1500}
        height={1000}
        alt='collection'
        className='w-full h-[400px] object-cover rounded-xl'
      />

      <p className='text-heading3-bold text-grey-2'>{collectionDetails.title}</p>
      <p className='text-center max-w-[900px] text-grey-2'>
        {collectionDetails.description}
      </p>
      <div className='flex gap-16 mx-auto max-sm:gap-16 max-sm:flex-col'>
        {collectionDetails.products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default CollectionDetailsPage;

export const dynamic = "force-dynamic"