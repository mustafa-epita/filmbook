package fr.epita.filmbook.datamodel;

public class SeenMovie {

    private int id;
    private int userId;
    private int movieId;

    private String movieExternalId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public String getMovieExternalId() {
        return movieExternalId;
    }

    public void setMovieExternalId(String movieExternalId) {
        this.movieExternalId = movieExternalId;
    }
}
