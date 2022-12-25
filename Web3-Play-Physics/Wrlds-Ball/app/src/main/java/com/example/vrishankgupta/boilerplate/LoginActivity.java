package com.example.vrishankgupta.boilerplate;

import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.vrishankgupta.boilerplate.util.DatabaseHelper;
import com.example.vrishankgupta.boilerplate.util.User;

public class LoginActivity extends AppCompatActivity {

    SQLiteDatabase db;
    SQLiteOpenHelper openHelper;
    EditText etEmail,etPassword;
    Button btnLogin;
    Cursor cursor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        openHelper = new DatabaseHelper(this);
        etEmail = findViewById(R.id.etemail);
        etPassword = findViewById(R.id.etpassword);
        btnLogin = findViewById(R.id.btnLogin);
        MainActivity.a.setOnBounceListener(null);
        db = openHelper.getReadableDatabase();


        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = etEmail.getText().toString();
                String password = etPassword.getText().toString();
                cursor = db.rawQuery("SELECT * FROM " + DatabaseHelper.TABLE_NAME + " WHERE " + DatabaseHelper.COL_5 + "=? AND " + DatabaseHelper.COL_4 + " =? ",
                        new String[]{email,password});

                if(cursor!=null)
                {
                    if(cursor.getCount() > 0)
                    {
                        cursor.moveToNext();
                        Toast.makeText(LoginActivity.this, "Login Successful", Toast.LENGTH_SHORT).show();
                        Log.d("cursor", "onClick: "+ cursor.getString(1));
                        String fname,lname,phone;
                        long id = 1;
                        fname = cursor.getString(1);
                        lname = cursor.getColumnName(2);
                        phone = cursor.getString(5);
                        MainActivity.user = new User(fname,lname,password,phone,email,id);
                        startActivity(new Intent(LoginActivity.this,AfterBounce.class));
                        finish();
                    }
                    else
                        Toast.makeText(LoginActivity.this, "Error", Toast.LENGTH_SHORT).show();

                }
            }
        });
    }
}
