package com.example.vrishankgupta.boilerplate;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import com.google.android.youtube.player.YouTubeBaseActivity;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayerView;
import com.wrlds.sdk.Ball;

import mehdi.sakout.fancybuttons.FancyButton;


public class BeforeBounce extends YouTubeBaseActivity implements YouTubePlayer.OnInitializedListener {
    static int count = 0;

    Ball a;
    ImageView img;
    FancyButton helpButton;
    public static final String API_KEY = "AIzaSyCE7i9MJ3YuDuqy9cn4YqgSf-qDESbgXh4";
    public static final String VIDEOID = "aA_mqSzbkM0";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_before);
        img = findViewById(R.id.img);
        a=MainActivity.a;
        YouTubePlayerView youTubePlayerView = findViewById(R.id.ytPlayer);
        youTubePlayerView.initialize(API_KEY,this);

        helpButton = findViewById(R.id.help);
        helpButton.setText("More");
        helpButton.setRadius(55);
        helpButton.setTextSize(30);

        helpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(BeforeBounce.this,HelpActivity.class));
            }
        });

        a.setOnShakeListener(new Ball.OnShakeListener() {
            @Override
            public void onShake(float v) {
                Toast.makeText(a, "Shaken"  + v, Toast.LENGTH_SHORT).show();
            }
        });
        a.setOnBounceListener(new Ball.OnBounceListener() {
            @Override
            public void onBounce(int i, float v) {
                Log.d("BounceType", Ball.BounceType.HARD + "");
                String str = String.valueOf(v);
                if(v > 10)
                {
                    count++;
                    startActivity(new Intent(BeforeBounce.this,AfterBounce.class).putExtra("force",str).addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP));
                    finish();
                }
            }
        });

    }

    @Override
    public void onInitializationSuccess(YouTubePlayer.Provider provider, YouTubePlayer youTubePlayer, boolean b) {
        youTubePlayer.setPlayerStateChangeListener(playerStateChangeListener);
        youTubePlayer.setPlaybackEventListener(playbackEventListener);

        if(!b)
        {
            youTubePlayer.cueVideo(VIDEOID);
        }

    }

    @Override
    public void onInitializationFailure(YouTubePlayer.Provider provider, YouTubeInitializationResult youTubeInitializationResult) {

    }

    private YouTubePlayer.PlayerStateChangeListener playerStateChangeListener = new YouTubePlayer.PlayerStateChangeListener() {
        @Override
        public void onLoading() {

        }

        @Override
        public void onLoaded(String s) {

        }

        @Override
        public void onAdStarted() {

        }

        @Override
        public void onVideoStarted() {

        }

        @Override
        public void onVideoEnded() {

        }

        @Override
        public void onError(YouTubePlayer.ErrorReason errorReason) {

        }
    };

    private YouTubePlayer.PlaybackEventListener playbackEventListener = new YouTubePlayer.PlaybackEventListener() {
        @Override
        public void onPlaying() {

        }

        @Override
        public void onPaused() {

        }

        @Override
        public void onStopped() {

        }

        @Override
        public void onBuffering(boolean b) {

        }

        @Override
        public void onSeekTo(int i) {

        }
    };
}
