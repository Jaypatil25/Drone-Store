import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3X3, List, X, Flag, Camera, Minimize2, Building2, Crosshair, GraduationCap } from 'lucide-react';
import { drones, categories, brands } from '@/data/drones';
import DroneCard from '@/components/DroneCard';

const categoryIcons = {
  Racing: Flag,
  Camera: Camera,
  Mini: Minimize2,
  Enterprise: Building2,
  FPV: Crosshair,
  Beginner: GraduationCap,
};
import GlassCard from '@/components/GlassCard';

const DronesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get('category') ? [searchParams.get('category')] : []
  );
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sort, setSort] = useState('featured');
  const [view, setView] = useState('grid');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...drones];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(d => d.name.toLowerCase().includes(s) || d.brand.toLowerCase().includes(s));
    }
    if (selectedCategories.length > 0) {
      result = result.filter(d => selectedCategories.includes(d.category));
    }
    if (selectedBrands.length > 0) {
      result = result.filter(d => selectedBrands.includes(d.brand));
    }
    result = result.filter(d => d.price >= priceRange[0] && d.price <= priceRange[1]);
    if (inStockOnly) {
      result = result.filter(d => d.inStock);
    }

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)); break;
    }

    return result;
  }, [search, selectedCategories, selectedBrands, priceRange, sort, inStockOnly]);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 20000]);
    setInStockOnly(false);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search drones..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <h4 className="font-display font-semibold text-sm mb-2">Category</h4>
        {categories.map(cat => {
            const CatIcon = categoryIcons[cat.slug];
            return (
          <label key={cat.slug} className="flex items-center gap-2 py-1 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.slug)}
              onChange={() => toggleCategory(cat.slug)}
              className="rounded accent-primary"
            />
            <span className="text-sm flex items-center gap-1.5">
                <CatIcon size={14} className="text-primary" />
                {cat.name}
              </span>
          </label>
            );
          })}
      </div>

      <div>
        <h4 className="font-display font-semibold text-sm mb-2">Brand</h4>
        {brands.map(brand => (
          <label key={brand} className="flex items-center gap-2 py-1 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
              className="rounded accent-primary"
            />
            <span className="text-sm">{brand}</span>
          </label>
        ))}
      </div>

      <div>
        <h4 className="font-display font-semibold text-sm mb-2">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-20 px-2 py-1.5 rounded-lg glass text-sm"
            placeholder="Min"
          />
          <span className="text-muted-foreground">—</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], +e.target.value])}
            className="w-20 px-2 py-1.5 rounded-lg glass text-sm"
            placeholder="Max"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={() => setInStockOnly(!inStockOnly)}
          className="rounded accent-primary"
        />
        <span className="text-sm">In Stock Only</span>
      </label>

      <button onClick={clearFilters} className="text-sm text-primary hover:underline">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-4xl">All Drones</h1>
            <p className="text-muted-foreground mt-1">{filtered.length} drones found</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-xl glass"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={18} />
            </button>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-4 py-2 rounded-xl glass text-sm outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
            <div className="hidden md:flex gap-1 glass rounded-xl p-1">
              <button onClick={() => setView('grid')} className={`p-1.5 rounded-lg ${view === 'grid' ? 'bg-primary text-primary-foreground' : ''}`}>
                <Grid3X3 size={16} />
              </button>
              <button onClick={() => setView('list')} className={`p-1.5 rounded-lg ${view === 'list' ? 'bg-primary text-primary-foreground' : ''}`}>
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          
          <div className="hidden md:block w-64 shrink-0">
            <GlassCard className="p-5 sticky top-28" hover={false}>
              <FilterPanel />
            </GlassCard>
          </div>

          
          {showFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-foreground/20" onClick={() => setShowFilters(false)} />
              <div className="absolute right-0 top-0 h-full w-80 bg-background p-6 overflow-y-auto shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)}><X size={20} /></button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display font-semibold text-xl">No drones found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
                <button onClick={clearFilters} className="mt-4 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filtered.map((drone, i) => (
                  <DroneCard key={drone.id} drone={drone} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DronesPage;
