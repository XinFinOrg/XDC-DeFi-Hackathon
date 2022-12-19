package com.example.vrishankgupta.boilerplate;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import gr.net.maroulis.library.EasySplashScreen;

public class Splash extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        View easySplashScreenView = new EasySplashScreen(Splash.this)
                .withFullScreen()
                .withTargetActivity(MainActivity.class)
                .withSplashTimeOut(3000)
                .withBackgroundResource(android.R.color.white)
                .withBeforeLogoText("Play Physics")
                .withBackgroundResource(R.drawable.ballimage)
                .create();

        setContentView(easySplashScreenView);

    }
}
