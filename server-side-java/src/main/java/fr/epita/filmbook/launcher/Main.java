package fr.epita.filmbook.launcher;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpServer;
import fr.epita.filmbook.datamodel.Movie;
import fr.epita.filmbook.datamodel.SeenMovie;
import fr.epita.filmbook.datamodel.User;
import fr.epita.filmbook.services.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) throws IOException {
        long beforeInit = System.currentTimeMillis();

        DBConnection dbConnection = new DBConnection();
        MovieJDBCDAO movieDao = new MovieJDBCDAO(dbConnection.dataSource());
        UserJDBCDAO userDao = new UserJDBCDAO(dbConnection.dataSource());
        SeenMovieJDBCDAO seenMovieJDBCDAO = new SeenMovieJDBCDAO(dbConnection.dataSource());


        StringConversionService stringService = new JsonConversionService();
        HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0",8092), 0);
        server.createContext("/movies", exchange -> {

            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

            String requestMethod = exchange.getRequestMethod();
            String response = "";
            int statusCode = HttpURLConnection.HTTP_OK;

            switch (requestMethod) {
                case "GET": {
                    String[] parts = String.valueOf(exchange.getRequestURI()).split("/");
                    int id = 0;

                    try {
                        id = Integer.parseInt((parts[parts.length - 1]));
                    } catch (Exception e) {}

                    List<Movie> movies = movieDao.read(id);
                    response = String.valueOf(stringService.convert(movies));
                    break;
                }
                case "POST": {
                    InputStream requestBody = exchange.getRequestBody();
                    String requestBodyString = new BufferedReader(new InputStreamReader(requestBody))
                            .lines().collect(Collectors.joining(System.lineSeparator()));
                    ObjectMapper mapper = new ObjectMapper();
                    Movie newMovie = null;

                    try {
                        System.out.println(requestBodyString);
                        newMovie = mapper.readValue(requestBodyString, Movie.class);
                    } catch (JsonProcessingException e) {
                        System.out.println(e);
                        response = "Invalid request body format";
                        statusCode = HttpURLConnection.HTTP_BAD_REQUEST;
                        break;
                    }
                    System.out.println(newMovie.toString());
                    movieDao.create(newMovie);
                    response = newMovie.toString();
                    break;
                }
                case "PUT": {
                    InputStream requestBody = exchange.getRequestBody();
                    String requestBodyString = new BufferedReader(new InputStreamReader(requestBody))
                            .lines().collect(Collectors.joining(System.lineSeparator()));
                    ObjectMapper mapper = new ObjectMapper();
                    Movie updatedMovie = null;
                    try {
                        System.out.println();
                        System.out.println(requestBodyString);
                        updatedMovie = mapper.readValue(requestBodyString, Movie.class);
                    } catch (JsonProcessingException e) {
                        System.out.println(e);
                        response = "Invalid request body format";
                        statusCode = HttpURLConnection.HTTP_BAD_REQUEST;
                        break;
                    }

                    movieDao.update(updatedMovie);
                    response = updatedMovie.toString();
                    break;
                }
                case "DELETE": {
                    String[] parts = String.valueOf(exchange.getRequestURI()).split("/");
                    int id = 0;

                    try {
                        id = Integer.parseInt((parts[parts.length - 1]));
                    } catch (Exception e) {
                        response = "Movie not found";
                        statusCode = HttpURLConnection.HTTP_NOT_FOUND;
                        break;
                    }

                    try {
                        movieDao.delete(id);
                    } catch (Exception e) {
                        response = "There was an error deleting the movie";
                        statusCode = HttpURLConnection.HTTP_INTERNAL_ERROR;
                        break;
                    }
                    response = "Movie was deleted!";
                    break;
                }
            }
            exchange.sendResponseHeaders(statusCode, response.getBytes().length);
            exchange.getResponseBody().write(response.getBytes());
            exchange.close();
        });

        server.createContext("/movies/seen", exchange -> {
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

            String requestMethod = exchange.getRequestMethod();
            String response = "";
            int statusCode = HttpURLConnection.HTTP_OK;

            switch (requestMethod) {
                case "GET": {
                    String query = exchange.getRequestURI().getQuery();

                    int userId = Integer.parseInt(query.split("=")[1]);


                    List<Movie> movies = seenMovieJDBCDAO.getSeenMovies(userId);



                    URL url = new URL("http://localhost:4500/movies/63e7f002c0e5e873e4eacfa3");

                    HttpURLConnection con = (HttpURLConnection) url.openConnection();
                    con.setRequestMethod("GET");

                    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                    String inputLine;
                    StringBuilder apiResponse = new StringBuilder();
                    while ((inputLine = in.readLine()) != null) {
                        apiResponse.append(inputLine);
                    }
                    in.close();


                    System.out.println(apiResponse.toString());
                    System.out.println("was the res");



                    response = String.valueOf(stringService.convert(movies));
                    break;
                }
                case "POST": {
                    InputStream requestBody = exchange.getRequestBody();
                    String requestBodyString = new BufferedReader(new InputStreamReader(requestBody))
                            .lines().collect(Collectors.joining(System.lineSeparator()));
                    ObjectMapper mapper = new ObjectMapper();
                    SeenMovie seenMovie = null;

                    try {
                        System.out.println(requestBodyString);
                        seenMovie = mapper.readValue(requestBodyString, SeenMovie.class);
                    } catch (JsonProcessingException e) {
                        System.out.println(e);
                        response = "Invalid request body format";
                        statusCode = HttpURLConnection.HTTP_BAD_REQUEST;
                        break;
                    }
                    seenMovieJDBCDAO.addSeenMovies(seenMovie);

                    response = seenMovie.toString();
                    break;
                }
            }
            exchange.sendResponseHeaders(statusCode, response.getBytes().length);
            exchange.getResponseBody().write(response.getBytes());
            exchange.close();
        });

        server.createContext("/users", exchange -> {
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

            String requestMethod = exchange.getRequestMethod();
            String response = "";
            int statusCode = HttpURLConnection.HTTP_OK;

            switch (requestMethod) {
                case "GET": {
                    String[] parts = String.valueOf(exchange.getRequestURI()).split("/");
                    int id = 0;

                    try {
                        id = Integer.parseInt((parts[parts.length - 1]));
                    } catch (Exception e) {}

                    User user = userDao.readById(id);
                    response = String.valueOf(user.toString());
                    break;
                }
            }
            exchange.sendResponseHeaders(statusCode, response.getBytes().length);
            exchange.getResponseBody().write(response.getBytes());
            exchange.close();
        });

        server.createContext("/users/login", exchange -> {
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

            String requestMethod = exchange.getRequestMethod();
            String response = "";
            int statusCode = HttpURLConnection.HTTP_OK;

            switch (requestMethod) {
                case "POST":
                    InputStream requestBody = exchange.getRequestBody();
                    String requestBodyString = new BufferedReader(new InputStreamReader(requestBody))
                            .lines().collect(Collectors.joining(System.lineSeparator()));
                    ObjectMapper mapper = new ObjectMapper();
                    User user = null;

                    try {
                        user = mapper.readValue(requestBodyString, User.class);
                    } catch (JsonProcessingException e) {
                        System.out.println(e);
                        response = "Invalid request body format";
                        statusCode = HttpURLConnection.HTTP_BAD_REQUEST;
                        break;
                    }
                    User resultUser = userDao.read(user);

                    if (resultUser == null) {
                        response = "User doesn't exist";
                        statusCode = HttpURLConnection.HTTP_NOT_FOUND;
                        break;
                    }
                    response = resultUser.toString();
                    break;
            }
            exchange.sendResponseHeaders(statusCode, response.getBytes().length);
            exchange.getResponseBody().write(response.getBytes());
            exchange.close();
        });

        server.createContext("/users/register", exchange -> {
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

            String requestMethod = exchange.getRequestMethod();
            String response = "";
            int statusCode = HttpURLConnection.HTTP_OK;

            switch (requestMethod) {
                case "POST":
                    InputStream requestBody = exchange.getRequestBody();
                    String requestBodyString = new BufferedReader(new InputStreamReader(requestBody))
                            .lines().collect(Collectors.joining(System.lineSeparator()));
                    ObjectMapper mapper = new ObjectMapper();
                    User user = null;

                    try {
                        System.out.println(requestBodyString);
                        user = mapper.readValue(requestBodyString, User.class);
                    } catch (JsonProcessingException e) {
                        System.out.println(e);
                        response = "Invalid request body format";
                        statusCode = HttpURLConnection.HTTP_BAD_REQUEST;
                        break;
                    }

                    userDao.create(user);
                    System.out.println(user);
                    response = user.toString();
                    break;
            }
            exchange.sendResponseHeaders(statusCode, response.getBytes().length);
            exchange.getResponseBody().write(response.getBytes());
            exchange.close();
        });
        server.start();
        long afterInit = System.currentTimeMillis();
        System.out.println("initialization in " + (afterInit - beforeInit) +" ms");
    }
}