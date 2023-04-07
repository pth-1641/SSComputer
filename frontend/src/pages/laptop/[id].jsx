import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductBasic from '../../components/ProductBasic';
import ProductDetails from '../../components/ProductDetails';
import ProductReviews from '../../components/ProductReviews';
import ProductSpecs from '../../components/ProductSpecs';
import ProductsSlider from '../../components/ProductsSlider';

function LaptopDetails() {
  const [laptop, setLaptop] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/laptops/${id}`);
      setLaptop(data);
    })();
  }, []);

  if (!laptop) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={laptop}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={laptop.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={laptop.details} title={laptop.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails details={laptop.details.review} title={laptop.title} />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default LaptopDetails;
