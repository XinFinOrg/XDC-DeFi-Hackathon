package com.example.vrishankgupta.boilerplate;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Build;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.wrlds.sdk.Ball;

import org.w3c.dom.Text;

import mehdi.sakout.fancybuttons.FancyButton;

public class AfterBounce extends AppCompatActivity {

    TextView tv,userName;
    FancyButton fancyButton,counter;
    static public String name = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_after_bounce);
        tv = findViewById(R.id.forceValue);
        counter = findViewById(R.id.counter);
        counter.setText("No. of bounces:- " + BeforeBounce.count);
        userName = findViewById(R.id.username);
        if(MainActivity.user!=null)
        {
            userName.setText(userName.getText() + " " + MainActivity.user.getFname());
        }
        counter.setRadius(55);
        counter.setTextSize(25);
        fancyButton = findViewById(R.id.fancy);
        fancyButton.setText("Reset");
        fancyButton.setRadius(55);
        fancyButton.setTextSize(30);
        Intent intent = getIntent();
        String force = intent.getStringExtra("force");

        MainActivity.a.setOnBounceListener(new Ball.OnBounceListener() {
            @Override
            public void onBounce(int i, float v) {
                if(v > 10)
                {
                    BeforeBounce.count++;
                    float number = v;
                    String numberAsString = String.format ("%,.3f", number);
                    counter.setText("No. of bounces:- " + BeforeBounce.count);

                    tv.setText("Normal Force:- "+numberAsString+"N");

                    if(BeforeBounce.count >=5 && MainActivity.user == null)
                    {
                        Toast.makeText(AfterBounce.this, "Login To Continue", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(AfterBounce.this,RegistrationActivity.class));
                        finish();
                    }
                }
            }
        });
        fancyButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                BeforeBounce.count = 0;
                name = "";
                startActivity(new Intent(AfterBounce.this,BeforeBounce.class));
                finish();
            }
        });




//        tv.setText("Normal Force:- "+force+"N");
        Log.d("After", "onCreate: " + force);


    }
}
