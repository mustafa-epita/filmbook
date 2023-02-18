package fr.epita.filmbook.datamodel;

public class Movie {
    private int id;
    private String title;
    private String added;
    private String externalId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAdded() {
        return added;
    }

    public void setAdded(String added) {
        this.added = added;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String external_id) {
        this.externalId = external_id;
    }

    @Override
    public String toString() {
        return "{" +
                "\"id\":" + id +
                ", \"title\":\"" + title + '\"' +
                ", \"added\":\"" + added + '\"' +
                ", \"externalId\":\"" + externalId + '\"' +
                '}';
    }
}
