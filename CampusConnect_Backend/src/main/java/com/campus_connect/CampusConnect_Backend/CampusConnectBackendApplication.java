package com.campus_connect.CampusConnect_Backend;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.campus_connect.CampusConnect_Backend.models")
@EnableJpaRepositories("com.campus_connect.CampusConnect_Backend.repository")
public class CampusConnectBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CampusConnectBackendApplication.class, args);
	}

}
