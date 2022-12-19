package com.example.vrishankgupta.boilerplate;

import android.content.ContentValues;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.vrishankgupta.boilerplate.util.DatabaseHelper;
import com.example.vrishankgupta.boilerplate.util.User;

public class RegistrationActivity extends AppCompatActivity {

    SQLiteOpenHelper openHelper;
    SQLiteDatabase db;

    Button login,btnReg;
    long id;
    EditText etFname,etLname,etPassword,etEmail,etPhone;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);
        openHelper = new DatabaseHelper(this);
        btnReg = findViewById(R.id.btnReg);
        etEmail = findViewById(R.id.etemail);
        etLname = findViewById(R.id.etlname);
        etFname = findViewById(R.id.etfname);
        etPassword = findViewById(R.id.etpassword);
        etPhone = findViewById(R.id.etphone);
        login = findViewById(R.id.login);
        MainActivity.a.setOnBounceListener(null);

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(RegistrationActivity.this,LoginActivity.class));
                finish();
            }
        });

        btnReg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                db = openHelper.getWritableDatabase();
                String fName = etFname.getText().toString();
                String lname = etLname.getText().toString();
                String password = etPassword.getText().toString();
                String email = etEmail.getText().toString();
                String phone = etPhone.getText().toString();
                insertData(fName,lname,password,email,phone);
                Toast.makeText(RegistrationActivity.this, "Successful", Toast.LENGTH_SHORT).show();

                 MainActivity.user = new User(fName,lname,password,phone,email,id);
                 startActivity(new Intent(RegistrationActivity.this,AfterBounce.class));
                 finish();

            }
        });
    }

    public void insertData(String fname,String lname, String password, String email, String  phone)
    {
        ContentValues contentValues = new ContentValues();
        contentValues.put(DatabaseHelper.COL_2,fname);
        contentValues.put(DatabaseHelper.COL_3,lname);
        contentValues.put(DatabaseHelper.COL_4,password);
        contentValues.put(DatabaseHelper.COL_5,email);
        contentValues.put(DatabaseHelper.COL_6,phone);

        id = db.insert(DatabaseHelper.TABLE_NAME,null,contentValues);
    }
}
