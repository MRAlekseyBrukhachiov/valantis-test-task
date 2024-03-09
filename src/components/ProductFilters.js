import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import useAPI from "../hooks/useAPI";
import { useStore } from "../store";

const ProductFilters = () => {
    const [loading, setLoading] = useState(true);
    const [brandFilters, setBrandFilters] = useState([]);
    const [productFilters, setProductFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState([]);

    const { getFields } = useAPI();
    const { products, setActiveFilter } = useStore();
    
    const loadFilters = async (filter, limit) => {
        try {
            return await getFields(0, limit, filter);
        } catch (e) {
            console.error(e);
            loadFilters(filter);
        }
    }

    const toFilter = (value) => {
        if (!value) return {value: null, label: 'Не указано'}
        return {value, label: value}
    }

    const onRequest = async (limit) => {
        setLoading(true);

        const brands = await loadFilters('brand', limit);
        const products = await loadFilters('product', limit);
        const prices = await loadFilters('price', limit);

        setBrandFilters([...new Set(brands)].map(toFilter));
        setProductFilters([...new Set(products)].map(toFilter));
        setPriceFilters([...new Set(prices)].sort((a, b) => (a - b)).map(toFilter));

        setLoading(false);
    }

    useEffect(() => {
        onRequest(150);
    }, []);

    useEffect(() => {
        onRequest(products.length);
    }, [products]);

    return (
        <Container fluid style={{paddingLeft: 24, paddingRight: 24}}>
            <Row className="pt-4">
                <Col><Select options={priceFilters} placeholder="Price" 
                             isClearable isSearchable={false} isLoading={loading}
                             onChange={e => setActiveFilter(e ? {"price": e.value} : 'none')}/></Col>
                <Col><Select options={productFilters} placeholder="Product" 
                             isClearable isSearchable={false} isLoading={loading}
                             onChange={e => setActiveFilter(e ? {"product": e.value} : 'none')}/></Col>
                <Col><Select options={brandFilters} placeholder="Brand" 
                             isClearable isSearchable={false} isLoading={loading}
                             onChange={e => setActiveFilter(e ? {"brand": e.value} : 'none')}/></Col>
            </Row>
        </Container>
    );
}

export default ProductFilters;