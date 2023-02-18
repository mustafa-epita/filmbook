package fr.epita.filmbook.services;

import fr.epita.filmbook.datamodel.Movie;
import fr.epita.filmbook.datamodel.SeenMovie;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SeenMovieJDBCDAO {
    private static final Logger LOGGER = LogManager.getLogger(SeenMovieJDBCDAO.class);

    DataSource dataSource;

    public SeenMovieJDBCDAO(DataSource dataSource){
        this.dataSource = dataSource;
    }

    public List<Movie> getSeenMovies(int userId) {
        System.out.println(userId);
        List<Movie> results = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {

            PreparedStatement statement = connection.prepareStatement("SELECT m.id, m.title, m.external_id, m.added FROM \"SeenMovies\" AS sm INNER JOIN movies AS m ON sm.movie_id = m.id WHERE sm.user_id = ?");
            statement.setInt(1, userId);

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()){
                int id = resultSet.getInt("id");
                String title = resultSet.getString("title");
                String added = resultSet.getString("added");
                String externalId = resultSet.getString("external_id");

                Movie newMovie = new Movie();
                newMovie.setId(id);
                newMovie.setTitle(title);
                newMovie.setAdded(added);
                newMovie.setExternalId(externalId);

                results.add(newMovie);
            }
        } catch (SQLException sqle) {
            LOGGER.error("Error while retrieving seen movies",sqle);
        }
        return results;
    }

    public void addSeenMovies(SeenMovie seenMovie) {
        try (Connection connection = dataSource.getConnection()) {

            PreparedStatement statement = connection.prepareStatement("SELECT id FROM \"movies\" WHERE external_id = '?'");
            statement.setString(1, seenMovie.getMovieExternalId());

            ResultSet resultSet = statement.executeQuery();

            int id = 0;
            while (resultSet.next()){
                id = resultSet.getInt("id");
            }


            statement = connection.prepareStatement("INSERT INTO \"SeenMovies\" (user_id, movie_id) VALUES(?, ?)");
            statement.setInt(1, seenMovie.getUserId());
            statement.setInt(2, id);

            statement.executeQuery();

        } catch (SQLException sqle) {
            LOGGER.error("Error while adding a seen movie",sqle);
        }
    }
}
