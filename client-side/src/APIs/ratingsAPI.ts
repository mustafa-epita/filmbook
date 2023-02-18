import { Rating } from "../models/Film";

export const postRating = async (rating: Rating, movieId: string) => {
  await fetch(`http://localhost:4500/movies/${movieId}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rating),
  })
}