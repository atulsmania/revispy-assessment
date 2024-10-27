'use client';

import Card from '@/components/Card';
import { supabase } from '@/lib/supabase';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

type Category = {
  name: string;
  selected: boolean;
};

export default function Home() {
  const [products, setProducts] = useState<Category[]>([]);

  const getCategories = async () => {
    const token = Cookies.get('token');
    const { data } = await supabase.auth.getUser(token);
    return supabase.from('categories').select('data').eq('id', data.user?.id);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await getCategories();
        if (error) throw error;
        const categories = data[0].data as Category[];
        setProducts(categories);
        console.log({ categories });
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Card title="Please mark your interest">
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-base font-normal">
            We will keep you notified.
          </span>
        </div>

        <div>
          <span className="text-base font-medium">My Saved Interests!</span>
          {products.map((product, index) => (
            <div key={index} className="py-2 flex items-center gap-2">
              <input type="checkbox" className="border w-6 h-6 rounded-2xl" />
              <span className="text-xl font-medium capitalize">
                {product.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
