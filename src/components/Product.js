import Card from 'react-bootstrap/Card';

const Product = ({product, price, brand, id}) => {
    return (
        <Card style={{margin: '0 12px 12px 12px'}}>
            <Card.Body>
                <Card.Title>{product}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{id}</Card.Subtitle>
                <Card.Text>
                    Brand: {brand ? brand : 'не указано'}
                    <br/>
                    Price: {price}
                </Card.Text>
                
            </Card.Body>
         </Card>
    );
}

export default Product;