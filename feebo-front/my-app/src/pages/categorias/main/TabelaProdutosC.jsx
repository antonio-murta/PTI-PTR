import React from 'react';
import { Item, Button } from 'semantic-ui-react';

const ProductCard = ({
  produto,
  addToCompare,
  removeFromCompare,
  selected,
}) => (
  // <Item key={produto.nome}>
  //   {/* <Item.Image size="small" src={produto.imagem} /> */}
  //   <Item.Content verticalAlign="middle">
  //     <Item.Header>{produto.nome}</Item.Header>
  //     <Item.Description>{produto.preco}</Item.Description>
  <Item.Extra>
    {selected && selected.includes(produto) ? (
      <Button color="red" onClick={() => removeFromCompare(produto)}>
        Remove
      </Button>
    ) : (
      <Button color="blue" onClick={() => addToCompare(produto)}>
        Compare
      </Button>
    )}
  </Item.Extra>
  //   </Item.Content>
  // </Item>
);

export default ProductCard;
