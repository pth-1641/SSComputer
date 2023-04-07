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

function GpuDetails() {
  const [gpu, setGpu] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/gpus/${id}`);
      setGpu(data);
    })();
  }, []);

  if (!gpu) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={gpu}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={gpu.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={gpu.details} title={gpu.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails details={gpu.details.review} title={gpu.title} />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default GpuDetails;
