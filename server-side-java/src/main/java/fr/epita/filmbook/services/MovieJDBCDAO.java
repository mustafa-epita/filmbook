package fr.epita.filmbook.services;

import fr.epita.filmbook.datamodel.Movie;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import javax.sql.DataSource;
import java.sql.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class MovieJDBCDAO {
    private static final Logger LOGGER = LogManager.getLogger(MovieJDBCDAO.class);

    DataSource dataSource;

    public MovieJDBCDAO(DataSource dataSource){
        this.dataSource = dataSource;
    }

    public List<Movie> read(int movieId) {
        List<Movie> results = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {

            PreparedStatement statement = connection.prepareStatement("SELECT id, title, added, external_id FROM movies");

            if (movieId > 0){
                statement = connection.prepareStatement("SELECT id, title, added, external_id FROM movies WHERE id = ?");
                statement.setInt(1, movieId);
            }

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
            LOGGER.error("error while doing the searching",sqle);
        }
        return results;
    }

    public Movie searchByExternalId(Movie movie) {
        List<Movie> results = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("SELECT id, title, added, external_id FROM Movies WHERE external_id = ?");
            statement.setString(1, movie.getExternalId());
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()){
                int id = resultSet.getInt("id");
                String title = resultSet.getString("title");
                String added = resultSet.getString("added");
                String externalId = resultSet.getString("externalId");

                Movie newMovie = new Movie();
                newMovie.setId(id);
                newMovie.setTitle(title);
                newMovie.setAdded(added);
                newMovie.setExternalId(externalId);

                results.add(newMovie);
            }
        } catch (SQLException sqle) {
            LOGGER.error("error while doing the searching",sqle);
        }
        return results.get(0);
    }

    public void create(Movie movie) {
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO Movies(title, added, external_id) VALUES(?, ?, ?)", Statement.RETURN_GENERATED_KEYS);

            Date addedDate = null;

            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate localDate = LocalDate.parse("2023-02-02", dateFormatter);
            addedDate = java.sql.Date.valueOf(localDate);

            System.out.println(addedDate);

            statement.setString(1, movie.getTitle());
            statement.setDate(2, addedDate);
            statement.setString(3, movie.getExternalId());
            statement.executeUpdate();
            ResultSet generatedKeys = statement.getGeneratedKeys();
            generatedKeys.next();
            int id = generatedKeys.getInt("id");
            movie.setId(id);
        } catch (SQLException sqle) {
            LOGGER.error("error while doing the insertion",sqle);
        }
    }

    public void update(Movie movie) {
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("UPDATE Movies SET title = ?, added = ?, external_id = ? WHERE id = ?", Statement.RETURN_GENERATED_KEYS);

            Date addedDate = null;

            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate localDate = LocalDate.parse("2023-02-02", dateFormatter);
            addedDate = java.sql.Date.valueOf(localDate);

            System.out.println(addedDate);

            statement.setString(1, movie.getTitle());
            statement.setDate(2, addedDate);
            statement.setString(3, movie.getExternalId());
            statement.setInt(4, movie.getId());

            statement.executeUpdate();
            ResultSet generatedKeys = statement.getGeneratedKeys();
            generatedKeys.next();
            int id = generatedKeys.getInt("id");
            movie.setId(id);
        } catch (SQLException sqle) {
            LOGGER.error("error while doing the insertion",sqle);
        }
    }

    public void delete(int id) {
        System.out.println(id);
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("DELETE FROM Movies WHERE id = ?", Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, id);
            statement.executeUpdate();
        } catch (SQLException sqle) {
            LOGGER.error("error while doing the insertion",sqle);
        }
    }
}
