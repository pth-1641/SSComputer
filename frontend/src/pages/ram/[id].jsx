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

function RamDetails() {
  const [ram, setRam] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/rams/${id}`);
      setRam(data);
    })();
  }, []);

  if (!ram) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={ram}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={ram.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={ram.details} title={ram.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails details={ram.details.review} title={ram.title} />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default RamDetails;
