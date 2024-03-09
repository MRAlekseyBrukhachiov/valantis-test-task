import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductList from './components/ProductList';
import ProductFilters from './components/ProductFilters';

function App() {
  return (
    <div className="App">
      <ProductFilters/>
      <ProductList/>
    </div>
  );
}

export default App;
