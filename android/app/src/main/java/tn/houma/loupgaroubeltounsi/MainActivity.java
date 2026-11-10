package tn.houma.loupgaroubeltounsi;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // doit être appelé AVANT super.onCreate
        registerPlugin(LanRoomPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
