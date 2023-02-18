package fr.epita.filmbook.datamodel;

public class User {
    private int id;
    private String username;
    private int roleId;
    private String password;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "{" +
                "\"id\":" + id +
                ", \"username\":\"" + username + '\"' +
                ", \"role\":\"" + roleId + '\"' +
                '}';
    }
}
