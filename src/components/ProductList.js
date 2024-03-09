import { useState, useEffect, Suspense } from "react";
import useAPI from "../hooks/useAPI";
import Product from "./Product";
import { Container } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { useStore } from "../store";

const ProductList = () => {
    const { getIds, getItems, filter } = useAPI();
    const { activeFilter, products, setProducts } = useStore();
    const [current, setCurrent] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const onRequest = async (offset, initial = false) => {
        try {
            const ids = await getIds(offset, initial ? 160 : 110);
            let items = await getItems(ids);
            items = items.filter((obj, idx, arr) => idx === arr.findIndex((t) => t.id === obj.id));
            setProducts([...products, ...items.slice(0, initial ? 150 : 100)]);
        } catch (e) {
            console.error(e);
            onRequest(offset);
        }
    }

    const renderItems = (products) => {
        if (products.slice(current, current + 50).length === 0) {
            return <Spinner style={{ position: "fixed", top: "50%", left: "50%" }}/>;
        }
        return (
            <>
                { products.slice(current, current + 50).map((item, i) => <Product key={i} {...item}/>) }
            </>
        )
    }

    const onRequestWithFilters = async () => {
        try {
            const ids = await filter(activeFilter);
            let items = await getItems(ids);
            items = items.filter((obj, idx, arr) => idx === arr.findIndex((t) => t.id === obj.id));
            setFilteredProducts(items);
        } catch (e) {
            console.error(e);
            onRequestWithFilters();
        }
    }

    useEffect(() => {
        if (activeFilter !== 'none') {
            onRequestWithFilters();            
        }
        setFilteredProducts([]);
        setCurrent(0);
    }, [activeFilter]);

    const prev = () => {
        if (current === 0) return;
        setCurrent(current => current - 50);
    }

    const next = () => {
        if (activeFilter === 'none') {
            if (products.slice(current, current + 50).length === 0) return;
            if (current + 50 >= products.length - 100) {
                onRequest(products.length);
                setCurrent(current => current + 50)
            } else {
                setCurrent(current => current + 50);
            }
        } else {
            if (filteredProducts.slice(current, current + 50).length < 50) return;
            setCurrent(current => current + 50);
        }
    }

    useEffect(() => {
        onRequest(products.length, true);
    }, []);

    return (
        <Container fluid style={{maxHeight: '89vh', overflow: 'auto', marginTop: 24}}>
            {renderItems(activeFilter === 'none' ? products : filteredProducts)}
            <Pagination style={{
                position: 'absolute',
                bottom: 10,
                left: '47vw'
            }}>
                <Pagination.Prev onClick={prev}/>
                <Pagination.Item>{(current + 50) / 50}</Pagination.Item>
                <Pagination.Next onClick={next}/>
            </Pagination>
        </Container>
    );
}

export default ProductList;