package se.nordiskamuseet.aretsdagar;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, se.nordiskamuseet.aretsdagar.MainActivity.class);
        startActivity(intent);
        finish();
    }
}
