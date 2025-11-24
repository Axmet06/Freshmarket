import perfumesData from '../perfumes.json';

export const fetchPerfumes = async (params = {}) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let data = [...perfumesData];
    
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      data = data.filter(perfume => 
        perfume.name.toLowerCase().includes(searchTerm) || 
        perfume.brand.toLowerCase().includes(searchTerm)
      );
    }
    
    if (params.brand) {
      data = data.filter(perfume => 
        perfume.brand.toLowerCase().includes(params.brand.toLowerCase())
      );
    }
    
    if (params.limit) {
      data = data.slice(0, params.limit);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching perfumes:', error);
    throw error;
  }
};

export const fetchPerfumesByCategory = async (category) => {
  return fetchPerfumes();
};

export const fetchPerfumesByBrand = async (brand) => {
  return fetchPerfumes({ brand });
};

export const searchPerfumes = async (searchTerm) => {
  return fetchPerfumes({ search: searchTerm });
};