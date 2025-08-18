
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';  
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import AnimatedContainer from '@/components/AnimatedContainer';
import FadeIn from '@/components/FadeIn';
import { products } from '@/data/products';
import { Badge } from '@/components/ui/badge';
import { Percent, Star } from 'lucide-react';

const Index = () => {
  const categories = [
    {
      title: "Social Media Growth",
      description: "Boost your followers, likes, and engagement",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=300&h=200",
      color: "from-pink-500 to-purple-600"
    },
    {
      title: "Marketing Tools", 
      description: "Professional tools for digital marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=200",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Analytics & Insights",
      description: "Track and analyze your social media performance", 
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=200",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Content Creation",
      description: "Tools and services for creating engaging content",
      image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?auto=format&fit=crop&q=80&w=300&h=200", 
      color: "from-orange-500 to-red-600"
    }
  ];

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />

      {/* Special Launch Offer Banner */}
      <AnimatedContainer className="py-8 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-2">
              <Percent className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">Special Launch Offer!</h2>
              <Percent className="w-6 h-6 text-white" />
            </div>
            <p className="text-white text-lg mb-4">
              Get 25% OFF on all products with code <Badge variant="secondary" className="bg-white text-red-600 font-bold">LAUNCH25</Badge>
            </p>
            <p className="text-white/90 text-sm">
              Limited time offer! Use code LAUNCH25 at checkout to save big on your first purchase.
            </p>
          </FadeIn>
        </div>
      </AnimatedContainer>

      {/* Categories Section */}
      <AnimatedContainer className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover our comprehensive range of social media and digital marketing solutions
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bg-gradient-to-br bg-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} p-2 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-white/20 rounded-md"></div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </AnimatedContainer>

      {/* Featured Products */}
      <AnimatedContainer className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-muted-foreground text-lg">
                Our most popular social media growth solutions
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </AnimatedContainer>

      {/* Customer Feedback Section */}
      <AnimatedContainer className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Real feedback from real customers who have purchased from us
              </p>
              
              <div className="mb-8">
                <a 
                  href="/customer-feedback"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  View All Customer Reviews
                  <Star className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </AnimatedContainer>

      <Footer />
    </div>
  );
};

export default Index;
