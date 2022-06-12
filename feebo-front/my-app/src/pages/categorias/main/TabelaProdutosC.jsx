import React from 'react';
import { Item, Button } from 'semantic-ui-react';

const ProductCard = ({
  product,
  addToCompare,
  removeFromCompare,
  selected,
}) => (
  <Item key={product.name}>
    <Item.Image size="small" src={product.image} />
    <Item.Content verticalAlign="middle">
      <Item.Header>{product.name}</Item.Header>
      <Item.Description>{product.price}</Item.Description>
      <Item.Extra>
        {selected && selected.includes(product) ? (
          <Button color="red" onClick={() => removeFromCompare(product)}>
            Remove
          </Button>
        ) : (
          <Button color="blue" onClick={() => addToCompare(product)}>
            Compare
          </Button>
        )}
      </Item.Extra>
    </Item.Content>
  </Item>
);

export default ProductCard;
