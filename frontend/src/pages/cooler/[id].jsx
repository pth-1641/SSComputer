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

function CoolerDetails() {
  const [cooler, setCooler] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/coolers/${id}`);
      setCooler(data);
    })();
  }, []);

  if (!cooler) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={cooler}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={cooler.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={cooler.details} title={cooler.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails details={cooler.details.review} title={cooler.title} />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default CoolerDetails;
