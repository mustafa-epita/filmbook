package fr.epita.filmbook.services;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

public class DBConnection {
    public DataSource dataSource () {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl("jdbc:postgresql://localhost:5432/filmbookDB");
        dataSource.setPassword("postgres");
        dataSource.setUsername("faris");
        return dataSource;
    }
}
