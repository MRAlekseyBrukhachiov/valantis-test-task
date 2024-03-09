import Card from 'react-bootstrap/Card';

const Product = ({product, price, brand, id}) => {
    return (
        <Card style={{width: '48vw', margin: '0 0 12px 12px', display: 'inline-block'}}>
            <Card.Body>
                <Card.Title>{product}</Card.Title>
                <Card.Text>
                    Brand: {brand ? brand : 'не указано'}
                </Card.Text>
                <Card.Text>
                    Price: {price}
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{id}</Card.Subtitle>
            </Card.Body>
         </Card>
    );
}

export default Product;