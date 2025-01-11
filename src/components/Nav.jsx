const Nav = ({ setQuery }) => {
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setQuery(e.target.value); 
    }
  };

  return (
    <div className="flex bg-slate-600 py-5 rounded text-white justify-around shadow-2xl">
      <div>
        <h1 className="text-3xl">IDOTIC MOVIES</h1>
      </div>
      <div>
        <input
          type="text"
          id="search"
          className="w-80 h-10 pl-3 text-black"
          placeholder="Search Movies"
          onKeyDown={handleSearch} 
        />
      </div>
    </div>
  );
};

export default Nav;
