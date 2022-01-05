import { LoaderFunction, Outlet, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { Film, getFilmById } from "~/api/films_api";
import CharacterList from "~/components/CharacterList";
import FilmBanner from "~/components/FilmBanner";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, "Expected params.filmId");

  const film = await getFilmById(params.filmId);

  return film;
};

export default function Film() {
  const film = useLoaderData<Film>();

  return (
    <div>
      <FilmBanner film={film} />

      <div className="p-10">
        {film.description}

        <div className="flex py-5 space-x-5">
          <CharacterList characters={film.characters} />

          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
