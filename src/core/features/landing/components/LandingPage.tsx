import React, { useState, useEffect } from 'react';
import Card from '@/components/global/SeCard';
import Hero from '@/components/global/carousel/SwiperMain';
import ProductSection from '@/components/global/SeUsedComponents/ProductSection';
import DealsOfTheDay from '@/components/global/SeUsedComponents/DealsOfTheDay';
import Banner from '@/components/global/SeHeroSection';
import ItemSection from '@/components/global/SeUsedComponents/ItemSection';
import IconSection from '@/components/global/carousel/IconSection';
import SaleBanner from '@/components/global/SeUsedComponents/SaleBanner';
import PromoBanner from '@/components/global/SeUsedComponents/PromoBanner';
import BrandIcons from '@/components/global/SeUsedComponents/BrandIcons';
import { faAmazon, faApple, faGoogle, faMicrosoft, faFacebook } from '@fortawesome/free-brands-svg-icons'; // Add other icons as needed


interface Product {
  id: number;
  name: string;
  imageSrc: string;
}

const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/test/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const brandIcons = [
    { icon: faAmazon, alt: 'Amazon' },
    { icon: faApple, alt: 'Apple' },
    { icon: faGoogle, alt: 'Google' },
    { icon: faMicrosoft, alt: 'Microsoft' },
    { icon: faFacebook, alt: 'Facebook' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--primary-bg)] overflow-x-hidden">
      <main className="flex-grow">
        <Hero />
        <div className="flex space-x-4 overflow-x-auto mt-8 py-4">
          {products.map((product) => (
            <Card
              key={product.id}
              imageSrc={product.imageSrc}
              title={product.name}
            />
          ))}
        </div>
        <DealsOfTheDay />
        <ProductSection
          visibleCards={5} // Show 5 cards
          containerWidthPercentage={100} // 100% width
        />
        <div className="flex space-x-4 w-full">
          <div className="flex-1 min-w-0">
            <Banner />
          </div>
          <div className="flex-1 min-w-0">
            <Banner />
          </div>
          <div className="flex-1 min-w-0">
            <Banner />
          </div>
          <div className="flex-1 min-w-0">
            <Banner />
          </div>
        </div>

        <div className="flex w-full px-4 sm:px-6 items-stretch">
          {/* ItemSection with fixed width */}
          <div className="flex-shrink-0 w-[24%] h-full"> {/* Reduced width slightly */}
            <ItemSection />
          </div>

          {/* Space between ItemSection and ProductSection */}
          <div className="flex-shrink-0 w-[1%]"> {/* Add this for spacing */}
            &nbsp;
          </div>

          {/* ProductSection taking the remaining space */}
          <div className="flex-grow h-full">
            <ProductSection
              visibleCards={4}
              containerWidthPercentage={80} // Full width of its container
            />
          </div>
        </div>
        <div className="flex py-2 pb-8"> <SaleBanner
          title="Weekend Sale"
          subtitle="Fine Smart Speaker"
          price="$185.00"
          imageUrl="https://bazaar.ui-lib.com/assets/images/banners/banner-22.jpg"
        />
          <SaleBanner
            title="feshel"
            subtitle="Fine Smart Speaker"
            price="$15.00"
            imageUrl="https://bazaar.ui-lib.com/assets/images/banners/banner-22.jpg"
          />
        </div>
        <div className="flex w-full px-4 sm:px-6 items-stretch">
          {/* ItemSection with fixed width */}
          <div className="flex-shrink-0 w-[24%] h-full"> {/* Reduced width slightly */}
            <ItemSection />
          </div>

          {/* Space between ItemSection and ProductSection */}
          <div className="flex-shrink-0 w-[1%]"> {/* Add this for spacing */}
            &nbsp;
          </div>

          {/* ProductSection taking the remaining space */}
          <div className="flex-grow h-full">
            <ProductSection
              visibleCards={4}
              containerWidthPercentage={80} // Full width of its container
            />
          </div>
        </div>
        <div className="py-4">
          <PromoBanner
            title="GIFT"
            subtitle="50% OFF PERFECT STYLES"
            buttonText="Discover Now"
            buttonLink="/discover"

          />
        </div>
        <div className="flex w-full px-4 sm:px-6 items-stretch">
          {/* ItemSection with fixed width */}
          <div className="flex-shrink-0 w-[24%] h-full"> {/* Reduced width slightly */}
            <ItemSection />
          </div>

          {/* Space between ItemSection and ProductSection */}
          <div className="flex-shrink-0 w-[1%]"> {/* Add this for spacing */}
            &nbsp;
          </div>

          {/* ProductSection taking the remaining space */}
          <div className="flex-grow h-full">
            <ProductSection
              visibleCards={4}
              containerWidthPercentage={80} // Full width of its container
            />
          </div>
        </div>
        <div className="py-4">
          <BrandIcons icons={brandIcons} />
        </div>




      </main>
    </div>
  );
};

export default LandingPage;
