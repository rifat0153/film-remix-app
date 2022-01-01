import { LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { Film, getFilmById } from "~/api/films_api";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, "Expected params.filmId");

  const film = await getFilmById(params.filmId);

  return film;
};

export default function Film() {
  const film = useLoaderData<Film>();

  return <div>{film.title}</div>;
}
