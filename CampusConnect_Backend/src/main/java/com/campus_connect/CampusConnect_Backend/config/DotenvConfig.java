//package com.campus_connect.CampusConnect_Backend.config;
//
//import io.github.cdimascio.dotenv.Dotenv;
//
//import org.springframework.stereotype.Component;
//import java.util.Map;
//
//@Component
//public class DotenvConfig {
//    @jakarta.annotation.PostConstruct
//    public void loadEnv() {
//        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
//        dotenv.entries().forEach(entry ->
//            System.setProperty(entry.getKey(), entry.getValue())
//        );
//    }
//}
