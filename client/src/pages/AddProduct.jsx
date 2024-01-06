import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    quantity: '',
    benefits: '',
    qualities: [{ type: '', prices: [] }],
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQualityChange = (event, index) => {
    const { value } = event.target;
    setFormData((prevData) => {
      const newQualities = [...prevData.qualities];
      newQualities[index].type = value;
      return { ...prevData, qualities: newQualities };
    });
  };

  const handlePriceChange = (event, index) => {
    const { value } = event.target;
    setFormData((prevData) => {
      const newQualities = [...prevData.qualities];
      newQualities[index].prices = [parseFloat(value)];
      return { ...prevData, qualities: newQualities };
    });
  };

  const handleSubmit = () => {
   console.log(formData)
  };

  return (
    <Box>
      <Button onClick={() => setShowForm(true)}>
        Open Form
      </Button>

      {showForm && (
        <Box>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" onChange={handleChange} value={formData.title} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" onChange={handleChange} value={formData.description} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Image</FormLabel>
            <Input type="text" name="image" onChange={handleChange} value={formData.image} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Quantity</FormLabel>
            <Input type="number" name="quantity" onChange={handleChange} value={formData.quantity} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Benefits</FormLabel>
            <Textarea name="benefits" onChange={handleChange} value={formData.benefits} />
          </FormControl>

          {/* Quality Schema Fields */}
          {formData.qualities.map((quality, index) => (
            <Box key={index} mt={4}>
              {/* Quality Type Field */}
              <FormControl>
                <FormLabel>Quality Type</FormLabel>
                <Input
                  type="text"
                  name={`qualityType${index}`}
                  onChange={(event) => handleQualityChange(event, index)}
                  value={quality.type}
                />
              </FormControl>

              {/* Prices Field */}
              <FormControl mt={2}>
                <FormLabel>Prices</FormLabel>
                <Input
                  type="number"
                  name={`price${index}`}
                  onChange={(event) => handlePriceChange(event, index)}
                  value={quality.prices[0]}
                />
              </FormControl>
            </Box>
          ))}

          {/* Add Quality Button */}
          <Button mt={4} onClick={() => setFormData((prevData) => ({ ...prevData, qualities: [...prevData.qualities, { type: '', prices: [] }] }))}>
            Add Quality
          </Button>

          {/* Submit Button */}
          <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddProduct;
