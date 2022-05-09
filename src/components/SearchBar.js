import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = () => {
  return (
    <div className="mt-2">
      <div className="mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <SearchIcon className="h-5 w-5 text-white-50" />
        <input
          type="text"
          placeholder="Search by City, Restaurant Name or Prices lower than..."
          className="flex-1 bg-transparent outline-none min-w-[350px]"
        />
      </div>
    </div>
  );
};

export default SearchBar;
