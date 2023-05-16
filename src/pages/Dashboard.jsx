import { useState, useEffect } from 'react';
import { Loader, Card, FormField } from '../components';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://lulai-backend.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();

        setAllPosts(result.data.reverse());
      };
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Diseños creados por nuestra Comunidad &#10084;</h1>
        <p className="mt-2 text-[#666E75] text-[16px] max-w-[500px]">Explore una colección de diseños imaginativos y visualmente impresionantes generados por Inteligencia Artificial.</p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Buscar Imágenes"
          type="text"
          name="text"
          placeholder="Buscar Posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="bg-[#FF31A0] mt-5 text-center py-2 lg:px-4 border rounded-lg">
        <div
          className="p-2 #02060A items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert">
          <span className="flex rounded-full bg-[#35C7FC] uppercase px-2 py-1 text-xs font-bold mr-3">
            Nota
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
          Si las publicaciones no se han cargado, te pedimos que por favor esperes de 1 a 2 minutos. ¡Gracias por tu paciencia! ;)
          </span>
        </div>
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText &&
              <h2 className="font-medium text-[#666E75] text-xl mb-3">
                Showing results for <span className="text-[#222328]">{searchText}</span>
              </h2>
            }
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No posts found"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    return data.map((post) => <Card key={post.id} {...post} />);

  return (
    <h2 className="mt-5 font-bold text-[#6449FF] text-xl uppercase">{title}</h2>
  );
};

export default Dashboard;