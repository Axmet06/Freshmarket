// Mock reviews data for when Supabase is not available
const mockReviews = [
  {
    id: 1,
    product_id: "1",
    user_id: "user1",
    username: "Анна Петрова",
    rating: 5,
    comment: "Прекрасный аромат! Очень свежий и持久ный. Рекомендую всем любителям цитрусовых нот.",
    created_at: "2023-10-15T10:30:00Z"
  },
  {
    id: 2,
    product_id: "1",
    user_id: "user2",
    username: "Мария Сидорова",
    rating: 4,
    comment: "Отличный выбор для лета. Не слишком тяжелый, но при этом заметный аромат.",
    created_at: "2023-09-22T14:15:00Z"
  }
];

// Check if Supabase is configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
let supabase;

// Only initialize Supabase if credentials are available
if (supabaseUrl && supabaseAnonKey) {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Supabase client could not be initialized:', error);
  }
}

// Get reviews for a product
export const getReviews = async (productId) => {
  // If Supabase is not available, return mock data for product ID 1
  if (!supabase) {
    console.warn('Supabase not configured, returning mock data');
    return productId === "1" ? mockReviews : [];
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Return mock data as fallback
    return productId === "1" ? mockReviews : [];
  }
};

// Add a new review
export const addReview = async (productId, username, rating, comment, userId) => {
  // If Supabase is not available, simulate adding to mock data
  if (!supabase) {
    console.warn('Supabase not configured, simulating review addition');
    const newReview = {
      id: Date.now(), // Simple ID generation
      product_id: productId,
      user_id: userId || 'anonymous',
      username: username,
      rating: rating,
      comment: comment,
      created_at: new Date().toISOString()
    };
    // In a real app, you would update the mock data store
    return newReview;
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          product_id: productId,
          user_id: userId || 'anonymous',
          username: username,
          rating: rating,
          comment: comment,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  // If Supabase is not available, simulate deletion
  if (!supabase) {
    console.warn('Supabase not configured, simulating review deletion');
    // In a real app, you would update the mock data store
    return true;
  }

  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};