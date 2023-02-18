package fr.epita.filmbook.datamodel;

public class Address {

    private  int id;
    private String country;
    private String area;
    private String city;
    private String street;
    private String number;

    private String contactId;

    public Address(int id, String country, String area, String city, String street, String number, String contactId) {
        this.id = id;
        this.country = country;
        this.area = area;
        this.city = city;
        this.street = street;
        this.number = number;
        this.contactId = contactId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getContactId() {
        return contactId;
    }

    public void setContactId(String contactId) {
        this.contactId = contactId;
    }
}
