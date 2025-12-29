const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=30');
    const data = await response.json();
    
    console.log('All Products:');
    data.products.forEach(product => {
      console.log(`ID: ${product.id}`);
      console.log(`Title: ${product.title}`);
      console.log(`Description: ${product.description}`);
      console.log(`Category: ${product.category}`);
      console.log(`Price: $${product.price}`);
      console.log(`Brand: ${product.brand}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

fetchProducts();