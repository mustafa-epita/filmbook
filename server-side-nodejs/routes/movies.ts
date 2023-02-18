import express, {Request, Response} from 'express';

import movieModel from '../models/movieModel';

let Router = express.Router();

Router.post('/', async (request: Request, response: Response) => {
    const { title, releaseDate, category, movieDirector, backdrop_path, poster_path, description, trailer, cast} = request.body

    let newMovie = new movieModel({
      title,
      releaseDate,
      category,
      movieDirector,
      backdrop_path,
      poster_path,
      description,
      trailer,
      cast
    })

    try {
        let movie = await newMovie.save()
        return response.status(200).json(movie)
    } catch(error) {
        return response.status(500).json({"msg": error})
    }
});

Router.get('/', async (request: Request, response: Response) => {
    try {
        let movies = await movieModel.find({}).sort({ releaseDate: 'desc' });

        return response.status(200).json(movies);
    } catch(error) {
        return response.status(500).json({msg: error});
    }
});

Router.get('/:movieId', async (request: Request, response: Response) => {
    let { movieId } = request.params;
    
    try {
        let movie = await movieModel.findOne({
            _id: movieId
        });

        return response.status(200).json(movie);
    } catch(error) {
        return response.status(500).json({msg: error});
    }
});

Router.delete('/:movieId', async (request: Request, response: Response) => {
    let { movieId } = request.params;

    try {
        await movieModel.findOneAndDelete({
            _id: movieId
        });

        return response.status(200).json({"msg": "Movie was deleted!"});
    } catch (error) {
        return response.status(500).json({msg: error});
    }
});

Router.put('/:movieId', async (request: Request, response: Response) => {
    let { movieId } = request.params;
    const { 
      title,
      releaseDate,
      category,
      movieDirector,
      backdrop_path,
      poster_path,
      description,
      trailer,
      cast 
    } = request.body

    try {
        let movie = await movieModel.findOneAndUpdate({
            _id: movieId
        }, {
          title,
          releaseDate,
          category,
          movieDirector,
          backdrop_path,
          poster_path,
          description,
          trailer,
          cast
        }, {
            new: true
        });

        return response.status(200).json(movie);
    } catch (error) {
        return response.status(500).json({msg: error});
    }
});

Router.post('/:movieId/ratings', async (request: Request, response: Response) => {
    try {
        const movie = await movieModel.findById(request.params.movieId);
        if (!movie) {
            return response.status(404).send({ error: 'Movie not found' });
        }

        const newRating = {
            rating: request.body.rating,
            commentTitle: request.body.commentTitle,
            commentContent: request.body.commentContent,
            userId: request.body.userId
        };

        movie.rating.push(newRating);
        await movie.save();

        response.send({ message: 'Rating added successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).send({ error: 'Server error' });
    }
});

Router.delete('/:movieId/ratings/:ratingId', async (request: Request, response: Response) => {
    try {
        const movie = await movieModel.findById(request.params.movieId);
        if (!movie) {
            return response.status(404).send({ error: 'Movie not found' });
        }

        const rating = movie.rating.id(request.params.ratingId);
        if (!rating) {
            return response.status(404).send({ error: 'Rating not found' });
        }

        rating.remove();
        await movie.save();

        response.send({ message: 'Rating removed successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).send({ error: 'Server error' });
    }
});

Router.get('/search/:query', async (request: Request, response: Response) => {
    try {
      const query = request.params.query;
      if (!query) {
        return response.status(400).send({ error: 'Query is required' });
      }
  
      const regex = new RegExp(query as any, 'i');
      const movies = await movieModel.find({ title: regex });
  
      response.send(movies);
    } catch (error) {
      console.error(error);
      response.status(500).send({ error: 'Server error' });
    }
});

Router.get('/recommended', async (request: Request, response: Response) => {
    try {
        let movies = await movieModel.find({});
        return response.status(200).json(movies);
    } catch(error) {
        return response.status(500).json({msg: error});
    }
});

export default Router;
