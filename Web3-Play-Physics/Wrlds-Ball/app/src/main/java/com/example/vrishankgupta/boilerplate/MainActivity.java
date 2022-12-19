package com.example.vrishankgupta.boilerplate;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.example.vrishankgupta.boilerplate.util.User;
import com.wrlds.sdk.Ball;

import mehdi.sakout.fancybuttons.FancyButton;

public class MainActivity extends AppCompatActivity {

    static User user;
   static Ball a;
    TextView tv;
    FancyButton scan;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportActionBar().hide();
        user = null;

        ActivityCompat.requestPermissions(MainActivity.this,
                new String[]{
                        Manifest.permission.ACCESS_COARSE_LOCATION,
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.READ_EXTERNAL_STORAGE,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE
                },
                1);

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode) {
            case 1: {

                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                    start();
                } else {
                    Toast.makeText(MainActivity.this,
                            "Permission denied, Please got to Settings to grant permissions.",
                            Toast.LENGTH_SHORT).show();
                }
                return;
            }
        }
    }

    void start()
    {
        a = new Ball(this);
        tv = findViewById(R.id.Hello);
        scan = findViewById(R.id.fancy);
        scan.setText("Scan");
        scan.setRadius(55);
        scan.setTextSize(20);

        a.setOnConnectionStateChangedListener(new Ball.OnConnectionStateChangedListener() {
            @Override
            public void onConnectionStateChanged(int i, String s) {
                scan.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        a.scanForDevices();
                        Log.d("Conn", "onClick: "+a.getConnectionState());
                        Log.d("Devices", "onCreate: " + a.getDeviceList());
                    }
                });
                if(a.getDeviceName() != null )
                {
                    tv.setText("Connected to " + a.getDeviceName() + " Ball");
                    startActivity(new Intent(MainActivity.this,BeforeBounce.class).addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP));
                    finish();
                }
            }
        });

    }
}
