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

function CpuDetails() {
  const [cpu, setCpu] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/cpus/${id}`);
      setCpu(data);
    })();
  }, []);

  if (!cpu) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={cpu}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={cpu.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={cpu.details} title={cpu.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails details={cpu.details.review} title={cpu.title} />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default CpuDetails;
