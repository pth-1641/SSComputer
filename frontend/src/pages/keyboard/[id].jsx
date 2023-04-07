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

function KeyboardDetails() {
  const [keyboard, setLaptop] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/keyboards/${id}`);
      setLaptop(data);
    })();
  }, []);

  if (!keyboard) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={keyboard}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={keyboard.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={keyboard.details} title={keyboard.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails
          details={keyboard.details.review}
          title={keyboard.title}
        />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default KeyboardDetails;
