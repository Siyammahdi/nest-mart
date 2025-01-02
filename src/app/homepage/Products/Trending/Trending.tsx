// pages/index.tsx
import { topSelling, trendingProducts, recentlyAdded, topRated } from '@/../src/mock/products';
// import Product from '@/../src/mock/products';
import Image from 'next/image';




interface ProductProps {
    image: string;
    title: string;
    rating: number;
    reviews: number;
    price: string;
    originalPrice: string;
}

const ProductCard: React.FC<ProductProps> = ({ image, title, rating, reviews, price, originalPrice }) => {
    return (
        <div className="p-4 bg-white rounded flex items-center gap-5">
            <Image
                src={image}
                alt={title}
                className="mx-auto"
                width={100}
                height={100} />
            <div>
                <h3 className="text-start  font-semibold mt-2">{title}</h3>
                <div className="flex items-center justify-start mt-1">
                    <div className="text-yellow-400">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
                    <span className="ml-1 text-xs">({reviews})</span>
                </div>
                <div className="flex justify-start mt-2">
                    <span className="text-green-600 font-semibold text-lg">{price}</span>
                    <span className="ml-2 text-gray-400 line-through">{originalPrice}</span>
                </div>
            </div>
        </div>
    );
};





const Trending = () => {
    return (
        <div className="mt-20 px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Top Selling */}
                <div>
                    <h2 className="text-2xl text-text font-semibold border-b-2 border-primary/30 pb-3">Top Selling</h2>
                    <div className='border-b-2 w-1/4 border-primary/30'></div>
                    {topSelling.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            rating={product.rating}
                            reviews={product.reviews}
                            price={product.price}
                            originalPrice={product.originalPrice}
                        />
                    ))}
                </div>

                {/* Trending Products */}
                <div>
                <h2 className="text-2xl text-text font-semibold border-b-2 border-primary/30 pb-3">Trending Products</h2>
                <div className='border-b-2 w-1/4 border-primary/30'></div>
                    {trendingProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            rating={product.rating}
                            reviews={product.reviews}
                            price={product.price}
                            originalPrice={product.originalPrice}
                        />
                    ))}
                </div>

                {/* Recently Added */}
                <div>
                <h2 className="text-2xl text-text font-semibold border-b-2 border-primary/30 pb-3">Recently added</h2>
                <div className='border-b-2 w-1/4 border-primary/30'></div>
                    {recentlyAdded.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            rating={product.rating}
                            reviews={product.reviews}
                            price={product.price}
                            originalPrice={product.originalPrice}
                        />
                    ))}
                </div>

                {/* Top Rated */}
                <div>
                <h2 className="text-2xl text-text font-semibold border-b-2 border-primary/30 pb-3">Top Reted</h2>
                <div className='border-b-2 w-1/4 border-primary/30'></div>
                    {topRated.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            rating={product.rating}
                            reviews={product.reviews}
                            price={product.price}
                            originalPrice={product.originalPrice}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trending;
