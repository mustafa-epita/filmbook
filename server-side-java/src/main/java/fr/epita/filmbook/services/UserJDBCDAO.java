package fr.epita.filmbook.services;

import fr.epita.filmbook.datamodel.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.sql.DataSource;
import java.sql.*;

public class UserJDBCDAO {

    private static final Logger LOGGER = LogManager.getLogger(UserJDBCDAO.class);

    DataSource dataSource;

    public UserJDBCDAO(DataSource dataSource){
        this.dataSource = dataSource;
    }
    public User read(User user) {
        User result = null;
        try (Connection connection = dataSource.getConnection()) {

            PreparedStatement statement = connection.prepareStatement("SELECT id, username, password, role_id FROM \"Users\" WHERE username = ? AND password = ?");
            statement.setString(1, user.getUsername());
            statement.setString(2, user.getPassword());

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()){
                int id = resultSet.getInt("id");
                String username = resultSet.getString("username");
                int roleId = resultSet.getInt("role_id");

                User resultUser = new User();
                resultUser.setId(id);
                resultUser.setUsername(username);
                resultUser.setRoleId(roleId);

                result = resultUser;
            }

        } catch (SQLException sqle) {
            LOGGER.error("Error while retrieving user",sqle);
        }
        return result;
    }

    public User readById(int userId) {
        User result = null;
        try (Connection connection = dataSource.getConnection()) {

            PreparedStatement statement = connection.prepareStatement("SELECT id, username, role_id FROM \"Users\" WHERE id = ?");
            statement.setInt(1, userId);

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()){
                int id = resultSet.getInt("id");
                String username = resultSet.getString("username");
                int roleId = resultSet.getInt("role_id");

                User resultUser = new User();
                resultUser.setId(id);
                resultUser.setUsername(username);
                resultUser.setRoleId(roleId);

                result = resultUser;
            }

        } catch (SQLException sqle) {
            LOGGER.error("Error while retrieving user",sqle);
        }
        return result;
    }

    public void create(User user) {
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO \"Users\" (username, role_id, password) VALUES(?, ?, ?)", Statement.RETURN_GENERATED_KEYS);

            statement.setString(1, user.getUsername());
            statement.setInt(2, user.getRoleId());
            statement.setString(3, user.getPassword());
            statement.executeUpdate();

            ResultSet generatedKeys = statement.getGeneratedKeys();
            generatedKeys.next();
            int id = generatedKeys.getInt("id");
            user.setId(id);
        } catch (SQLException sqle) {
            LOGGER.error("Error while creating user",sqle);
        }
    }

    public void update(User user) {
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("UPDATE \"Users\" SET username = ?, role_id = ? WHERE id = ?", Statement.RETURN_GENERATED_KEYS);

            statement.setString(1, user.getUsername());
            statement.setInt(2, user.getRoleId());
            statement.setInt(3, user.getId());

            statement.executeUpdate();
            ResultSet generatedKeys = statement.getGeneratedKeys();
            generatedKeys.next();
            int id = generatedKeys.getInt("id");
            user.setId(id);
        } catch (SQLException sqle) {
            LOGGER.error("Error while editing user",sqle);
        }
    }

    public void delete(int id) {
        System.out.println(id);
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("DELETE FROM \"Users\" WHERE id = ?", Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, id);
            statement.executeUpdate();
        } catch (SQLException sqle) {
            LOGGER.error("Error while deleting user",sqle);
        }
    }
}
