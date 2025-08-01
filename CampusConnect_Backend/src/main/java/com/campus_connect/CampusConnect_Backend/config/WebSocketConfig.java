package com.campus_connect.CampusConnect_Backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
       
        registry.addEndpoint("/ws")
                .setAllowedOrigins("https://campus-connect-amber-nine.vercel.app/")  
                .withSockJS(); 
    }

    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }
}
