import { Schema, model, Types } from 'mongoose'

const ratingSchema = new Schema({
  rating: Number,
  commentTitle: String,
  commentContent: String,
  userId: String
})

const actorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  }
})

const movieSchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true
  },
    releaseDate: {
      type: Date,
      required: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    movieDirector: {
      type: String,
      required: true,
      trim: true
    },
    backdrop_path: {
      type: String,
      required: true,
      trim: true
    },
    poster_path: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    trailer: {
      type: String,
      required: true,
      trim: true
    },
    cast: {
      type: [actorSchema],
      required: false,
    },
    rating: [ratingSchema]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default model('Movie', movieSchema);