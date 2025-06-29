package com.campus_connect.CampusConnect_Backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // Registering STOMP endpoint
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Allow frontend dev origin (Vite runs on 5173)
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:5173")  // explicit allowed origin
                .withSockJS(); // fallback for browsers that don’t support WebSocket
    }

    // Message broker configuration
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Broadcast messages will use this prefix
        registry.enableSimpleBroker("/topic");

        // All messages sent from client must be prefixed with /app
        registry.setApplicationDestinationPrefixes("/app");
    }
}
