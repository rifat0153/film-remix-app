import { Form, Link, LoaderFunction, useLoaderData } from "remix";
import { Film, getFilms } from "~/api/films_api";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  return getFilms(title);
};

export default function filmsIndex() {
  const films = useLoaderData<Film[]>();
  return (
    <div className="p-16 font-sans">
      <h1 className="pb-16 text-5xl font-bold text-center">
        Studio Ghilbi Films
      </h1>

      <Form reloadDocument className="py-5">
        <label className="font-bold">
          Search{" "}
          <input
            type="text"
            name="title"
            placeholder="type a title..."
            className="border-2 rounded py-2 px-3"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white 
        font-bold px-4 py-2 mx-2 rounded"
        >
          Search
        </button>
      </Form>

      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          <Link
            to={film.id}
            title={film.title}
            key={film.id}
            prefetch="none"
            className="hover:shadow-2xl hover:scale-105 hover:font-bold hover:cursor-pointer"
          >
            <div>{film.title}</div>
            <img src={film.image} alt={film.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}
