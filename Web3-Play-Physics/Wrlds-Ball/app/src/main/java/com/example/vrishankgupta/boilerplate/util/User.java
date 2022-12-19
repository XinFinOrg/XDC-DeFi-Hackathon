package com.example.vrishankgupta.boilerplate.util;

public class User {
    private String fname,lname,password,phone,email;
    private long id;

    public User(String fname, String lname, String password, String phone, String email,long id) {
        this.fname = fname;
        this.lname = lname;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.id = id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {

        return id;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

    public String getPassword() {
        return password;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public void setFname(String fname) {

        this.fname = fname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
