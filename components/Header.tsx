import React from 'react';
import { ChevronLeft, ChevronRight, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const tabs = [
  { label: 'Categories', url: '/categories' },
  { label: 'Sale', url: '/sale' },
  { label: 'Clearance', url: '/clearance' },
  { label: 'New Stock', url: '/new-stock' },
  { label: 'Trending', url: '/trending' },
];

const Tabs = () => {
  return (
    <ul className="flex items-center gap-4 justify-between w-full max-w-96">
      {tabs.map((tab) => (
        <li key={tab.url}>
          <a
            className="font-semibold text-sm md:text-base whitespace-nowrap"
            href={tab.url}
          >
            {tab.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Actions = () => {
  return (
    <ul className="flex gap-4 items-center">
      <li className="h-8 w-8">
        <button className="hover:bg-gray-100 transition-colors p-1 rounded-md">
          <Search size={20} />
        </button>
      </li>
      <li className="h-8 w-8">
        <button className="hover:bg-gray-100 transition-colors p-1 rounded-md">
          <ShoppingCart size={20} />
        </button>
      </li>
    </ul>
  );
};

const Support = () => {
  return (
    <div className="flex justify-end py-2">
      <ul className="flex gap-5">
        <li className="font-normal text-xs">Help</li>
        <li className="font-normal text-xs">Order & Returns</li>
        <li className="font-normal text-xs">Hi! John</li>
      </ul>
    </div>
  );
};

const Header = () => {
  return (
    <>
      <header className="px-10 pb-4">
        <Support />
        <div className="flex justify-between items-end flex-wrap">
          <Link href="/">
            <h1 className="text-3xl cursor-pointer font-bold">ECOMMERCE</h1>
          </Link>
          <div className="hidden md:block -ml-24">
            <Tabs />
          </div>
          <Actions />
          <div className="md:hidden w-full flex justify-center">
            <Tabs />
          </div>
        </div>
      </header>
      <div className="bg-[#F4F4F4] gap-4 flex px-10 justify-center items-center py-1.5">
        <ChevronLeft size={16} />
        <span className="font-medium text-sm">
          Get 10% off on business sign up
        </span>
        <ChevronRight size={16} />
      </div>
    </>
  );
};

export default Header;
