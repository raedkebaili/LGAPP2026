package tn.houma.loupgaroubeltounsi;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * LanRoom — petit concentrateur WebSocket qui tourne SUR le téléphone du
 * المعلّم. Les autres appareils s'y connectent avec un WebSocket ordinaire,
 * donc eux n'ont besoin d'aucun code natif (iPhone et PWA compris).
 *
 * Volontairement « bête » : aucune logique de jeu ici. On transporte des
 * chaînes, tout le reste est en TypeScript.
 */
@CapacitorPlugin(name = "LanRoom")
public class LanRoomPlugin extends Plugin {

    private Hub hub;
    private final Map<String, WebSocket> peers = new ConcurrentHashMap<>();
    private final AtomicInteger seq = new AtomicInteger(0);

    // ─── API exposée au JavaScript ──────────────────────────────

    @PluginMethod
    public void info(PluginCall call) {
        JSObject r = new JSObject();
        r.put("ip", lanIp());
        r.put("running", hub != null);
        r.put("clients", peers.size());
        call.resolve(r);
    }

    @PluginMethod
    public void start(final PluginCall call) {
        final int port = call.getInt("port", 8787);
        shutdown();
        try {
            hub = new Hub(port, call);
            hub.setReuseAddr(true);
            hub.setConnectionLostTimeout(25);
            hub.start();
            // la réponse part depuis onStart() / onError()
        } catch (Exception e) {
            hub = null;
            call.reject("ما نجّمتش نحلّ السيرفور: " + e.getMessage());
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        shutdown();
        call.resolve();
    }

    @PluginMethod
    public void send(PluginCall call) {
        String to = call.getString("to");
        String data = call.getString("data", "");
        WebSocket ws = to == null ? null : peers.get(to);
        if (ws != null && ws.isOpen()) ws.send(data);
        call.resolve();
    }

    @PluginMethod
    public void broadcast(PluginCall call) {
        String data = call.getString("data", "");
        for (WebSocket ws : peers.values()) {
            if (ws.isOpen()) {
                try { ws.send(data); } catch (Exception ignored) { }
            }
        }
        call.resolve();
    }

    @PluginMethod
    public void kick(PluginCall call) {
        String to = call.getString("to");
        WebSocket ws = to == null ? null : peers.get(to);
        if (ws != null) ws.close(4000, "kicked");
        call.resolve();
    }

    @Override
    protected void handleOnDestroy() {
        shutdown();
    }

    // ─── Interne ────────────────────────────────────────────────

    private void shutdown() {
        peers.clear();
        if (hub != null) {
            final Hub h = hub;
            hub = null;
            new Thread(new Runnable() {
                public void run() {
                    try { h.stop(800); } catch (Exception ignored) { }
                }
            }).start();
        }
    }

    /** Première adresse IPv4 privée non-loopback. */
    private String lanIp() {
        try {
            List<NetworkInterface> ifaces = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface ni : ifaces) {
                if (!ni.isUp() || ni.isLoopback()) continue;
                for (InetAddress a : Collections.list(ni.getInetAddresses())) {
                    if (a.isLoopbackAddress() || !(a instanceof Inet4Address)) continue;
                    if (a.isSiteLocalAddress()) return a.getHostAddress();
                }
            }
            // repli : n'importe quelle IPv4 non-loopback
            for (NetworkInterface ni : ifaces) {
                if (!ni.isUp() || ni.isLoopback()) continue;
                for (InetAddress a : Collections.list(ni.getInetAddresses())) {
                    if (!a.isLoopbackAddress() && a instanceof Inet4Address) return a.getHostAddress();
                }
            }
        } catch (Exception ignored) { }
        return "";
    }

    private void emit(String event, JSObject payload) {
        notifyListeners(event, payload);
    }

    /** Le serveur WebSocket proprement dit. */
    private class Hub extends WebSocketServer {
        private final int port;
        private PluginCall pending;

        Hub(int port, PluginCall startCall) {
            super(new InetSocketAddress(port));
            this.port = port;
            this.pending = startCall;
        }

        @Override
        public void onStart() {
            if (pending != null) {
                JSObject r = new JSObject();
                r.put("ip", lanIp());
                r.put("port", port);
                pending.resolve(r);
                pending = null;
            }
        }

        @Override
        public void onOpen(WebSocket conn, ClientHandshake handshake) {
            String id = "c" + seq.incrementAndGet();
            conn.setAttachment(id);
            peers.put(id, conn);
            JSObject o = new JSObject();
            o.put("id", id);
            o.put("path", handshake.getResourceDescriptor());
            emit("conn", o);
        }

        @Override
        public void onClose(WebSocket conn, int code, String reason, boolean remote) {
            Object att = conn.getAttachment();
            String id = att == null ? null : att.toString();
            if (id != null) {
                peers.remove(id);
                JSObject o = new JSObject();
                o.put("id", id);
                emit("disc", o);
            }
        }

        @Override
        public void onMessage(WebSocket conn, String message) {
            Object att = conn.getAttachment();
            JSObject o = new JSObject();
            o.put("id", att == null ? "" : att.toString());
            o.put("data", message);
            emit("msg", o);
        }

        @Override
        public void onError(WebSocket conn, Exception ex) {
            if (pending != null) {
                pending.reject("السيرفور ما حلّش: " + ex.getMessage());
                pending = null;
                hub = null;
            }
        }
    }
}
