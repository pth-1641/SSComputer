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

function ComputerDetails() {
  const [computer, setComputer] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/computers/${id}`);
      setComputer(data);
    })();
  }, []);

  if (!computer) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={computer}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={computer.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={computer.details} title={computer.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails
          details={computer.details.review}
          title={computer.title}
        />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default ComputerDetails;
