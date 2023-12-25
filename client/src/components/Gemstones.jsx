import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/productReducer/action';
import { Box } from '@chakra-ui/react';
import GemstonesCart from './GemstonesCart';

const Gemstones = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.productReducer);

  useEffect(() => {
    dispatch(getProduct());
  }, [location.search]);

  return (
    <Box  mt={5} display={['block', 'grid']} gridTemplateColumns="auto auto auto auto" gap="20px">
      {products.length > 0 &&
        products.map((el) => (
          <div key={el._id} style={{ marginBottom: '20px' }}>
            <GemstonesCart {...el} />
          </div>
        ))}
    </Box>
  );
};

export default Gemstones;
